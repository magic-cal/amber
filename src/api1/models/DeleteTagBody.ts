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
 * @interface DeleteTagBody
 */
export interface DeleteTagBody {
    /**
     * 
     * @type {object}
     * @memberof DeleteTagBody
     */
    id: object;
}

export function DeleteTagBodyFromJSON(json: any): DeleteTagBody {
    return DeleteTagBodyFromJSONTyped(json, false);
}

export function DeleteTagBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeleteTagBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
    };
}

export function DeleteTagBodyToJSON(value?: DeleteTagBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
    };
}

