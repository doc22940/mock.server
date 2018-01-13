// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import SwitchFade from './SwitchFade/SwitchFade';
import TemplateDefault from '../../templates/Default/Default';
import DialogFullScreen from '../Dialog/FullScreen';

// Stores
import RootStore from '../../../stores/RootStore';

// Pages
import EndpointsPage from '../../pages/Endpoints/Endpoints';
import EndpointMethodPage from '../../pages/EndpointMethod/EndpointMethod';

import './Routes.css';

const About = (): React$Element<*> => (
	<div>
		<h2>About</h2>
	</div>
);

const Topic = ({ match }: ContextRouter): React$Element<*> => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
);

const Topics = ({ match }: ContextRouter): React$Element<*> => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>Rendering with React</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>Components</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>Props v. State</Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Topic} />
		<Route exact path={match.url} render={(): React$Element<*> => <h3>Please select a topic.</h3>} />
	</div>
);

const Overlay = ({ history }: ContextRouter): React$Element<*> => (
	<DialogFullScreen
		title="Hallo"
		onClose={() => {
			history.goBack();
		}}
	>
		<div />
	</DialogFullScreen>
);

export type RoutesPropsType = {
	rootStore: RootStore,
};

export type RoutePropsType = {} & ContextRouter;

class Routes extends Component<*> {
	componentDidMount() {
		this.props.rootStore.endpointsStore.fetch();
	}

	render(): React$Element<*> {
		return (
			<Router>
				<div>
					<TemplateDefault>
						<SwitchFade>
							<Route
								path="/endpoints"
								render={(props: ContextRouter): React$Element<*> => (
									<div>
										<EndpointsPage {...props} />
										<Route
											exact
											path="/endpoints/:endpointId/:methodId"
											component={EndpointMethodPage}
										/>
									</div>
								)}
							/>
							<Route path="/about" component={About} />
							<Route path="/topics" component={Topics} />
						</SwitchFade>
						<Route path="/overlay" component={Overlay} />
					</TemplateDefault>
				</div>
			</Router>
		);
	}
}

export default inject('rootStore')(observer(Routes));
