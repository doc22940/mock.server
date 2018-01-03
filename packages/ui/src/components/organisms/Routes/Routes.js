// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import SwitchFade from './SwitchFade/SwitchFade';
import TemplateDefault from '../../templates/Default/Default';
import DialogFullScreen from '../Dialog/FullScreen';
import EndpointsStore from '../../../stores/EndpointsStore';

// Pages
import Endpoints from '../../pages/Endpoints/Endpoints';

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
		onClose={() => {
			history.goBack();
		}}
	/>
);

export type RoutesPropsType = {
	endpointsStore: EndpointsStore,
};

class Routes extends Component<*> {
	componentDidMount() {
		this.props.endpointsStore.fetch();
	}

	render(): React$Element<*> {
		return (
			<Router>
				<div>
					<TemplateDefault>
						{/* <ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/topics">Topics</Link>
							</li>
							<li>
								<Link to="/overlay">Overlay</Link>
							</li>
						</ul>

						<hr /> */}
						<SwitchFade>
							<Route exact path="/" component={Endpoints} />
							<Route path="/about" component={About} />
							<Route path="/topics" component={Topics} />
						</SwitchFade>
						<Route exact path="/overlay" component={Overlay} />
					</TemplateDefault>
				</div>
			</Router>
		);
	}
}

export default inject('endpointsStore')(observer(Routes));
