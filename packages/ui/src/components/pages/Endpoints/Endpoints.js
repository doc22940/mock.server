// @flow

import React from 'react';
import { observer, inject } from 'mobx-react';
import type { ContextRouter } from 'react-router-dom';
import type { $MethodEnumType } from 'node-mock-server-utils';

import RootStore from '../../../stores/RootStore';
import Endpoint from '../../../models/Endpoint';
import EndpointsList, { EndpointsListItem } from '../../molecules/EndpointsList/EndpointsList';
import EndpointsFilter from '../../molecules/EndpointsFilter/EndpointsFilter';

export type EndpointsPropsType = ContextRouter & {
	rootStore: RootStore,
};

const Endpoints = ({ rootStore, history }: EndpointsPropsType): React$Element<*> => {
	const { isLoading, hasError, filteredEndpoints } = rootStore.endpointsStore;

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	if (hasError) {
		return <div>Error</div>;
	}

	const handleClickDetailFactor = (endpointId: string, methodId: $MethodEnumType): (() => void) => {
		return () => {
			history.push(`/endpoints/${endpointId}/${methodId}`);
		};
	};

	return (
		<div>
			<EndpointsFilter />
			<EndpointsList>
				{filteredEndpoints.map(({ endpoint, endpointId, methodId, desc }: Endpoint): React$Element<*> => (
					<EndpointsListItem
						key={`${endpointId}_${methodId}`}
						title={endpoint}
						subTitle={desc}
						method={methodId}
						onClick={handleClickDetailFactor(endpointId, methodId)}
					/>
				))}
			</EndpointsList>
		</div>
	);
};

export default inject('rootStore')(observer(Endpoints));
