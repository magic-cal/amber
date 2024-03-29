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
/**
 * 
 * @export
 * @interface RecipeBreakdownSteps
 */
export interface RecipeBreakdownSteps {
    /**
     * 
     * @type {string}
     * @memberof RecipeBreakdownSteps
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof RecipeBreakdownSteps
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof RecipeBreakdownSteps
     */
    duration?: number;
}

export function RecipeBreakdownStepsFromJSON(json: any): RecipeBreakdownSteps {
    return RecipeBreakdownStepsFromJSONTyped(json, false);
}

export function RecipeBreakdownStepsFromJSONTyped(json: any, ignoreDiscriminator: boolean): RecipeBreakdownSteps {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
    };
}

export function RecipeBreakdownStepsToJSON(value?: RecipeBreakdownSteps | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'duration': value.duration,
    };
}


