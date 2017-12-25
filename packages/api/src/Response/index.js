// @flow

import path from 'path';
import {decode} from 'node-mock-server-uuid';
import {writeFile, readFile} from 'node-mock-server-utils';
import type {ResponseConstructorType, ResponseJsonType} from '../../node-mock-server-api.js.flow';

class Response {
	src: string;
	endpointId: string;
	methodId: string;
	response: string;
	responseId: string;
	status: number;
	data: ?string;

	constructor({src, endpointId, methodId, responseId}: ResponseConstructorType) {
		this.src = src;
		this.endpointId = endpointId;
		this.methodId = methodId;
		this.response = decode(responseId);
		this.responseId = responseId;
		this.status = parseInt((this.response.match(/^\d\d\d/) || [])[0] || '200', 10);
		this.data = readFile(path.join(src, endpointId, methodId, 'data', this.response));
	}

	getData(): ?string {
		return this.data;
	}

	updateResponse(data: string): boolean {
		if (typeof data !== 'string') {
			return false;
		}

		const {src, endpointId, methodId, responseId} = this;

		writeFile(path.join(src, endpointId, methodId, 'data', responseId), data);
		this.data = data;

		return true;
	}

	toJson(): ResponseJsonType {
		return {
			response: this.response,
			responseId: this.responseId,
			status: this.status,
			data: this.data,
		};
	}
}

export default Response;
