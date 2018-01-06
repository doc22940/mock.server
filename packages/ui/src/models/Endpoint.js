// @flow
// import { observable, action } from "mobx";
import type { $ResponseGetEndpointType } from 'node-mock-server-rest-api';
import type { $MethodEnumType } from 'node-mock-server-utils';

/**
 *
 * @constructor Map
 */
class Endpoint {
	endpoint: string;
	endpointId: string;
	methods: Array<$MethodEnumType>;

	constructor({ endpoint, endpointId, methods }: $ResponseGetEndpointType) {
		this.endpoint = endpoint;
		this.endpointId = endpointId;
		this.methods = methods;
	}
}

export default Endpoint;
