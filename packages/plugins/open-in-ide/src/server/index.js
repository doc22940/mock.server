// @flow
/* eslint no-console: 0*/
import type { $Request, $Response } from 'express';
import opn from 'opn';
import path from 'path';
import { isFile, isDir } from 'node-mock-server-utils';
import log from 'node-mock-server-log';
import NodeMockServerPlugin from 'node-mock-server-plugin';

class OpenInIdePlugin extends NodeMockServerPlugin {
	name: string = 'node-mock-server-plugin-open-in-ide';

	addRestApiEndpointHook() {
		this.restApiApp.get('/open/:path', (req: $Request, res: $Response) => {
			// http://localhost:3003/open/%2Fconfigs%2Fnode-flow-config%2Fscripts%2Fbuild.js
			const requestedFilePath = path.join(this.cwd, '.nodemockserver', req.params.path);
			if (!isFile(requestedFilePath) && !isDir(requestedFilePath)) {
				const msg = `Requested file or directory (${requestedFilePath}) don't exit`;
				log.error(msg);
				res.statusCode = 400;
				res.end(msg);
				return;
			}
			const maxWait = new Promise((resolve: () => void) => {
				setTimeout(resolve, 1000);
			});

			// fire and forget
			Promise.race([maxWait, opn(requestedFilePath)])
				.then(() => {
					res.statusCode = 201;
					res.end();
				})
				.catch((err: string) => {
					res.statusCode = 400;
					res.end(err);
				});
		});
	}
}

export default OpenInIdePlugin;
