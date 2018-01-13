// @flow
/* eslint no-inline-comments: 0*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import { METHODS } from 'node-mock-server-utils';
import type { $MethodEnumType } from 'node-mock-server-utils';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
// import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader } from 'material-ui/List';
// import Switch from 'material-ui/Switch';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MethodCheckbox from '../../atoms/MethodCheckbox/MethodCheckbox';
import styles from './styles';
import RootStore from '../../../stores/RootStore';
import type { ClassesType } from '../../../types/classes';

export type EndpointsFilterPropsType = {
	classes?: ClassesType,
	rootStore: RootStore,
};
export type EndpointsFilterStateType = {
	expanded: null | boolean | string,
};

class EndpointsFilter extends React.Component<EndpointsFilterPropsType, EndpointsFilterStateType> {
	state = {
		expanded: null,
	};

	handleChangeFactory = (panel: string): ((event: SyntheticMouseEvent<>, expanded: boolean) => void) => {
		return (event: SyntheticMouseEvent<>, expanded: boolean) => {
			this.setState({
				expanded: expanded ? panel : false,
			});
		};
	};

	handleMethodFilterFactory = (method: $MethodEnumType): ((event: SyntheticMouseEvent<>) => void) => {
		return (event: SyntheticMouseEvent<>) => {
			event.preventDefault();
			this.props.rootStore.endpointsStore.toggleFilterMethod(method);
		};
	};

	handleQueryChange = (event: SyntheticInputEvent<>) => {
		this.props.rootStore.endpointsStore.setFilterQuery(event.target.value);
	};

	render(): React$Element<*> {
		const { classes = {}, rootStore } = this.props;
		const { endpointsStore } = rootStore;
		const { expanded } = this.state;

		return (
			<div className={classes.root}>
				{/* $FlowFixMe */}
				<ExpansionPanel
					className={expanded ? classes.panelExpanded : classes.panel}
					expanded={expanded === 'filter'}
					onChange={this.handleChangeFactory('filter')}
				>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>Filter</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<TextField
							id="query"
							label="Search"
							className={classes.textField}
							value={endpointsStore.filterQuery}
							onChange={this.handleQueryChange}
							margin="normal"
						/>
					</ExpansionPanelDetails>
					<Divider />
					<ExpansionPanelDetails>
						<ul className={classes.methodSelector}>
							{Object.keys(METHODS).map((method: $MethodEnumType): React$Element<*> => (
								<li key={method} className={classes.methodSelectorItem}>
									<MethodCheckbox
										onClick={this.handleMethodFilterFactory(method)}
										checked={endpointsStore.filterMethods.indexOf(method) >= 0}
										method={method}
									/>
								</li>
							))}
						</ul>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

export default inject('rootStore')(withStyles(styles)(observer(EndpointsFilter)));
