import Guid from "../../utils/classes/common/guid"
import { EnumLeaseType, Lease } from "../../utils/classes/leases"
import { Body, Controller, Post, Route, Tags, Response } from "tsoa"
import { RecipeStep, RecipeStepFilter } from "../../utils/classes/recipeSteps"
import { AssemblyStep } from "../../utils/classes/assemblySteps"
import { Assembly } from "../../utils/classes/assemblies"
import { LocalDateTime, LocalTime, nativeJs } from "@js-joda/core"
import { LeaseController } from "./LeaseService"
import { RecipeController } from "./RecipeService"
import { RecipeStepController } from "./RecipeStepService"
import { AssemblyController } from "./AssemblyService"
import { AssemblyStepController } from "./AssemblyStepService"
import { RecipeSchedule } from "utils/classes/recipes"
import { BusinessHour, EnumDay } from "../../utils/classes/businessHours"
import { BusinessHourController } from "./BusinessHoursService"
import { ResourceController } from "./ResourceService"
import { Resource } from "utils/classes/resources"

interface AssembliesAndSteps {
  assemblies: Assembly[]
  steps: AssemblyStep[]
}

@Tags("Schedule")
@Route("Schedule")
export class ScheduleService extends Controller {
  // Class Variables
  MAX_DEPTH = 20
  BUFFER_TIME = 5
  MAX_BUSINESS_HOURS_DAYS = 7 // Number of days that the search will look for the next open day
  allLeases: Lease[] = []
  allBusinessHours: BusinessHour[] = []
  holidayBusinessHours: BusinessHour[] = []
  dailyBusinessHours: BusinessHour[] = []
  allResources: Resource[] = []

  leaseService: LeaseController
  recipeService: RecipeController
  recipeStepService: RecipeStepController
  assemblyService: AssemblyController
  assemblyStepService: AssemblyStepController
  businessHourService: BusinessHourController
  resourceService: ResourceController
  constructor() {
    super()
    this.leaseService = new LeaseController()
    this.recipeService = new RecipeController()
    this.recipeStepService = new RecipeStepController()
    this.assemblyService = new AssemblyController()
    this.assemblyStepService = new AssemblyStepController()
    this.resourceService = new ResourceController()
    this.businessHourService = new BusinessHourController()
  }

  @Response(422, "No Recipe Was Selected")
  @Post("recipes")
  async scheduleRecipes(@Body() recipeSchedule: RecipeSchedule) {
    // @TODO: Fix GUID Implentation -- faulty
    const recipeIds = recipeSchedule.recipeIds.map((id) => Guid.fromString(id.value))
    const recipeId = recipeIds[0]!
    const date = recipeSchedule.startTime ? new Date(recipeSchedule.startTime.toISOString()) : new Date()
    if (!recipeId.value) {
      return this.setStatus(422)
    }

    this.allBusinessHours = await this.businessHourService.getBusinessHoursByFilter({ dateStart: date })
    this.allLeases = await this.leaseService.getLeasesByFilter()
    this.allResources = await this.resourceService.getResourcesByFilter()

    this.dailyBusinessHours = this.allBusinessHours.filter(
      (bh) => bh.day.key !== EnumDay.none.key && bh.startTime && bh.endTime
    ) // Filter out null dates
    this.holidayBusinessHours = this.allBusinessHours.filter(
      (bh) => bh.day.key === EnumDay.none.key && bh.startTime && bh.endTime
    ) // Filter out null dates

    let assembliesAndSteps = { assemblies: [], steps: [] } as AssembliesAndSteps

    assembliesAndSteps = await this.createAssembly(recipeId, assembliesAndSteps)

    let taskTime = LocalDateTime.from(nativeJs(date))
    await Promise.all(
      assembliesAndSteps.steps.map((as) => {
        if (!this.isBusinessOpen(taskTime)) {
          // Set the time to the next start
          taskTime = this.getBuisinessNextOpen(taskTime)
        }
        const lease = this.addLeaseForAsseblyStep(as, taskTime)
        taskTime = taskTime.plusMinutes(as.duration).plusMinutes(this.BUFFER_TIME)
        return lease
      })
    )
  }

  async addLeaseForAsseblyStep(assemblyStep: AssemblyStep, currentTime = LocalDateTime.now()) {
    // @TODO: Temp Function
    const leaseId = Guid.create()
    // @TODO: Remove string - Get from Tags
    let resourceId: Guid
    if (assemblyStep.resourceId?.equals(Guid.createEmpty()) || !assemblyStep.resourceId) {
      const resourceIds = this.getResourcesByTag(assemblyStep.tagId)
      resourceId = await this.findResourceTimeSlot(resourceIds, currentTime, assemblyStep.duration)
    } else {
      resourceId = assemblyStep.resourceId
    }

    const lease = new Lease(
      leaseId,
      assemblyStep.name,
      EnumLeaseType.assemblyStep,
      new Date(currentTime.toString()),
      new Date(currentTime.plusMinutes(assemblyStep.duration).toString()),
      resourceId
    )
    lease.assemblyStepId = assemblyStep.id
    await this.leaseService.updateOrCreateLease(lease)
    this.allLeases.push(lease)
  }

  async createAssembly(recipeId: Guid, assembliesAndSteps: AssembliesAndSteps, parentId?: Guid, recursiondepth = 0) {
    recursiondepth++
    if (recursiondepth > this.MAX_DEPTH) {
      this.setStatus(508)
      throw new Error("Recipe Requirement Infinite loop possible")
    }
    const assembly = await this.assemblyService.createFromRecipe(recipeId, parentId)
    // If this is not a child, set it as the parent
    parentId = parentId ? parentId : assembly.id

    assembliesAndSteps.assemblies.push(assembly)
    assembliesAndSteps = await this.createAssemblySteps(assembly, assembliesAndSteps, parentId)

    return assembliesAndSteps
  }

  async createAssemblySteps(
    assembly: Assembly,
    assembliesAndSteps: AssembliesAndSteps,
    parentId?: Guid,
    recursiondepth = 0
  ) {
    let recipeSteps: RecipeStep[] = []
    const recipeStepFilter = new RecipeStepFilter()
    if (assembly.recipeId) {
      recipeStepFilter.recipeIds = assembly.recipeId ? [assembly.recipeId] : []
      recipeSteps = await this.recipeStepService.getRecipeStepsByFilter(recipeStepFilter)
      recipeSteps = recipeSteps.sort((a, b) => a.sequence - b.sequence)
    }
    for (const rs of recipeSteps) {
      // Add new assemblies for steps to be created
      if (rs.recipeRequirementId) {
        assembliesAndSteps = await this.createAssembly(
          rs.recipeRequirementId,
          assembliesAndSteps,
          parentId,
          recursiondepth
        )
      }
      assembliesAndSteps.steps.push(
        await this.assemblyStepService.createFromRecipeStep(rs, assembly.id, rs.recipeRequirementId)
      )
    }
    return assembliesAndSteps
  }

  async findResourceTimeSlot(resourceIds: Guid[], startTime: LocalDateTime, duration: number) {
    const endTime = startTime.plusMinutes(duration)
    // Finds the time slot for the soonest available and then by capacity
    const resourceLeases = this.allLeases.filter((lease) =>
      resourceIds.some(
        (rid) => LocalDateTime.from(nativeJs(lease.endTime!)).isAfter(startTime) && lease.resourceId.equals(rid)
      )
    )
    // const resources = this.allResources.filter((resource) => resourceIds.some((rid) => rid.equals(resource.id)))
    const resourceAvailableNow = resourceIds.find((rid) =>
      this.isResourceAvailable(rid, startTime, endTime, resourceLeases)
    )

    if (resourceAvailableNow) {
      return resourceAvailableNow
    }
    // @TODO: Search for shortest time away

    throw new Error("Resource Required reschedule")
  }

  isResourceAvailable(
    resourceId: Guid,
    startTime: LocalDateTime,
    endTime: LocalDateTime,
    leases: Lease[] = this.allLeases
  ) {
    // If there are no overlaps, resource is available
    return !leases
      .filter((lease) => lease.resourceId.equals(resourceId))
      .some((lease) =>
        this.timesOverlap(
          startTime,
          endTime,
          this.localDateTimeFromDate(lease.startTime!),
          this.localDateTimeFromDate(lease.endTime!)
        )
      )
  }

  timesOverlap(
    startTime: LocalDateTime,
    endTime: LocalDateTime,
    queryStartTime: LocalDateTime,
    queryEndTime: LocalDateTime
  ) {
    return (
      // Either start time or end time is within the date time range
      (!queryStartTime.isBefore(startTime) && !queryStartTime.isAfter(endTime)) ||
      (!queryEndTime.isBefore(startTime) && !queryEndTime.isAfter(endTime)) ||
      // Or doesn't start during the time, but is still elapsed
      (queryStartTime.isBefore(startTime) && queryEndTime.isAfter(endTime))
    )
  }

  localDateTimeFromDate(date: Date) {
    return LocalDateTime.from(nativeJs(date))
  }

  getDayFromDate(date: Date) {
    const day = date.getDay()
    if (day === 0) {
      // Skew sunday to ENUM Sunday
      return 7
    } else {
      return day
    }
  }

  isBusinessOpen(date: LocalDateTime) {
    const day = date.dayOfWeek().value() !== 0 ? date.dayOfWeek().value() : 7 // Display Sunday
    const businessHours = this.dailyBusinessHours.filter((dbh) => dbh.day.key === day)
    const holidayHours = this.holidayBusinessHours.filter((hbh) => {
      const start = LocalDateTime.from(nativeJs(hbh.startTime!))
      const end = LocalDateTime.from(nativeJs(hbh.endTime!))

      return !start.isAfter(date) && !end.isBefore(date)
    })

    if (holidayHours.length) {
      // If a holiday is defined, and one states it is open, it must be open, otherwise it is closed
      return holidayHours.some((hh) => hh.isOpen)
    }

    // Assumed always closed unless open
    const isOpen = businessHours.some((bh) => {
      const startTime = this.getTimeFromDate(bh.startTime!)
      const endTime = this.getTimeFromDate(bh.endTime!)
      const queryTime = date.toLocalTime()
      if (!startTime.isAfter(queryTime) && !endTime.isBefore(queryTime)) {
        return bh.isOpen // Return is closed
      }
    })

    return isOpen
  }

  getBuisinessNextOpen(date: LocalDateTime) {
    for (let i = 0; i < this.MAX_BUSINESS_HOURS_DAYS; i++) {
      const currentDate = date.plusDays(i)
      const day = currentDate.dayOfWeek().value() !== 0 ? currentDate.dayOfWeek().value() : 7 // Display Sunday
      const businessHours = this.dailyBusinessHours.filter((dbh) => dbh.day.key === day)
      const holidayHours = this.holidayBusinessHours.filter((hbh) => {
        const start = LocalDateTime.from(nativeJs(hbh.startTime!))
        const end = LocalDateTime.from(nativeJs(hbh.endTime!))
        return !start.isAfter(currentDate) && !end.isBefore(currentDate)
      })

      const foundHourOpen = [...holidayHours, ...businessHours]
        .sort((a, b) => this.getTimeFromDate(b.startTime!).compareTo(this.getTimeFromDate(a.startTime!)))
        .filter((sh) => (i === 0 ? this.getTimeFromDate(sh.startTime!).isAfter(currentDate.toLocalTime()) : true))
        .find((sh) => sh.isOpen && this.isBusinessOpen(this.setDateTimeToTime(currentDate, sh.startTime!))) // Find the first open Time Today

      if (foundHourOpen) {
        return this.setDateTimeToTime(currentDate, foundHourOpen.startTime!)
      }
    }
    throw Error("Could not find an opening time for the Business within max days limit")
  }

  getTimeFromDate(date: Date) {
    return LocalTime.from(nativeJs(date))
  }

  setDateTimeToTime(dateTime: LocalDateTime, time: Date) {
    //@TODO: Remove this implementation of time
    const timeFormatted = LocalDateTime.from(nativeJs(time))
    dateTime = dateTime
      .withHour(timeFormatted.hour())
      .withMinute(timeFormatted.minute())
      .withSecond(timeFormatted.second())
    return dateTime
  }

  getResourcesByTag(tagId?: Guid) {
    // @TODO: Make to support multiple
    if (!tagId || tagId.equals(Guid.createEmpty())) {
      return []
    }
    return this.allResources
      .filter((resource) => resource.tags.some((tag) => tag.id.equals(tagId)))
      .sort((a, b) => a.capacity - b.capacity)
      .map((resource) => resource.id)
  }
}

//     // implement for one first

//     // Get all recipeReqirements
//     const allRecipeIds = await this.getAllRecipeStepRequirements(recipeIds)
//     console.log(allRecipeIds)
//     const createdAssemblies = await this.assemblyService.createFromRecipes(allRecipeIds)

//     // After all assemblies have been created
//     const recipeStepFilter = new RecipeStepFilter()
//     recipeStepFilter.recipeIds = [recipeId]
//     const recipeSteps = await this.recipeStepService.getRecipeStepsByFilter()
//     recipeSteps.map((rs) => {
//       let foundRecipeRequirementId: Guid | undefined = undefined
//       if (rs.recipeRequirementId) {
//         const index = createdAssemblies.findIndex((ca) => ca.recipeId && ca.recipeId.equals(rs.recipeRequirementId!))
//         if (index !== -1) {
//           foundRecipeRequirementId = createdAssemblies[index].id
//           // Remove specific reference to this assembly
//           createdAssemblies.splice(index, 1)
//         }
//       }
//       return new AssemblyStep(Guid.create(), rs.name, rs.description, foundRecipeRequirementId, rs.tagId, rs.)
//     })
//   }

//   async getAllRecipeStepRequirements(recipeIds: Guid[]) {
//     // WARNING CAN RUN LOTS
//     const recipeStepFilter = new RecipeStepFilter()
//     let requiredRecipeIds = recipeIds
//     let recursiondepth = 0

//     while (requiredRecipeIds.length) {
//       recursiondepth++
//       const newRecipeIds: Guid[] = []
//       recipeStepFilter.recipeIds = requiredRecipeIds
//       const recipeSteps = await this.recipeStepService.getRecipeStepsByFilter(recipeStepFilter)
//       recipeSteps.forEach((rs) => {
//         // Add new recipes to list of requirements
//         if (rs.recipeRequirementId) {
//           newRecipeIds.push(rs.recipeRequirementId)
//         }
//       })
//       requiredRecipeIds = newRecipeIds
//       recipeIds.push(...newRecipeIds)
//       if (recursiondepth > this.MAX_DEPTH) {
//         new Error("Too many recipe step requirements, Possible recursive dependency")
//       }
//     }
//     return recipeIds
//   }
// }

// @TODO: Decide if you still need this
// async getAllRecipeStepRequirements(recipeIds: Guid[]) {
//     // WARNING CAN RUN LOTS
//     const recipeStepFilter = new RecipeStepFilter()
//     let requiredRecipeIds = Array.from(new Set(recipeIds))
//     let recursiondepth = 0

//     while (requiredRecipeIds.length) {
//       recursiondepth++
//       const newRecipeIds: Guid[] = []
//       recipeStepFilter.recipeIds = requiredRecipeIds
//       const recipeSteps = await this.recipeStepService.getRecipeStepsByFilter(recipeStepFilter)
//       recipeSteps.forEach((rs) => {
//         // Add new recipes to list of requirements
//         if (rs.recipeRequirementId && !recipeIds.some((rid) => rid.equals(rs.recipeRequirementId!))) {
//           newRecipeIds.push(rs.recipeRequirementId)
//         }
//       })
//       requiredRecipeIds = newRecipeIds
//       recipeIds = Array.from(new Set([...recipeIds, ...newRecipeIds]))
//       if (recursiondepth > this.MAX_DEPTH) {
//         new Error("Too many recipe step requirements")
//       }
//     }
//     return recipeIds
//   }
