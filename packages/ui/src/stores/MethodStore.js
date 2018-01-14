// @flow
import axios from 'axios';
import { observable, action } from 'mobx';
// import type { IObservableArray } from 'mobx';
import type { $AxiosXHR } from 'axios';
import type { $GetMethodResponseType } from 'node-mock-server-rest-api';
import type { $MethodEnumType } from 'node-mock-server-utils';

import config from '../constants/config';
import Method from '../models/Method';
import RootStore from './RootStore';

import asyncState from '../constants/asyncState';
import type { AsyncStateType } from '../constants/asyncState';
// import Session from "models/Session";

const createUrl = (endpointId: string, methodId: $MethodEnumType): string =>
	`${config.getUrlApi()}/endpoints/${endpointId}/${methodId}`;

// each store is an endpoint but don't have to be
// http://localhost:4000/rest/v1/endpoints
//
class MethodStore {
	rootStore: RootStore;

	@observable stateFetch: AsyncStateType = asyncState.INITIAL;
	@observable stateCreate: AsyncStateType = asyncState.DONE;
	@observable stateUpdate: AsyncStateType = asyncState.DONE;

	@observable currentEndpointId: ?string;
	@observable method: Method;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	isStateFetch(state: AsyncStateType): boolean {
		return this.stateFetch === state;
	}
	isStateCreate(state: AsyncStateType): boolean {
		return this.stateCreate === state;
	}
	isStateUpdate(state: AsyncStateType): boolean {
		return this.stateUpdate === state;
	}
	isState(state: AsyncStateType): boolean {
		return this.isStateFetch(state) || this.isStateCreate(state) || this.isStateUpdate(state);
	}

	get isLoading(): boolean {
		return this.isState(asyncState.INITIAL) || this.isState(asyncState.PENDING);
	}
	get hasError(): boolean {
		return this.isState(asyncState.ERROR);
	}

	@action
	fetch = (endpointId: string, methodId: $MethodEnumType) => {
		this.stateFetch = asyncState.PENDING;
		axios
			.get(`${createUrl(endpointId, methodId)}`, {
				withCredentials: false,
			})
			.then(this.fetchSuccess.bind(this, endpointId, methodId))
			.catch(this.fetchError);
	};
	@action.bound
	fetchSuccess(endpointId: string, methodId: $MethodEnumType, response: $AxiosXHR<$GetMethodResponseType>) {
		if (!response || !response.data) {
			this.stateFetch = asyncState.ERROR;
			return;
		}

		this.currentEndpointId = endpointId;
		this.method = new Method(response.data);
		this.stateFetch = asyncState.DONE;
	}
	@action.bound
	fetchError() {
		// eslint-disable-next-line
		console.log('error');
		this.stateFetch = asyncState.ERROR;
	}
	//
	// @action
	// create = (formData: User) => {
	// 	this.stateCreate = asyncState.PENDING;
	// 	axios
	// 		.post(url, formData)
	// 		.then(this.createSuccess)
	// 		.catch(this.createError);
	// };
	// @action.bound
	// createSuccess(response: {data: User}) {
	// 	if (!response || !response.data) {
	// 		this.stateCreate = asyncState.ERROR;
	// 		this.delete();
	// 		return;
	// 	}
	// 	this.stateCreate = asyncState.DONE;
	// 	this.user = new User(response.data);
	// }
	// @action.bound
	// createError() {
	// 	this.stateCreate = asyncState.ERROR;
	// 	this.delete();
	// }
	//
	// @action
	// update = (formData: User) => {
	// 	this.stateUpdate = asyncState.PENDING;
	// 	axios
	// 		.put(`${url}/${this.user.id}`, formData)
	// 		.then(this.updateSuccess)
	// 		.catch(this.updateError);
	// };
	// @action.bound
	// updateSuccess(response: {data: User}) {
	// 	if (!response || !response.data) {
	// 		this.stateUpdate = asyncState.ERROR;
	// 		this.delete();
	// 		return;
	// 	}
	// 	this.stateUpdate = asyncState.DONE;
	// 	this.user = new User(response.data);
	// }
	// @action.bound
	// updateError() {
	// 	this.stateUpdate = asyncState.ERROR;
	// 	this.delete();
	// }
	//
	// @action
	// delete = () => {
	// 	delete this.user;
	// };
}

export default MethodStore;
