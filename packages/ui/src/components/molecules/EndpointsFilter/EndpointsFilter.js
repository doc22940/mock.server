// @flow
/* eslint no-inline-comments: 0*/
import React from 'react';
import { observer, inject } from 'mobx-react';
// import debounce from 'debounce';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MethodAvatar from '../../atoms/MethodAvatar/MethodAvatar';
import styles from './styles';
import EndpointsStore from '../../../stores/EndpointsStore';
import type { ClassesType } from '../../../types/classes';

export type EndpointsFilterPropsType = {
	classes?: ClassesType,
	endpointsStore: EndpointsStore,
};
export type EndpointsFilterStateType = {
	expanded: null | boolean | string,
};

class EndpointsFilter extends React.Component<EndpointsFilterPropsType, EndpointsFilterStateType> {
	state = {
		expanded: null,
	};

	handleChangeFactory = (panel: string): ((event: Event, expanded: boolean) => void) => {
		return (event: Event, expanded: boolean) => {
			this.setState({
				expanded: expanded ? panel : false,
			});
		};
	};

	// handleQueryChangeFactory = (delay: number): ((event: SyntheticInputEvent<>) => void) => {
	// 	const value = event.target.value;
	// 	return debounce(this.handleQueryChange.bind(this, value), delay);
	// };

	handleQueryChange = (event: SyntheticInputEvent<>) => {
		this.props.endpointsStore.setFilterQuery(event.target.value);
	};

	render(): React$Element<*> {
		const { classes = {}, endpointsStore } = this.props;
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
						{/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
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
						<Typography>
							Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus
							est, id dignissim quam.
						</Typography>
						<MethodAvatar method="get" />
						<MethodAvatar method="post" />
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

export default inject('endpointsStore')(withStyles(styles)(observer(EndpointsFilter)));
