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
    Guid,
    GuidFromJSON,
    GuidToJSON,
    Resource,
    ResourceFromJSON,
    ResourceToJSON,
    ResourceFilter,
    ResourceFilterFromJSON,
    ResourceFilterToJSON,
} from '../models';

export interface DeleteResourceRequest {
    resourceId: Guid;
}

export interface GetResourceRequest {
    resourceId: Guid;
}

export interface GetResourcesByFilterRequest {
    filter?: ResourceFilter;
}

export interface UpdateOrCreateResourceRequest {
    resource: Resource;
}

/**
 * 
 */
export class ResourceApi extends runtime.BaseAPI {

    /**
     */
    async deleteResourceRaw(requestParameters: DeleteResourceRequest): Promise<runtime.ApiResponse<boolean>> {
        if (requestParameters.resourceId === null || requestParameters.resourceId === undefined) {
            throw new runtime.RequiredError('resourceId','Required parameter requestParameters.resourceId was null or undefined when calling deleteResource.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Resource/delete`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.resourceId),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteResource(requestParameters: DeleteResourceRequest): Promise<boolean> {
        const response = await this.deleteResourceRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getResourceRaw(requestParameters: GetResourceRequest): Promise<runtime.ApiResponse<Resource>> {
        if (requestParameters.resourceId === null || requestParameters.resourceId === undefined) {
            throw new runtime.RequiredError('resourceId','Required parameter requestParameters.resourceId was null or undefined when calling getResource.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Resource/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.resourceId),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ResourceFromJSON(jsonValue));
    }

    /**
     */
    async getResource(requestParameters: GetResourceRequest): Promise<Resource> {
        const response = await this.getResourceRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getResourcesByFilterRaw(requestParameters: GetResourcesByFilterRequest): Promise<runtime.ApiResponse<Array<Resource>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Resource/get-by`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ResourceFilterToJSON(requestParameters.filter),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ResourceFromJSON));
    }

    /**
     */
    async getResourcesByFilter(requestParameters: GetResourcesByFilterRequest): Promise<Array<Resource>> {
        const response = await this.getResourcesByFilterRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async updateOrCreateResourceRaw(requestParameters: UpdateOrCreateResourceRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.resource === null || requestParameters.resource === undefined) {
            throw new runtime.RequiredError('resource','Required parameter requestParameters.resource was null or undefined when calling updateOrCreateResource.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Resource/update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ResourceToJSON(requestParameters.resource),
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async updateOrCreateResource(requestParameters: UpdateOrCreateResourceRequest): Promise<{ [key: string]: object; }> {
        const response = await this.updateOrCreateResourceRaw(requestParameters);
        return await response.value();
    }

}
