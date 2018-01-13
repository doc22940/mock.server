// @flow
// import { observable, action } from "mobx";
import type { $MethodEnumType } from 'node-mock-server-utils';
import type { $ResponseGetMethodType } from 'node-mock-server-rest-api';

/**
 *
 * @constructor Map
 */
class Method {
	method: string;
	methodId: $MethodEnumType;
	desc: string;
	desc2: string;

	constructor({ method, methodId, desc, desc2 }: $ResponseGetMethodType) {
		this.method = method;
		this.methodId = methodId;
		this.desc = desc;
		this.desc2 = desc2;
	}
}

export default Method;
