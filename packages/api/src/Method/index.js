// @flow

import path from 'path';
import {encode} from 'node-mock-server-uuid';
import {readDir, writeDir, writeFile} from 'node-mock-server-utils';
// import log from 'node-mock-server-log';
import Response from '../Response';

import type {MethodJsonType, MethodConstructorType} from '../../node-mock-server-api.js.flow';

class Method {
	src: string;
	endpointId: string;
	methodId: string;
	responses: Array<Response> = [];
	responsesById: {[key: string]: Response} = {};

	constructor({src, endpointId, methodId}: MethodConstructorType) {
		this.src = src;
		this.endpointId = endpointId;
		this.methodId = methodId;

		readDir(path.join(this.src, this.endpointId, this.methodId, 'data')).forEach((response: string) => {
			const responseId = encode(response);
			this.responsesById[responseId] = new Response({src, endpointId, methodId, responseId});
			this.responses.push(this.responsesById[responseId]);
		});
	}

	getResponses = (): Array<Response> => {
		return this.responses;
	};

	getResponse = (responseId: string): Response => {
		return this.responsesById[responseId];
	};

	createResponse = (responseId: string, data: string): boolean => {
		if (typeof responseId !== 'string' || typeof data !== 'string') {
			return false;
		}

		const {src, endpointId, methodId} = this;

		// create directory in case of it don't exist yet
		writeDir(path.join(this.src, this.endpointId, this.methodId, 'data'));
		writeFile(path.join(this.src, this.endpointId, this.methodId, 'data', responseId), data);

		this.responsesById[responseId] = new Response({src, endpointId, methodId, responseId});
		this.responses.push(this.responsesById[responseId]);

		return true;
	};

	toJson = (): MethodJsonType => {
		return {
			method: this.methodId,
			methodId: this.methodId,
			responses: this.responses.map(({response, responseId}: Response): {name: string, id: string} => ({
				name: response,
				id: responseId,
			})),
		};
	};
}

export default Method;
