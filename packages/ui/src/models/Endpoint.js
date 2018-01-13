// @flow
// import { observable, action } from "mobx";
import type { $MethodEnumType } from 'node-mock-server-utils';
import type { $ResponseGetEndpointsEntryMethodEntryType } from 'node-mock-server-rest-api';

/**
 *
 * @constructor Map
 */
class Endpoint {
	endpoint: string;
	endpointId: string;
	methodId: $MethodEnumType;
	desc: string;

	constructor({ endpoint, endpointId, methodId, desc }: $ResponseGetEndpointsEntryMethodEntryType) {
		this.endpoint = endpoint;
		this.endpointId = endpointId;
		this.methodId = methodId;
		this.desc = desc;
	}
}

export default Endpoint;
