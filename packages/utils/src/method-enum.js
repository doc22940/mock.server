// @flow
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

export function toMethodEnum(value: string): ?MethodEnumType {
	const upValue = value.toUpperCase();

	if (!METHODS[upValue]) {
		return;
	}

	return METHODS[upValue];
}
