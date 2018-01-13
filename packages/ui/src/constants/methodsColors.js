// @flow
import lightBlue from 'material-ui/colors/lightBlue';
import lightGreen from 'material-ui/colors/lightGreen';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';
import purple from 'material-ui/colors/purple';
import { METHODS } from 'node-mock-server-utils';
import type { $MethodEnumType } from 'node-mock-server-utils';

export type MethodsColorsType = {
	[key: $MethodEnumType]: string,
};

export const METHODS_COLORS: MethodsColorsType = {
	[METHODS.GET]: lightBlue[500],
	[METHODS.DELETE]: red[500],
	[METHODS.POST]: lightGreen[500],
	[METHODS.PUT]: orange[500],
	[METHODS.OPTIONS]: purple[500],
};
