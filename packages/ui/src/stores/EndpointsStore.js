// @flow
import axios from 'axios';
import { observable, action, computed } from 'mobx';
// import type { IObservableArray } from 'mobx';
import type { $AxiosXHR } from 'axios';
import type { $ResponseGetEndpointsType, $ResponseGetEndpointType } from 'node-mock-server-rest-api';
import type { $MethodEnumType } from 'node-mock-server-utils';

import config from '../constants/config';
import Endpoint from '../models/Endpoint';

import asyncState from '../constants/asyncState';
import type { AsyncStateType } from '../constants/asyncState';
// import Session from "models/Session";

const url = `${config.getUrlApi()}/endpoints`;

// each store is an endpoint but don't have to be
// http://localhost:4000/rest/v1/endpoints
//
class EndpointsStore {
	@observable endpoints: Array<Endpoint>;
	@observable filterQuery: string = '';
	@observable filterMethods: Array<$MethodEnumType> = [];
	@observable stateFetch: AsyncStateType = asyncState.INITIAL;
	@observable stateCreate: AsyncStateType = asyncState.DONE;
	@observable stateUpdate: AsyncStateType = asyncState.DONE;

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

	@computed
	get filteredEndpoints(): Array<Endpoint> {
		return (this.endpoints || []).filter(
			({ endpoint, methods }: Endpoint): boolean =>
				endpoint.indexOf(this.filterQuery) >= 0 &&
				(this.filterMethods.length <= 0 ||
					methods
						.map((method: $MethodEnumType): boolean => this.filterMethods.indexOf(method) >= 0)
						.indexOf(true) >= 0)
		);
	}

	// @computed
	// get filteredMethodEndpoints(): Array<Endpoint> {
	// 	const out: Array<Endpoint> = [];
	// 	this.filteredEndpoints.forEach((endpointInstance: Endpoint) => {
	// 		endpointInstance.methods.forEach((method: string) => {
	// 			out.push({ ...endpointInstance, methods: [method] });
	// 		});
	// 	});
	// 	return out;
	// }

	@action
	setFilterQuery = (query: string) => {
		this.filterQuery = query;
	};

	@action
	toggleFilterMethod = (method: $MethodEnumType) => {
		const index = this.filterMethods.indexOf(method);
		if (index >= 0) {
			// -> IObservableArray don't work with enum?
			// $FlowFixMe
			this.filterMethods.remove(method);
			return;
		}
		this.filterMethods.push(method);
	};

	@action
	fetch = () => {
		this.stateFetch = asyncState.PENDING;
		axios
			.get(`${url}`, {
				withCredentials: false,
			})
			.then(this.fetchSuccess)
			.catch(this.fetchError);
	};
	@action.bound
	fetchSuccess(response: $AxiosXHR<$ResponseGetEndpointsType>) {
		if (!response || !response.data) {
			this.stateFetch = asyncState.ERROR;
			return;
		}

		const out = [];

		response.data.forEach((endpointData: $ResponseGetEndpointType) => {
			endpointData.methods.forEach((method: $MethodEnumType) => {
				out.push(new Endpoint({ ...endpointData, methods: [method] }));
			});
		});

		this.endpoints = out;

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

export default EndpointsStore;
