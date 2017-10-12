// @flow
/* global module */

import React from 'react';
import type {Element} from 'react';
import {storiesOf} from '@storybook/react';

import Buttons from './buttons';
import Forms, {
	DocTextField,
	DocTextarea,
	DocCheckbox,
	DocSwitch,
	DocSelect,
	DocRadios,
} from './forms';
import Typography, {
	DocHeading,
	DocParagraphs,
	DocBlockquote,
	DocLists,
} from './typography';
import Tables from './tables';
import Toasts from './toasts';
import Notifications from './notifications';
import Grid, {DocFlexbox, DocResponsive, DocOffset} from './grid';

storiesOf('Elements/Typography', module)
	.add('Intro', (): Element<*> => <Typography />)
	.add('Heading', (): Element<*> => <DocHeading />)
	.add('Paragraphs', (): Element<*> => <DocParagraphs />)
	.add('Blockquote', (): Element<*> => <DocBlockquote />)
	.add('Lists', (): Element<*> => <DocLists />);
storiesOf('Elements/Tables', module).add('Intro', (): Element<*> => <Tables />);
storiesOf('Elements/Buttons', module).add('Intro', (): Element<*> => (
	<Buttons />
));
storiesOf('Elements/Forms', module)
	.add('Into', (): Element<*> => <Forms />)
	.add('TextField', (): Element<*> => <DocTextField />)
	.add('Textarea', (): Element<*> => <DocTextarea />)
	.add('Radios', (): Element<*> => <DocRadios />)
	.add('Checkbox', (): Element<*> => <DocCheckbox />)
	.add('Switch', (): Element<*> => <DocSwitch />)
	.add('Select', (): Element<*> => <DocSelect />);
storiesOf('Layout/Grid', module)
	.add('Intro', (): Element<*> => <Grid />)
	.add('Flexbox', (): Element<*> => <DocFlexbox />)
	.add('Offset', (): Element<*> => <DocOffset />)
	.add('Responsive', (): Element<*> => <DocResponsive />);
storiesOf('Components/Toasts', module).add('Intro', (): Element<*> => (
	<Toasts />
));
storiesOf('Components/Notifications', module).add('Intro', (): Element<*> => (
	<Notifications />
));
// .add("Notifications", (): Element<*> => <Notifications />);
