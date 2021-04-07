import { sqlToDB } from "../util/PgDatabase"
import { AssemblyStep, AssemblyStepFilter } from "../../utils/classes/assemblySteps"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"
import { Body, Controller, Delete, Post, Put, Route, Tags } from "tsoa"

@Tags("AssemblyStep")
@Route("AssemblyStep")
export class AssemblyStepController extends Controller {
  dbToAssemblyStep(row: QueryResultRow) {
    const assemblyStep: AssemblyStep = new AssemblyStep()
    assemblyStep.id = Guid.fromString(row.assembly_step_id)
    assemblyStep.name = row.assembly_step_name
    assemblyStep.description = row.assembly_step_description
    assemblyStep.assemblyId = Guid.fromString(row.assembly_step_assembly_id)
    assemblyStep.assemblyRequirementId = row.assembly_step_assembly_requirement_id
      ? Guid.fromString(row.assembly_step_assembly_requirement_id)
      : undefined
    assemblyStep.tagId = row.assembly_step_tag_id ? Guid.fromString(row.assembly_step_tag_id) : undefined
    assemblyStep.resourceId = row.assembly_step_resource_id ? Guid.fromString(row.assembly_step_resource_id) : undefined
    assemblyStep.duration = row.assembly_step_duration
    assemblyStep.capacity = row.assembly_step_capacity
    assemblyStep.sequence = row.assembly_step_sequence ?? 0
    console.log("row", row)
    console.log("ASSEMBLYGG", assemblyStep)

    return assemblyStep
  }

  @Post("get")
  async getAssemblyStep(@Body() assemblyStepId: Guid) {
    const result = await sqlToDB("SELECT * FROM assembly_steps WHERE assembly_step_id = $1", [assemblyStepId.value])
    console.log(
      "result.rows.map(assemblyStepResult => dbToAssemblyStep(assemblyStepResult))[0]",
      result.rows.map((assemblyStepResult) => this.dbToAssemblyStep(assemblyStepResult))[0]
    )
    return result.rows.map((assemblyStepResult) => this.dbToAssemblyStep(assemblyStepResult))[0]
  }

  @Post("get-by")
  async getAssemblyStepsByFilter(@Body() filter?: AssemblyStepFilter) {
    let query =
      "\
SELECT DISTINCT ON (assembly_steps.assembly_step_id) assembly_steps.* \
FROM assembly_steps \
LEFT JOIN assemblys ON (assembly_steps.assembly_step_assembly_id = assemblys.assembly_id)\
"
    const queryClauses: string[] = []
    if (filter?.assemblyIds?.length) {
      queryClauses.push(`assemblys.assembly_id IN (${filter.assemblyIds.map((ri) => `'${ri.value}'`)})`)
    }
    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)
    return result.rows.map((assemblyStepResult) => this.dbToAssemblyStep(assemblyStepResult))
  }

  @Delete("delete")
  async deleteAssemblyStep(@Body() assemblyStepId: Guid) {
    // await updateResourceRelation([], assemblyStepId)
    const result = await sqlToDB("DELETE FROM assembly_steps WHERE assembly_step_id = $1", [assemblyStepId.value])
    return !!result.rowCount
  }

  @Put("update")
  async updateOrCreateAssemblyStep(@Body() assemblyStep: AssemblyStep) {
    console.log(
      assemblyStep.id.value !== Guid.createEmpty().value,
      "assemblyStep.id.value !== Guid.createEmpty().value"
    )
    if (assemblyStep.id.value !== Guid.createEmpty().value && (await this.getAssemblyStep(assemblyStep.id))) {
      return await sqlToDB(
        "UPDATE assembly_steps SET assembly_step_id = $1, assembly_step_name = $2, assembly_step_description = $3, assembly_step_assembly_requirement_id = $4, assembly_step_tag_id = $5, assembly_step_assembly_id = $6, assembly_step_resource_id = $7, assembly_step_duration = $8, assembly_step_capacity = $9, assembly_step_sequence = $10 WHERE assembly_step_id = $1;",
        [
          assemblyStep.id.value,
          assemblyStep.name,
          assemblyStep.description,
          assemblyStep.assemblyRequirementId?.value,
          assemblyStep.tagId?.value,
          assemblyStep.assemblyId.value,
          assemblyStep.resourceId?.value,
          assemblyStep.duration,
          assemblyStep.capacity,
          assemblyStep.sequence
        ]
      )
    }
    return await this.addAssemblyStep(assemblyStep)
  }

  async addAssemblyStep(assemblyStep: AssemblyStep) {
    // const fieldParams = assemblyStepToDb(assemblyStep)
    return await sqlToDB(
      `INSERT INTO assembly_steps (
assembly_step_id,
assembly_step_name,
assembly_step_description,
assembly_step_assembly_requirement_id,
assembly_step_tag_id,
assembly_step_assembly_id,
assembly_step_resource_id,
assembly_step_duration,
assembly_step_capacity,
assembly_step_sequence
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        assemblyStep.id.value,
        assemblyStep.name,
        assemblyStep.description,
        assemblyStep.assemblyRequirementId?.value,
        assemblyStep.tagId?.value,
        assemblyStep.assemblyId.value,
        assemblyStep.resourceId?.value,
        assemblyStep.duration,
        assemblyStep.capacity,
        assemblyStep.sequence
      ]
    )
  }
}