// @flow
// import { observable, action } from "mobx";
import type { $MethodEnumType } from 'node-mock-server-utils';
import type { $GetMethodResponseType } from 'node-mock-server-rest-api';

/**
 *
 * @constructor Map
 */
class Method {
	method: string;
	methodId: $MethodEnumType;
	desc: string;
	desc2: string;

	constructor({ method, methodId, desc, desc2 }: $GetMethodResponseType) {
		this.method = method;
		this.methodId = methodId;
		this.desc = desc;
		this.desc2 = desc2;
	}
}

export default Method;
