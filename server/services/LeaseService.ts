import { sqlToDB } from "../util/PgDatabase"
import { EnumLeaseType, Lease, LeaseFilter } from "../../utils/classes/leases"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"
import { Body, Controller, Delete, Post, Put, Route, Tags, Response } from "tsoa"
import { extractBaseFields, genBaseFields, updateBaseFields, validateBaseFields } from "../util/baseDataUtil"
import { RecipeController } from "./RecipeService"

@Tags("Lease")
@Route("Lease")
export class LeaseController extends Controller {
  recipeService: RecipeController
  constructor() {
    super()
    this.recipeService = new RecipeController()
  }
  dbToLease(leaseRow: QueryResultRow) {
    const lease: Lease = new Lease()
    genBaseFields(leaseRow, lease)
    lease.id = Guid.fromString(leaseRow.lease_id)
    lease.name = leaseRow.lease_name
    lease.startTime = new Date(leaseRow.lease_start_time)
    lease.endTime = new Date(leaseRow.lease_end_time)
    lease.resourceId = Guid.fromString(leaseRow.lease_resource_id)
    lease.maintenanceId = leaseRow.lease_maintenance_id ? Guid.fromString(leaseRow.lease_maintenance_id) : undefined
    lease.assemblyStepId = leaseRow.lease_assembly_step_id
      ? Guid.fromString(leaseRow.lease_assembly_step_id)
      : undefined
    lease.packagingId = leaseRow.lease_packaging_id ? Guid.fromString(leaseRow.lease_packaging_id) : undefined
    lease.productId = leaseRow.lease_product_id ? Guid.fromString(leaseRow.lease_product_id) : undefined
    lease.leaseType = EnumLeaseType.none
    if (lease.packagingId) {
      lease.leaseType = EnumLeaseType.packaging
    } else if (lease.assemblyStepId) {
      lease.leaseType = EnumLeaseType.assemblyStep
    }
    // console.log("leaseRow", leaseRow)
    // console.log("LEASEGG", lease)
    return lease
  }

  async addLease(lease: Lease) {
    if (lease.id.value === Guid.createEmpty().value) {
      lease.id = Guid.create()
    }
    return await sqlToDB(
      `INSERT INTO leases (
lease_id, lease_name, lease_resource_id, lease_end_time, lease_start_time, lease_maintenance_id, lease_assembly_step_id, lease_packaging_id, lease_product_id, version_no) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        lease.id.value,
        lease.name,
        lease.resourceId?.value,
        lease.endTime.toISOString(),
        lease.startTime.toISOString(),
        lease.maintenanceId?.value,
        lease.assemblyStepId?.value,
        lease.packagingId?.value,
        lease.productId?.value,
        ...extractBaseFields(lease)
      ]
    )
  }
  @Post("get")
  async getLease(@Body() leaseId: Guid) {
    const result = await sqlToDB("SELECT * FROM leases WHERE lease_id = $1", [leaseId.value])
    console.log(
      "result.rows.map(leaseResult => dbToLease(leaseResult))[0]",
      result.rows.map((leaseResult) => this.dbToLease(leaseResult))[0]
    )
    const lease = result.rows.map((leaseResult) => this.dbToLease(leaseResult))[0]
    return lease
  }

  @Post("get-by")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getLeasesByFilter(@Body() filter?: LeaseFilter) {
    let query = "SELECT DISTINCT ON (leases.lease_id) leases.* FROM leases"
    const queryClauses: string[] = []

    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)
    return result.rows.map((leaseResult) => this.dbToLease(leaseResult))
  }

  @Delete("delete")
  async deleteLease(@Body() leaseId: Guid) {
    const result = await sqlToDB("DELETE FROM leases WHERE lease_id = $1", [leaseId.value])
    return !!result.rowCount
  }

  @Response(412, "Update failed, data has been changed by another process")
  @Put("update")
  async updateOrCreateLease(@Body() lease: Lease) {
    if (lease.id.value === Guid.createEmpty().value || !(await this.getLease(lease.id))) {
      return await this.addLease(lease)
    }
    if (!(await validateBaseFields(lease, "SELECT * FROM leases WHERE lease_id = $1", [lease.id.value]))) {
      this.setStatus(412)
    }
    lease = updateBaseFields(lease)
    return await sqlToDB(
      "UPDATE leases SET lease_name = $2, lease_resource_id = $3, lease_end_time = $4, lease_start_time = $5, lease_maintenance_id = $6, lease_assembly_step_id = $7, lease_packaging_id = $8, lease_product_id = $9, version_no = $10 WHERE lease_id = $1;",
      [
        lease.id.value,
        lease.name,
        lease.resourceId?.value,
        lease.endTime.toISOString(),
        lease.startTime.toISOString(),
        lease.maintenanceId?.value,
        lease.assemblyStepId?.value,
        lease.packagingId?.value,
        lease.productId?.value,
        ...extractBaseFields(lease)
      ]
    )
  }
}
