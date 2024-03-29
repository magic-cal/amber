/* tslint:disable */
/* eslint-disable */
/**
 * amber
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Assembly,
    AssemblyFromJSON,
    AssemblyToJSON,
    AssemblyFilter,
    AssemblyFilterFromJSON,
    AssemblyFilterToJSON,
    Guid,
    GuidFromJSON,
    GuidToJSON,
    QueryResultAny,
    QueryResultAnyFromJSON,
    QueryResultAnyToJSON,
} from '../models';

export interface DeleteAssemblyRequest {
    assemblyId: Guid;
}

export interface GetAssembliesByFilterRequest {
    filter?: AssemblyFilter;
}

export interface GetAssemblyRequest {
    assemblyId: Guid;
}

export interface UpdateOrCreateAssemblyRequest {
    assembly: Assembly;
}

/**
 * 
 */
export class AssemblyApi extends runtime.BaseAPI {

    /**
     */
    async deleteAssemblyRaw(requestParameters: DeleteAssemblyRequest): Promise<runtime.ApiResponse<boolean>> {
        if (requestParameters.assemblyId === null || requestParameters.assemblyId === undefined) {
            throw new runtime.RequiredError('assemblyId','Required parameter requestParameters.assemblyId was null or undefined when calling deleteAssembly.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Assembly/delete`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.assemblyId),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteAssembly(requestParameters: DeleteAssemblyRequest): Promise<boolean> {
        const response = await this.deleteAssemblyRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getAssembliesByFilterRaw(requestParameters: GetAssembliesByFilterRequest): Promise<runtime.ApiResponse<Array<Assembly>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Assembly/get-by`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AssemblyFilterToJSON(requestParameters.filter),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AssemblyFromJSON));
    }

    /**
     */
    async getAssembliesByFilter(requestParameters: GetAssembliesByFilterRequest): Promise<Array<Assembly>> {
        const response = await this.getAssembliesByFilterRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getAssemblyRaw(requestParameters: GetAssemblyRequest): Promise<runtime.ApiResponse<Assembly>> {
        if (requestParameters.assemblyId === null || requestParameters.assemblyId === undefined) {
            throw new runtime.RequiredError('assemblyId','Required parameter requestParameters.assemblyId was null or undefined when calling getAssembly.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Assembly/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.assemblyId),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AssemblyFromJSON(jsonValue));
    }

    /**
     */
    async getAssembly(requestParameters: GetAssemblyRequest): Promise<Assembly> {
        const response = await this.getAssemblyRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async updateOrCreateAssemblyRaw(requestParameters: UpdateOrCreateAssemblyRequest): Promise<runtime.ApiResponse<QueryResultAny>> {
        if (requestParameters.assembly === null || requestParameters.assembly === undefined) {
            throw new runtime.RequiredError('assembly','Required parameter requestParameters.assembly was null or undefined when calling updateOrCreateAssembly.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Assembly/update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AssemblyToJSON(requestParameters.assembly),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => QueryResultAnyFromJSON(jsonValue));
    }

    /**
     */
    async updateOrCreateAssembly(requestParameters: UpdateOrCreateAssemblyRequest): Promise<QueryResultAny> {
        const response = await this.updateOrCreateAssemblyRaw(requestParameters);
        return await response.value();
    }

}
