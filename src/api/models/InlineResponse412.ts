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
 * @interface InlineResponse412
 */
export interface InlineResponse412 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse412
     */
    reason: string;
}

export function InlineResponse412FromJSON(json: any): InlineResponse412 {
    return InlineResponse412FromJSONTyped(json, false);
}

export function InlineResponse412FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse412 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'reason': json['reason'],
    };
}

export function InlineResponse412ToJSON(value?: InlineResponse412 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'reason': value.reason,
    };
}


