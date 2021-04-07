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
 * @interface AssemblyStep
 */
export interface AssemblyStep {
    /**
     * 
     * @type {number}
     * @memberof AssemblyStep
     */
    versionNo: number;
    /**
     * 
     * @type {Guid}
     * @memberof AssemblyStep
     */
    id: Guid;
    /**
     * 
     * @type {string}
     * @memberof AssemblyStep
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof AssemblyStep
     */
    description: string;
    /**
     * 
     * @type {Guid}
     * @memberof AssemblyStep
     */
    assemblyId: Guid;
    /**
     * 
     * @type {Guid}
     * @memberof AssemblyStep
     */
    assemblyRequirementId?: Guid;
    /**
     * 
     * @type {Guid}
     * @memberof AssemblyStep
     */
    tagId?: Guid;
    /**
     * 
     * @type {Guid}
     * @memberof AssemblyStep
     */
    resourceId?: Guid;
    /**
     * 
     * @type {number}
     * @memberof AssemblyStep
     */
    duration: number;
    /**
     * 
     * @type {number}
     * @memberof AssemblyStep
     */
    capacity: number;
    /**
     * 
     * @type {number}
     * @memberof AssemblyStep
     */
    sequence: number;
}

export function AssemblyStepFromJSON(json: any): AssemblyStep {
    return AssemblyStepFromJSONTyped(json, false);
}

export function AssemblyStepFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssemblyStep {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'versionNo': json['versionNo'],
        'id': GuidFromJSON(json['id']),
        'name': json['name'],
        'description': json['description'],
        'assemblyId': GuidFromJSON(json['assemblyId']),
        'assemblyRequirementId': !exists(json, 'assemblyRequirementId') ? undefined : GuidFromJSON(json['assemblyRequirementId']),
        'tagId': !exists(json, 'tagId') ? undefined : GuidFromJSON(json['tagId']),
        'resourceId': !exists(json, 'resourceId') ? undefined : GuidFromJSON(json['resourceId']),
        'duration': json['duration'],
        'capacity': json['capacity'],
        'sequence': json['sequence'],
    };
}

export function AssemblyStepToJSON(value?: AssemblyStep | null): any {
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
        'assemblyId': GuidToJSON(value.assemblyId),
        'assemblyRequirementId': GuidToJSON(value.assemblyRequirementId),
        'tagId': GuidToJSON(value.tagId),
        'resourceId': GuidToJSON(value.resourceId),
        'duration': value.duration,
        'capacity': value.capacity,
        'sequence': value.sequence,
    };
}


