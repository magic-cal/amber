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
    RecipeSchedule,
    RecipeScheduleFromJSON,
    RecipeScheduleToJSON,
} from '../models';

export interface ScheduleRecipesRequest {
    recipeSchedule: RecipeSchedule;
}

/**
 * 
 */
export class ScheduleApi extends runtime.BaseAPI {

    /**
     */
    async scheduleRecipesRaw(requestParameters: ScheduleRecipesRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.recipeSchedule === null || requestParameters.recipeSchedule === undefined) {
            throw new runtime.RequiredError('recipeSchedule','Required parameter requestParameters.recipeSchedule was null or undefined when calling scheduleRecipes.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Schedule/recipes`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RecipeScheduleToJSON(requestParameters.recipeSchedule),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async scheduleRecipes(requestParameters: ScheduleRecipesRequest): Promise<void> {
        await this.scheduleRecipesRaw(requestParameters);
    }

}
