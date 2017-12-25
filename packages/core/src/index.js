// @flow
/* eslint no-console: 0*/

import fs from 'fs';
import path from 'path';
import {Endpoints, Endpoint, Method, Response} from 'node-mock-server-api';
import {encode, decode} from 'node-mock-server-uuid';

const uuid: string = encode('/app/v1/products/:productId');

console.log('uuid', uuid);
console.log('uuid decoded', decode(uuid));
// console.log(<Button modifier="test" />);

const cwd = fs.realpathSync(process.cwd());
const api = new Endpoints({
	src: path.join(cwd, '/packages/demo-data/.nodemockserver/data'),
});

api.getEndpoints().forEach(({endpoint, endpointId, getMethods}: Endpoint) => {
	console.log(`endpoint: ${endpoint} (${endpointId})`);
	getMethods().forEach(({methodId, getResponses}: Method) => {
		console.log(`  method: ${methodId}`);
		getResponses().forEach(({responseId}: Response) => {
			console.log(`    response: ${responseId}`);
		});
	});
});
