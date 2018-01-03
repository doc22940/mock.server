// @flow

import React from 'react';
import { observer, inject } from 'mobx-react';
import type { ContextRouter } from 'react-router-dom';
import EndpointsStore from '../../../stores/EndpointsStore';
import Endpoint from '../../../models/Endpoint';
import EndpointsList, { EndpointsListItem } from '../../molecules/EndpointsList/EndpointsList';

export type EndpointsPropsType = ContextRouter & {
	endpointsStore: EndpointsStore,
};

const Endpoints = ({ endpointsStore, history }: EndpointsPropsType): React$Element<*> => {
	const { isLoading, hasError, filteredEndpoints } = endpointsStore;

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	if (hasError) {
		return <div>Error</div>;
	}

	return (
		<div>
			<EndpointsList>
				{filteredEndpoints.map(({ endpoint, endpointId, methods }: Endpoint): React$Element<*> => (
					<EndpointsListItem
						key={endpointId}
						title={endpoint}
						subTitle={methods.join(', ')}
						onClick={(): void => history.push(`/endpoints/${endpointId}`)}
					/>
				))}
			</EndpointsList>
		</div>
	);
};

export default inject('endpointsStore')(observer(Endpoints));
