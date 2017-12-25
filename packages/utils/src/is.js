// @flow

import _is from '@sindresorhus/is';

import type {TypeOfValueType, TypeOfType, IsType} from '../node-mock-server-utils.js.flow';

export function typeOf(value: TypeOfValueType): TypeOfType {
	return _is(value);
}
export const is: IsType = {
	undefined: _is.undefined,
	null: _is.null,
	string: _is.string,
	number: _is.number,
	boolean: _is.boolean,
	symbol: _is.symbol,
	array: _is.array,
	function: _is.function,
	buffer: _is.buffer,
	object: _is.object,
	regExp: _is.regExp,
	date: _is.date,
	error: _is.error,
	nativePromise: _is.nativePromise,
	promise: _is.promise,
	generator: _is.generator,
	generatorFunction: _is.generatorFunction,
	map: _is.map,
	set: _is.set,
	weakMap: _is.weakMap,
	weakSet: _is.weakSet,
	nan: _is.nan,
	nullOrUndefined: _is.nullOrUndefined,
	primitive: _is.primitive,
	integer: _is.integer,
	plainObject: _is.plainObject,
	inRange: _is.inRange,
	domElement: _is.domElement,
	empty: _is.empty,
};
