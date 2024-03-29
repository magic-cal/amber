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
    QueryResultAny,
    QueryResultAnyFromJSON,
    QueryResultAnyToJSON,
    Tag,
    TagFromJSON,
    TagToJSON,
    TagFilter,
    TagFilterFromJSON,
    TagFilterToJSON,
} from '../models';

export interface DeleteTagRequest {
    tagId: Guid;
}

export interface GetTagRequest {
    tagId: Guid;
}

export interface GetTagsByFilterRequest {
    filter?: TagFilter;
}

export interface UpdateOrCreateTagRequest {
    tag: Tag;
}

/**
 * 
 */
export class TagApi extends runtime.BaseAPI {

    /**
     */
    async deleteTagRaw(requestParameters: DeleteTagRequest): Promise<runtime.ApiResponse<boolean>> {
        if (requestParameters.tagId === null || requestParameters.tagId === undefined) {
            throw new runtime.RequiredError('tagId','Required parameter requestParameters.tagId was null or undefined when calling deleteTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Tag/delete`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.tagId),
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
    async getTagRaw(requestParameters: GetTagRequest): Promise<runtime.ApiResponse<Tag>> {
        if (requestParameters.tagId === null || requestParameters.tagId === undefined) {
            throw new runtime.RequiredError('tagId','Required parameter requestParameters.tagId was null or undefined when calling getTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Tag/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.tagId),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TagFromJSON(jsonValue));
    }

    /**
     */
    async getTag(requestParameters: GetTagRequest): Promise<Tag> {
        const response = await this.getTagRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getTagsByFilterRaw(requestParameters: GetTagsByFilterRequest): Promise<runtime.ApiResponse<Array<Tag>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Tag/get-by`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TagFilterToJSON(requestParameters.filter),
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
        if (requestParameters.tag === null || requestParameters.tag === undefined) {
            throw new runtime.RequiredError('tag','Required parameter requestParameters.tag was null or undefined when calling updateOrCreateTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Tag/update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TagToJSON(requestParameters.tag),
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
