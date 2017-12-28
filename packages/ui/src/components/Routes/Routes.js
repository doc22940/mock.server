// @flow
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import type {ContextRouter} from 'react-router-dom';
import SwitchFade from './SwitchFade/SwitchFade';
import PersistentDrawer from '../PersistentDrawer/PersistentDrawer';
import DialogFullScreen from '../DialogFullScreen/DialogFullScreen';

export type RoutesPropType = {
	renderBefore?: React$Node,
};

const Home = (): React$Element<*> => (
	<div>
		<h2>Home</h2>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<p>Hallo</p>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<p>Hallo</p>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<p>Hallo</p>
	</div>
);

const About = (): React$Element<*> => (
	<div>
		<h2>About</h2>
	</div>
);

const Topic = ({match}: ContextRouter): React$Element<*> => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
);

const Topics = ({match}: ContextRouter): React$Element<*> => (
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

const Overlay = ({history}: ContextRouter): React$Element<*> => (
	<DialogFullScreen
		onClose={() => {
			history.goBack();
		}}
	/>
);

const Routes = (): React$Element<*> => (
	<Router>
		<div>
			<PersistentDrawer>
				<ul>
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

				<hr />
				<SwitchFade>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route path="/topics" component={Topics} />
				</SwitchFade>
				<Route path="/overlay" component={Overlay} />
			</PersistentDrawer>
		</div>
	</Router>
);

Routes.displayName = 'Routes';

export default Routes;
