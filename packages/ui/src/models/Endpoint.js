// @flow
// import { observable, action } from "mobx";
import type { $ResponseGetEndpointType } from 'node-mock-server-rest-api';

/**
 *
 * @constructor Map
 */
class Endpoint {
	endpoint: string;
	endpointId: string;
	methods: Array<string>;

	constructor({ endpoint, endpointId, methods }: $ResponseGetEndpointType) {
		this.endpoint = endpoint;
		this.endpointId = endpointId;
		this.methods = methods;
	}
}

export default Endpoint;
