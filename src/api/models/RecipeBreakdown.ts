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
    RecipeBreakdownSteps,
    RecipeBreakdownStepsFromJSON,
    RecipeBreakdownStepsFromJSONTyped,
    RecipeBreakdownStepsToJSON,
} from './';

/**
 * 
 * @export
 * @interface RecipeBreakdown
 */
export interface RecipeBreakdown {
    /**
     * 
     * @type {string}
     * @memberof RecipeBreakdown
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof RecipeBreakdown
     */
    description?: string;
    /**
     * 
     * @type {Array<RecipeBreakdownSteps>}
     * @memberof RecipeBreakdown
     */
    breakdownSteps: Array<RecipeBreakdownSteps>;
}

export function RecipeBreakdownFromJSON(json: any): RecipeBreakdown {
    return RecipeBreakdownFromJSONTyped(json, false);
}

export function RecipeBreakdownFromJSONTyped(json: any, ignoreDiscriminator: boolean): RecipeBreakdown {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'breakdownSteps': ((json['breakdownSteps'] as Array<any>).map(RecipeBreakdownStepsFromJSON)),
    };
}

export function RecipeBreakdownToJSON(value?: RecipeBreakdown | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'breakdownSteps': ((value.breakdownSteps as Array<any>).map(RecipeBreakdownStepsToJSON)),
    };
}


