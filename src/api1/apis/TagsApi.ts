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
    QueryResultAny,
    QueryResultAnyFromJSON,
    QueryResultAnyToJSON,
    Tag,
    TagFromJSON,
    TagToJSON,
} from '../models';

export interface DeleteTagRequest {
    body: any | null;
}

export interface GetTagsByFilterRequest {
    requestBody?: { [key: string]: object; };
}

export interface UpdateOrCreateTagRequest {
    requestBody: { [key: string]: object; };
}

/**
 * 
 */
export class TagsApi extends runtime.BaseAPI {

    /**
     */
    async deleteTagRaw(requestParameters: DeleteTagRequest): Promise<runtime.ApiResponse<boolean>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling deleteTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/tags/delete`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteTag(requestParameters: DeleteTagRequest): Promise<boolean> {
        const response = await this.deleteTagRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getTagRaw(): Promise<runtime.ApiResponse<Tag>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tags/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TagFromJSON(jsonValue));
    }

    /**
     */
    async getTag(): Promise<Tag> {
        const response = await this.getTagRaw();
        return await response.value();
    }

    /**
     */
    async getTagsByFilterRaw(requestParameters: GetTagsByFilterRequest): Promise<runtime.ApiResponse<Array<Tag>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/tags/get-by`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.requestBody,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TagFromJSON));
    }

    /**
     */
    async getTagsByFilter(requestParameters: GetTagsByFilterRequest): Promise<Array<Tag>> {
        const response = await this.getTagsByFilterRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async updateOrCreateTagRaw(requestParameters: UpdateOrCreateTagRequest): Promise<runtime.ApiResponse<QueryResultAny>> {
        if (requestParameters.requestBody === null || requestParameters.requestBody === undefined) {
            throw new runtime.RequiredError('requestBody','Required parameter requestParameters.requestBody was null or undefined when calling updateOrCreateTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/tags/update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.requestBody,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => QueryResultAnyFromJSON(jsonValue));
    }

    /**
     */
    async updateOrCreateTag(requestParameters: UpdateOrCreateTagRequest): Promise<QueryResultAny> {
        const response = await this.updateOrCreateTagRaw(requestParameters);
        return await response.value();
    }

}