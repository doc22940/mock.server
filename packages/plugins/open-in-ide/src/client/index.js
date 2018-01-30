// @flow
/* eslint no-console: 0*/
import type { $ClientPluginOptionsType } from 'node-mock-server-plugin';

window.NodeMockServer = window.NodeMockServer || {};
window.NodeMockServer.plugins = window.NodeMockServer.plugins || {};

class OpenInIdeClientPlugin {
	constructor({ config, hooks, dependencies }: $ClientPluginOptionsType) {
		// open store.json file
		hooks.endpointMethodView.addHeaderAction({
			name: 'Open description file',
			icon: 'InsertDriveFile',
			onClick(endpointId: string, method: string) {
				const pathStoreFile = `/data/${endpointId}/${method}/store.json`;
				dependencies.axios.get(`${config.getUrlApi()}/open/${encodeURIComponent(pathStoreFile)}`);
			},
		});
		// open endpoint directory
		hooks.endpointMethodView.addHeaderAction({
			name: 'Open directory',
			icon: 'FolderOpen',
			onClick(endpointId: string, method: string) {
				const pathStoreFile = `/data/${endpointId}/${method}/`;
				dependencies.axios.get(`${config.getUrlApi()}/open/${encodeURIComponent(pathStoreFile)}`);
			},
		});
	}
}

window.NodeMockServer.plugins['node-mock-server-plugin-open-in-ide'] = OpenInIdeClientPlugin;
