// @flow
/* eslint no-console: 0*/
/* eslint global-require: 0*/

import path from 'path';

import startRestApi from 'node-mock-server-rest-api';
import { Plugin } from 'node-mock-server-plugin';
import type { $GetConfigResponseType } from 'node-mock-server-rest-api';
import type { StartOptionsType, ConfigType } from '../node-mock-server-core.js.flow';

// import log from 'node-mock-server-log';

const getClientConfig = ({ ui, restApi, plugins }: ConfigType): $GetConfigResponseType => {
	return {
		ui,
		restApi,
		plugins: plugins.map((pluginInstance: Plugin): string => pluginInstance.name),
	};
};

export default function start({ cwd }: StartOptionsType) {
	console.log('start mock server');

	const mockServerDir: string = path.join(cwd, '.nodemockserver');
	// $FlowFixMe
	const config: ConfigType = require(path.join(mockServerDir, 'config.js'));

	const restApiApp = startRestApi({
		port: config.restApi.port,
		cwd,
		src: path.join(mockServerDir, '/data'),
		clientConfig: getClientConfig(config),
	});

	config.plugins.forEach((pluginInstance: Plugin) => {
		pluginInstance.connect({ restApiApp, cwd, mockServerDir, config });
		pluginInstance.addRestApiEndpointHook();
	});
}
