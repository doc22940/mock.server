// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import type { RouterHistory, Location, Match } from 'react-router-dom';
import { toMethodEnum } from 'node-mock-server-utils';

import DialogFullScreen from '../../organisms/Dialog/FullScreen';
import EndpointMethodHeader from '../../molecules/EndpointMethodHeader/EndpointMethodHeader';
import RootStore from '../../../stores/RootStore';
import MethodStore from '../../../stores/MethodStore';
import EndpointsStore from '../../../stores/EndpointsStore';
import Endpoint from '../../../models/Endpoint';

export type EndpointMethodPagePropsType = {
	rootStore: RootStore,
	history: RouterHistory,
	location: Location,
	match: Match,
};

class EndpointMethodPage extends Component<EndpointMethodPagePropsType> {
	static displayName = 'EndpointMethodPage';

	componentDidMount() {
		const { rootStore, match } = this.props;
		const { params = {} } = match;
		if (!params.endpointId || !params.methodId) {
			return;
		}
		rootStore.methodStore.fetch(params.endpointId, toMethodEnum(params.methodId));
	}

	handleClickClose = () => {
		this.props.history.goBack();
	};

	get isLoading(): boolean {
		const { rootStore } = this.props;
		const { endpointsStore, methodStore } = rootStore;
		return endpointsStore.isLoading || methodStore.isLoading;
	}

	get methodStore(): MethodStore {
		return this.props.rootStore.methodStore;
	}

	get endpointsStore(): EndpointsStore {
		return this.props.rootStore.endpointsStore;
	}

	get endpointInstance(): ?Endpoint {
		return this.endpointsStore.getEndpointById(this.methodStore.currentEndpointId);
	}

	get renderTitle(): React$Element<*> {
		return <span>{`Endpoint details`}</span>;
	}

	get renderLoading(): React$Element<*> {
		return (
			<DialogFullScreen title={'Loading ...'} onClose={this.handleClickClose}>
				{'Loading ...'}
			</DialogFullScreen>
		);
	}

	render(): React$Element<*> {
		if (this.isLoading) {
			return this.renderLoading;
		}
		// this.methodStore.currentEndpointId
		return (
			<DialogFullScreen title={this.renderTitle} onClose={this.handleClickClose}>
				<EndpointMethodHeader
					endpointId={(this.endpointInstance || {}).endpointId}
					method={this.methodStore.method.methodId}
					title={(this.endpointInstance || {}).endpoint}
					subTitle={this.methodStore.method.desc}
				/>
			</DialogFullScreen>
		);
	}
}

export default inject('rootStore')(observer(EndpointMethodPage));
