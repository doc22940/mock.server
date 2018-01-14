// @flow
/* eslint complexity: 0*/
import type { MethodEnumType } from '../node-mock-server-utils.js.flow';

export const METHODS: { [key: MethodEnumType]: MethodEnumType } = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	OPTIONS: 'OPTIONS',
	DELETE: 'DELETE',
};

export const METHODS_BOOLEAN: { [key: MethodEnumType]: boolean } = {
	GET: false,
	PUT: false,
	POST: false,
	OPTIONS: false,
	DELETE: false,
};

export function toMethodEnum(value: string): MethodEnumType {
	const upValue = value.toUpperCase();

	switch (upValue) {
		case METHODS.GET:
			return METHODS.GET;
		case METHODS.PUT:
			return METHODS.PUT;
		case METHODS.POST:
			return METHODS.POST;
		case METHODS.OPTIONS:
			return METHODS.OPTIONS;
		case METHODS.DELETE:
			return METHODS.DELETE;
		default:
			return METHODS.GET;
	}
}
