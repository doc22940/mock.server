// @flow
/* eslint no-console: 0*/
import type { $Application } from 'express';
import { is } from 'node-mock-server-utils';
import type { PluginConnectOptionsType } from '../../node-mock-server-plugin.js.flow';

class NodeMockServerPlugin {
	name: string;
	restApiApp: $Application;
	cwd: string;
	mockServerDir: string;

	connect({ restApiApp, cwd, mockServerDir }: PluginConnectOptionsType) {
		this._validateName();
		this.restApiApp = restApiApp;
		this.cwd = cwd;
		this.mockServerDir = mockServerDir;
	}

	_validateName() {
		if (!is.string(this.name)) {
			throw new Error('Plugin name is missing!');
		}
		if (this.name.indexOf('node-mock-server-plugin-') !== 0) {
			throw new Error('Invalid plugin name, please use the following pattern "node-mock-server-plugin-*"');
		}
	}

	addRestApiEndpointHook() {}
}

export default NodeMockServerPlugin;
