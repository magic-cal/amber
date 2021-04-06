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
 * @interface Assembly
 */
export interface Assembly {
    /**
     * 
     * @type {number}
     * @memberof Assembly
     */
    versionNo: number;
    /**
     * 
     * @type {Guid}
     * @memberof Assembly
     */
    id: Guid;
    /**
     * 
     * @type {string}
     * @memberof Assembly
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Assembly
     */
    description: string;
    /**
     * 
     * @type {boolean}
     * @memberof Assembly
     */
    complete: boolean;
    /**
     * 
     * @type {Guid}
     * @memberof Assembly
     */
    parentId?: Guid;
    /**
     * 
     * @type {Guid}
     * @memberof Assembly
     */
    recipeId?: Guid;
    /**
     * 
     * @type {Guid}
     * @memberof Assembly
     */
    recipeProductId?: Guid;
}

export function AssemblyFromJSON(json: any): Assembly {
    return AssemblyFromJSONTyped(json, false);
}

export function AssemblyFromJSONTyped(json: any, ignoreDiscriminator: boolean): Assembly {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'versionNo': json['versionNo'],
        'id': GuidFromJSON(json['id']),
        'name': json['name'],
        'description': json['description'],
        'complete': json['complete'],
        'parentId': !exists(json, 'parentId') ? undefined : GuidFromJSON(json['parentId']),
        'recipeId': !exists(json, 'recipeId') ? undefined : GuidFromJSON(json['recipeId']),
        'recipeProductId': !exists(json, 'recipeProductId') ? undefined : GuidFromJSON(json['recipeProductId']),
    };
}

export function AssemblyToJSON(value?: Assembly | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'versionNo': value.versionNo,
        'id': GuidToJSON(value.id),
        'name': value.name,
        'description': value.description,
        'complete': value.complete,
        'parentId': GuidToJSON(value.parentId),
        'recipeId': GuidToJSON(value.recipeId),
        'recipeProductId': GuidToJSON(value.recipeProductId),
    };
}


