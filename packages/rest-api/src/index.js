// @flow
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import log from 'node-mock-server-log';
import {Endpoints} from 'node-mock-server-api';
import type {$EndpointCreateDataType, $MethodCreateDataType} from 'node-mock-server-api';
import {is} from 'node-mock-server-utils';
import type {$Request, $Response} from 'express';

export type StartType = {
	port: number,
	src: string,
};

export default function start({port, src}: StartType) {
	const app = express();
	const api = new Endpoints({src});

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.get('/endpoints', (req: $Request, res: $Response) => {
		res.send(api.getEndpointsAsJson());
	});
	app.post('/endpoints', (req: $Request, res: $Response) => {
		const body: $EndpointCreateDataType = req.body;
		const {endpoint, method, desc} = body;

		if (!is.object(body) || !is.string(endpoint)) {
			log.error(`rest-api: Endpoint "${endpoint}" couldn't be created!`);
			res.status(400);
			res.send();
			return;
		}

		const endpointInst = api.createEndpoint({endpoint, method, desc});

		log.info(`rest-api: New endpoint ${endpoint} was created!`);

		res.status(201);
		res.send(endpointInst.toDetailedJson());
	});

	app.get('/endpoints/:endpointId', (req: $Request, res: $Response) => {
		res.send(api.getEndpoint(encodeURIComponent(req.params.endpointId)).toDetailedJson());
	});
	app.delete('/endpoints/:endpointId', (req: $Request, res: $Response) => {
		if (!api.removeEndpoint(encodeURIComponent(req.params.endpointId))) {
			log.error("rest-api: Endpoint couldn't be deleted!");
			res.status(400);
			res.send();
			return;
		}
		log.info('rest-api: Endpoint was deleted!');
		res.send(api.getEndpointsAsJson());
	});

	// CREATE METHOD
	app.post('/endpoints/:endpointId', (req: $Request, res: $Response) => {
		const body: $MethodCreateDataType = req.body;
		const {method, desc} = body;

		if (!is.object(body) || !is.string(method)) {
			log.error(`rest-api: Method "${method}" couldn't be created!`);
			res.status(400);
			res.send();
			return;
		}

		log.info(`rest-api: New method ${method} was created!`);

		const methodInst = api.getEndpoint(encodeURIComponent(req.params.endpointId)).createMethod({
			method,
			desc,
		});

		if (!methodInst) {
			res.status(400);
			res.send();
			return;
		}

		res.status(201);
		res.send(methodInst.toJson());
	});
	app.get('/endpoints/:endpointId/:methodId', (req: $Request, res: $Response) => {
		res.send(
			api
				.getEndpoint(encodeURIComponent(req.params.endpointId))
				.getMethod(encodeURIComponent(req.params.methodId))
				.toJson()
		);
	});
	// DELETE METHOD
	app.delete('/endpoints/:endpointId/:methodId', (req: $Request, res: $Response) => {
		const endpointInst = api.getEndpoint(encodeURIComponent(req.params.endpointId));
		if (!endpointInst.removeMethod(req.params.methodId)) {
			log.error("rest-api: Method couldn't be deleted!");
			res.status(400);
			res.send();
			return;
		}
		log.info('rest-api: Method was deleted!');
		res.send('');
	});

	app.get('/endpoints/:endpointId/:methodId/:responseId', (req: $Request, res: $Response) => {
		res.send(
			api
				.getEndpoint(encodeURIComponent(req.params.endpointId))
				.getMethod(encodeURIComponent(req.params.methodId))
				.getResponse(encodeURIComponent(req.params.responseId))
				.toJson()
		);
	});

	app.listen(port);
}

start({
	port: 3001,
	src: path.join(fs.realpathSync(process.cwd()), '/../demo-data/.nodemockserver/data'),
});
