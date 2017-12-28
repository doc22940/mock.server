// @flow

import React from 'react';
import {spring, AnimatedSwitch} from 'react-router-transition';

export type SwitchFadePropsType = {
	children?: React$Node,
};
export type BounceReturnType = {
	[key: string]: string | number,
};
export type MapStylesStylesType = {
	opacity: number,
	scale: number,
};
export type MapStylesReturnType = {
	opacity: number,
	transform: string,
};

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles({opacity, scale}: MapStylesStylesType): MapStylesReturnType {
	return {
		opacity,
		transform: `scale(${scale})`,
	};
}

// wrap the `spring` helper to use a bouncy config
function bounce(val: number): BounceReturnType {
	return spring(val, {
		stiffness: 330,
		damping: 22,
	});
}

// child matches will...
const bounceTransition = {
	// start in a transparent, upscaled state
	atEnter: {
		opacity: 0,
		scale: 1.2,
	},
	// leave in a transparent, downscaled state
	atLeave: {
		opacity: bounce(0),
		scale: bounce(0.8),
	},
	// and rest at an opaque, normally-scaled state
	atActive: {
		opacity: bounce(1),
		scale: bounce(1),
	},
};

const SwitchFade = ({children}: SwitchFadePropsType): React$Element<*> => (
	<AnimatedSwitch
		atEnter={bounceTransition.atEnter}
		atLeave={bounceTransition.atLeave}
		atActive={bounceTransition.atActive}
		mapStyles={mapStyles}
		className="route-wrapper"
	>
		{children}
	</AnimatedSwitch>
);

SwitchFade.displayName = 'SwitchFade';

export default SwitchFade;
