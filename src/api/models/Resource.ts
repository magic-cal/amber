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
    ResourceReadonly,
    ResourceReadonlyFromJSON,
    ResourceReadonlyFromJSONTyped,
    ResourceReadonlyToJSON,
    Tag,
    TagFromJSON,
    TagFromJSONTyped,
    TagToJSON,
} from './';

/**
 * 
 * @export
 * @interface Resource
 */
export interface Resource {
    /**
     * 
     * @type {number}
     * @memberof Resource
     */
    versionNo: number;
    /**
     * 
     * @type {Guid}
     * @memberof Resource
     */
    id: Guid;
    /**
     * 
     * @type {string}
     * @memberof Resource
     */
    name: string;
    /**
     * 
     * @type {Array<Tag>}
     * @memberof Resource
     */
    tags: Array<Tag>;
    /**
     * 
     * @type {ResourceReadonly}
     * @memberof Resource
     */
    readOnly: ResourceReadonly;
    /**
     * 
     * @type {number}
     * @memberof Resource
     */
    capacity: number;
    /**
     * 
     * @type {Guid}
     * @memberof Resource
     */
    currentLease?: Guid;
    /**
     * 
     * @type {boolean}
     * @memberof Resource
     */
    maintananceRequired: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Resource
     */
    active: boolean;
}

export function ResourceFromJSON(json: any): Resource {
    return ResourceFromJSONTyped(json, false);
}

export function ResourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Resource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'versionNo': json['versionNo'],
        'id': GuidFromJSON(json['id']),
        'name': json['name'],
        'tags': ((json['tags'] as Array<any>).map(TagFromJSON)),
        'readOnly': ResourceReadonlyFromJSON(json['readOnly']),
        'capacity': json['capacity'],
        'currentLease': !exists(json, 'currentLease') ? undefined : GuidFromJSON(json['currentLease']),
        'maintananceRequired': json['maintananceRequired'],
        'active': json['active'],
    };
}

export function ResourceToJSON(value?: Resource | null): any {
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
        'tags': ((value.tags as Array<any>).map(TagToJSON)),
        'readOnly': ResourceReadonlyToJSON(value.readOnly),
        'capacity': value.capacity,
        'currentLease': GuidToJSON(value.currentLease),
        'maintananceRequired': value.maintananceRequired,
        'active': value.active,
    };
}


