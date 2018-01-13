// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import type { RouterHistory, Location, Match } from 'react-router-dom';
import { toMethodEnum } from 'node-mock-server-utils';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import DialogFullScreen from '../../organisms/Dialog/FullScreen';
import RootStore from '../../../stores/RootStore';
import MethodStore from '../../../stores/MethodStore';

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

	get renderTitle(): React$Element<*> {
		const { rootStore } = this.props;
		const { methodStore, endpointsStore } = rootStore;
		const endpointInstance = endpointsStore.getEndpointById(methodStore.currentEndpointId) || {};
		return <span>{`${methodStore.method.methodId} ${endpointInstance.endpoint}`}</span>;
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

		return (
			<DialogFullScreen title={this.renderTitle} onClose={this.handleClickClose}>
				<Paper elevation={4}>
					<Typography component="p">{this.methodStore.method.desc}</Typography>
				</Paper>
			</DialogFullScreen>
		);
	}
}

// export default EndpointMethodPage;
//
// const EndpointMethodPage = ({ history, match, endpointsStore }: EndpointMethodPagePropsType): React$Element<*> => {
// 	console.log(match.params.endpointId);
// 	console.log(endpointsStore);
// 	// console.log(endpointsStore.endpointsMap[decodeURIComponent(match.params.endpointId)]);
// 	return (
// 		<DialogFullScreen
// 			title={'EndpointMethod'}
// 			onClose={() => {
// 				history.goBack();
// 			}}
// 		>
// 			{/* {endpointsStore.endpointsMap[]} */}
// 		</DialogFullScreen>
// 	);
// };

export default inject('rootStore')(observer(EndpointMethodPage));
