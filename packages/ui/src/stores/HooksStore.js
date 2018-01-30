// @flow
// import { action } from 'mobx';
import type { $ClientPluginHooksType } from 'node-mock-server-plugin';

import RootStore from './RootStore';

export type ClientPluginType = any;
export type HeaderActionType = {
	name: string,
	icon?: string,
	onClick: (endpointId: string, method: string) => void,
};

export type EndpointMethodDetailViewType = {
	headerActions: Array<HeaderActionType>,
};

class HooksStore {
	rootStore: RootStore;
	endpointMethodView: EndpointMethodDetailViewType = {
		headerActions: [],
	};

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	get clientPluginCreationHooks(): $ClientPluginHooksType {
		return {
			endpointMethodView: {
				addHeaderAction: (item: HeaderActionType) => {
					this.endpointMethodView.headerActions.push(item);
				},
			},
		};
	}
}

export default HooksStore;
