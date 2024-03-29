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
    BusinessHour,
    BusinessHourFromJSON,
    BusinessHourToJSON,
    BusinessHourFilter,
    BusinessHourFilterFromJSON,
    BusinessHourFilterToJSON,
    Guid,
    GuidFromJSON,
    GuidToJSON,
    QueryResultAny,
    QueryResultAnyFromJSON,
    QueryResultAnyToJSON,
} from '../models';

export interface DeleteBusinessHourRequest {
    businessHourId: Guid;
}

export interface GetBusinessHourRequest {
    businessHourId: Guid;
}

export interface GetBusinessHoursByFilterRequest {
    filter?: BusinessHourFilter;
}

export interface UpdateOrCreateBusinessHourRequest {
    businessHour: BusinessHour;
}

/**
 * 
 */
export class BusinessHourApi extends runtime.BaseAPI {

    /**
     */
    async deleteBusinessHourRaw(requestParameters: DeleteBusinessHourRequest): Promise<runtime.ApiResponse<boolean>> {
        if (requestParameters.businessHourId === null || requestParameters.businessHourId === undefined) {
            throw new runtime.RequiredError('businessHourId','Required parameter requestParameters.businessHourId was null or undefined when calling deleteBusinessHour.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/BusinessHour/delete`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.businessHourId),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteBusinessHour(requestParameters: DeleteBusinessHourRequest): Promise<boolean> {
        const response = await this.deleteBusinessHourRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getBusinessHourRaw(requestParameters: GetBusinessHourRequest): Promise<runtime.ApiResponse<BusinessHour>> {
        if (requestParameters.businessHourId === null || requestParameters.businessHourId === undefined) {
            throw new runtime.RequiredError('businessHourId','Required parameter requestParameters.businessHourId was null or undefined when calling getBusinessHour.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/BusinessHour/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.businessHourId),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BusinessHourFromJSON(jsonValue));
    }

    /**
     */
    async getBusinessHour(requestParameters: GetBusinessHourRequest): Promise<BusinessHour> {
        const response = await this.getBusinessHourRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getBusinessHoursByFilterRaw(requestParameters: GetBusinessHoursByFilterRequest): Promise<runtime.ApiResponse<Array<BusinessHour>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/BusinessHour/get-by`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BusinessHourFilterToJSON(requestParameters.filter),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(BusinessHourFromJSON));
    }

    /**
     */
    async getBusinessHoursByFilter(requestParameters: GetBusinessHoursByFilterRequest): Promise<Array<BusinessHour>> {
        const response = await this.getBusinessHoursByFilterRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async updateOrCreateBusinessHourRaw(requestParameters: UpdateOrCreateBusinessHourRequest): Promise<runtime.ApiResponse<QueryResultAny>> {
        if (requestParameters.businessHour === null || requestParameters.businessHour === undefined) {
            throw new runtime.RequiredError('businessHour','Required parameter requestParameters.businessHour was null or undefined when calling updateOrCreateBusinessHour.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/BusinessHour/update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: BusinessHourToJSON(requestParameters.businessHour),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => QueryResultAnyFromJSON(jsonValue));
    }

    /**
     */
    async updateOrCreateBusinessHour(requestParameters: UpdateOrCreateBusinessHourRequest): Promise<QueryResultAny> {
        const response = await this.updateOrCreateBusinessHourRaw(requestParameters);
        return await response.value();
    }

}
