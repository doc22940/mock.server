// @flow

import path from 'path';
import log from 'node-mock-server-log';
import {readDir, writeDir, writeFile, removeDir, is, toMethodEnum} from 'node-mock-server-utils';

import {encode} from 'node-mock-server-uuid';
import Endpoint from '../Endpoint';

import type {
	EndpointsConstructorType,
	EndpointJsonType,
	EndpointDetailedJsonType,
	EndpointCreateDataType,
} from '../../node-mock-server-api.js.flow';

class Endpoints {
	src: string;
	endpoints: Array<Endpoint> = [];
	endpointsById: {[key: string]: Endpoint} = {};

	constructor({src}: EndpointsConstructorType) {
		this.src = src;
		readDir(this.src).forEach((endpointId: string) => {
			this.endpointsById[endpointId] = new Endpoint({src: this.src, endpointId});
			this.endpoints.push(this.endpointsById[endpointId]);
		});
	}

	getEndpoints = (): Array<Endpoint> => {
		return this.endpoints;
	};

	getEndpoint = (endpointId: string): Endpoint => {
		return this.endpointsById[endpointId];
	};

	getEndpointsAsJson = (): Array<EndpointJsonType> => {
		return this.endpoints.map((endpoint: Endpoint): EndpointJsonType => endpoint.toJson());
	};

	getDetailedEndpointsAsJson = (): Array<EndpointDetailedJsonType> => {
		return this.endpoints.map((endpoint: Endpoint): EndpointDetailedJsonType => endpoint.toDetailedJson());
	};

	removeEndpoint = (endpointId: string): boolean => {
		const endpointInst = this.getEndpoint(endpointId);
		if (!endpointInst) {
			return false;
		}

		if (!removeDir(path.join(this.src, endpointId))) {
			return false;
		}

		const index = this.endpoints.indexOf(this.endpointsById[endpointId]);
		const endpointsArr = [].concat(this.endpoints);
		endpointsArr.splice(index, 1);
		this.endpoints = endpointsArr;
		delete this.endpointsById[endpointId];
		return true;
	};

	createEndpoint = ({endpoint, desc = '', method = 'GET'}: EndpointCreateDataType): Endpoint => {
		if (!is.string(endpoint) || endpoint.indexOf('/') < 0) {
			log.error(`Endpoint string "${endpoint}" is invalid!`);
		}
		const methodEnum = toMethodEnum(method);
		const endpointId = encode(endpoint);

		writeDir(path.join(this.src, endpointId));
		const pathEndpointMethod = path.join(this.src, endpointId, methodEnum);
		writeDir(pathEndpointMethod);
		const pathEndpointData = path.join(pathEndpointMethod, 'data');
		writeDir(pathEndpointData);
		writeFile(path.join(pathEndpointData, '200_empty.json'), '{}');
		writeFile(path.join(pathEndpointData, '200_success.json'), '{}');
		writeFile(path.join(pathEndpointData, '500_error.json'), '{}');
		writeFile(path.join(pathEndpointMethod, 'schema-request.json'), '{}');
		writeFile(path.join(pathEndpointMethod, 'schema-response.json'), '{}');
		writeFile(
			path.join(pathEndpointMethod, 'store.json'),
			JSON.stringify(
				{
					desc,
					desc2: '',
					security: [],
					protected: false,
					status: 'created',
					request: {},
					endpoint,
					method: methodEnum,
					responses: [
						{
							statusCode: '200',
							schema: {
								type: 'application/json',
							},
						},
					],
				},
				null,
				2
			)
		);

		this.endpointsById[endpointId] = new Endpoint({src: this.src, endpointId});
		this.endpoints.push(this.endpointsById[endpointId]);

		return this.endpointsById[endpointId];
	};
}

export default Endpoints;
