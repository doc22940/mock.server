// @flow
import axios from 'axios';
import { observable, action } from 'mobx';
import type { $AxiosXHR } from 'axios';
import type { $GetConfigResponseType } from 'node-mock-server-rest-api';
import type { $ClientPlugin, $ClientPluginOptionsType } from 'node-mock-server-plugin';

import config from '../constants/config';
import RootStore from './RootStore';

import asyncState from '../constants/asyncState';
import type { AsyncStateType } from '../constants/asyncState';

const createUrl = (): string => `${config.getUrlApi()}/config`;
const createUrlPlugin = (pluginName: string): string => `${config.getUrlApi()}/plugin/${pluginName}`;

export type GlobalWindowStoreType = {
	plugins: {
		[key: string]: $ClientPlugin,
	},
};

class ClientConfigStore {
	rootStore: RootStore;

	@observable stateFetch: AsyncStateType = asyncState.INITIAL;
	@observable stateCreate: AsyncStateType = asyncState.DONE;
	@observable stateUpdate: AsyncStateType = asyncState.DONE;

	@observable config: ?$GetConfigResponseType;
	@observable pluginInstances: { [key: string]: $ClientPlugin };

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

	get plugins(): Array<string> {
		return (this.config || {}).plugins || [];
	}

	get globalWindowStore(): ?GlobalWindowStoreType {
		return window.NodeMockServer || undefined;
	}

	get pluginInstantiationOptions(): $ClientPluginOptionsType {
		return {
			config,
			dependencies: {
				axios,
			},
			hooks: this.rootStore.hooksStore.clientPluginCreationHooks,
		};
	}

	@action
	fetch = () => {
		this.stateFetch = asyncState.PENDING;
		axios
			.get(`${createUrl()}`, {
				withCredentials: false,
			})
			.then(this.fetchSuccess)
			.catch(this.fetchError);
	};
	@action.bound
	fetchSuccess(response: $AxiosXHR<$GetConfigResponseType>) {
		if (!response || !response.data) {
			this.stateFetch = asyncState.ERROR;
			return;
		}

		this.config = response.data;
		this.fetchPlugins()
			.then(this.fetchAllSuccess)
			.catch((err: string) => {
				// TODO implement error handling
				// eslint-disable-next-line
				console.error(`error occurred: ${err}`);
			});
	}
	@action.bound
	fetchAllSuccess() {
		this.createPlugins();
		this.stateFetch = asyncState.DONE;
	}
	@action.bound
	fetchError() {
		// eslint-disable-next-line
		console.log('error');
		this.stateFetch = asyncState.ERROR;
	}

	fetchPlugins = (): Promise<?string> => {
		if (this.plugins.length < 1) {
			return new Promise((resolve: () => void) => {
				resolve();
			});
		}
		return Promise.all(
			this.plugins.map((pluginName: string): Promise<$AxiosXHR<string>> => this.fetchPlugin(pluginName))
		)
			.then((responses: Array<$AxiosXHR<string>>) => {
				responses.forEach((response: $AxiosXHR<string>) => {
					const elemScript = document.createElement('script');
					elemScript.innerHTML = response.data;
					if (document.body) {
						document.body.appendChild(elemScript);
					}
				});
			})
			.catch((err: string) => {
				// TODO implement error handling
				// eslint-disable-next-line
				console.error(`error occurred: ${err}`);
			});
	};

	@action.bound
	createPlugins() {
		const globalWindowStore = this.globalWindowStore;
		if (!globalWindowStore || !globalWindowStore.plugins) {
			return;
		}
		const pluginInstances = {};
		this.plugins.forEach((pluginName: string) => {
			if (!globalWindowStore.plugins[pluginName]) {
				return;
			}
			pluginInstances[pluginName] = new globalWindowStore.plugins[pluginName](this.pluginInstantiationOptions);
		});
		this.pluginInstances = pluginInstances;
	}

	fetchPlugin = (pluginName: string): Promise<$AxiosXHR<string>> => {
		return axios.get(`${createUrlPlugin(pluginName)}`, {
			withCredentials: false,
		});
	};
}

export default ClientConfigStore;
