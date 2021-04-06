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
 * @interface LeaseFilter
 */
export interface LeaseFilter {
    /**
     * 
     * @type {Array<Guid>}
     * @memberof LeaseFilter
     */
    leaseStepIds?: Array<Guid>;
    /**
     * 
     * @type {boolean}
     * @memberof LeaseFilter
     */
    includeDeleted?: boolean;
}

export function LeaseFilterFromJSON(json: any): LeaseFilter {
    return LeaseFilterFromJSONTyped(json, false);
}

export function LeaseFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): LeaseFilter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'leaseStepIds': !exists(json, 'LeaseStepIds') ? undefined : ((json['LeaseStepIds'] as Array<any>).map(GuidFromJSON)),
        'includeDeleted': !exists(json, 'includeDeleted') ? undefined : json['includeDeleted'],
    };
}

export function LeaseFilterToJSON(value?: LeaseFilter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'LeaseStepIds': value.leaseStepIds === undefined ? undefined : ((value.leaseStepIds as Array<any>).map(GuidToJSON)),
        'includeDeleted': value.includeDeleted,
    };
}


