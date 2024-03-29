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

import { exists, mapValues } from '../runtime';
import {
    Guid,
    GuidFromJSON,
    GuidFromJSONTyped,
    GuidToJSON,
} from './';

/**
 * 
 * @export
 * @interface RecipeSchedule
 */
export interface RecipeSchedule {
    /**
     * 
     * @type {Array<Guid>}
     * @memberof RecipeSchedule
     */
    recipeIds?: Array<Guid>;
    /**
     * 
     * @type {Date}
     * @memberof RecipeSchedule
     */
    startTime?: Date;
}

export function RecipeScheduleFromJSON(json: any): RecipeSchedule {
    return RecipeScheduleFromJSONTyped(json, false);
}

export function RecipeScheduleFromJSONTyped(json: any, ignoreDiscriminator: boolean): RecipeSchedule {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'recipeIds': !exists(json, 'recipeIds') ? undefined : ((json['recipeIds'] as Array<any>).map(GuidFromJSON)),
        'startTime': !exists(json, 'startTime') ? undefined : (new Date(json['startTime'])),
    };
}

export function RecipeScheduleToJSON(value?: RecipeSchedule | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'recipeIds': value.recipeIds === undefined ? undefined : ((value.recipeIds as Array<any>).map(GuidToJSON)),
        'startTime': value.startTime === undefined ? undefined : (value.startTime.toISOString()),
    };
}


