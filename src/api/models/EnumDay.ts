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
 * @interface EnumDay
 */
export interface EnumDay {
    /**
     * 
     * @type {number}
     * @memberof EnumDay
     */
    key: number;
    /**
     * 
     * @type {string}
     * @memberof EnumDay
     */
    value: string;
    /**
     * 
     * @type {string}
     * @memberof EnumDay
     */
    translationKey: string;
}

export function EnumDayFromJSON(json: any): EnumDay {
    return EnumDayFromJSONTyped(json, false);
}

export function EnumDayFromJSONTyped(json: any, ignoreDiscriminator: boolean): EnumDay {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': json['key'],
        'value': json['value'],
        'translationKey': json['translationKey'],
    };
}

export function EnumDayToJSON(value?: EnumDay | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
        'value': value.value,
        'translationKey': value.translationKey,
    };
}


