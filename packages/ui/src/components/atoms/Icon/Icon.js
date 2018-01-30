// @flow
import React from 'react';
import * as icons from 'material-ui-icons';

export type IconPropsType = {
	id: string,
};

const Icon = ({ id }: IconPropsType): React$Element<*> => {
	const IconComponent = icons[id];
	return IconComponent ? <IconComponent /> : <span />;
};

Icon.displayName = 'Icon';

export const renderIcon = (id: string): React$Element<*> => {
	const IconComponent = icons[id];
	return IconComponent ? <IconComponent /> : <span />;
};

export default Icon;
