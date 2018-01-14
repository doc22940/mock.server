// @flow
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import log from 'node-mock-server-log';
import { Endpoints, Endpoint, Method, Response } from 'node-mock-server-api';
import type { $CreateEndpointType, $CreateMethodType } from 'node-mock-server-api';
import { is } from 'node-mock-server-utils';
import type { $Request, $Response } from 'express';
import type {
	GetEndpointsResponseType,
	GetEndpointsResponseEntryType,
	GetEndpointsResponseEntryMethodType,
	GetEndpointResponseType,
	GetEndpointResponseMethodType,
	GetMethodResponseType,
	GetMethodResponseResponseType,
	GetResponseResponseType,
} from '../node-mock-server-rest-api.js.flow';

export type StartType = {
	port: number,
	src: string,
};

export default function start({ port, src }: StartType) {
	const app = express();
	const api = new Endpoints({ src });

	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	const getEndpointsJson = (endpointsInstances: Array<Endpoint>): GetEndpointsResponseType =>
		endpointsInstances.map(({ endpoint, endpointId, methods }: Endpoint): GetEndpointsResponseEntryType => ({
			endpoint,
			endpointId,
			methods: methods.map(({ methodId, desc }: Method): GetEndpointsResponseEntryMethodType => ({
				method: methodId,
				methodId,
				desc,
			})),
		}));

	app.get('/endpoints', (req: $Request, res: $Response) => {
		res.send(getEndpointsJson(api.getEndpoints()));
	});

	const getEndpointJson = ({ endpoint, endpointId, methods }: Endpoint): GetEndpointResponseType => ({
		endpoint,
		endpointId,
		methods: methods.map(({ methodId, desc }: Method): GetEndpointResponseMethodType => ({
			method: methodId,
			methodId,
			desc,
		})),
	});

	app.post('/endpoints', (req: $Request, res: $Response) => {
		const body: $CreateEndpointType = req.body;
		const { endpoint, method, desc } = body;

		if (!is.object(body) || !is.string(endpoint)) {
			log.error(`rest-api: Endpoint "${endpoint}" couldn't be created!`);
			res.status(400);
			res.send();
			return;
		}

		const endpointInst = api.createEndpoint({ endpoint, method, desc });

		log.info(`rest-api: New endpoint ${endpoint} was created!`);

		res.status(201);
		res.send(getEndpointJson(endpointInst));
	});

	app.get('/endpoints/:endpointId', (req: $Request, res: $Response) => {
		res.send(getEndpointJson(api.getEndpoint(encodeURIComponent(req.params.endpointId))));
	});
	app.delete('/endpoints/:endpointId', (req: $Request, res: $Response) => {
		if (!api.removeEndpoint(encodeURIComponent(req.params.endpointId))) {
			log.error("rest-api: Endpoint couldn't be deleted!");
			res.status(400);
			res.send();
			return;
		}
		log.info('rest-api: Endpoint was deleted!');
		res.send('');
	});

	// CREATE METHOD

	const getMethodJson = ({ methodId, desc, desc2, responses }: Method): GetMethodResponseType => ({
		method: methodId,
		methodId,
		desc,
		desc2,
		responses: responses.map(({ response, responseId }: Response): GetMethodResponseResponseType => ({
			name: response,
			id: responseId,
		})),
	});

	app.get('/endpoints/:endpointId/:methodId', (req: $Request, res: $Response) => {
		res.send(
			getMethodJson(
				api
					.getEndpoint(encodeURIComponent(req.params.endpointId))
					.getMethod(encodeURIComponent(req.params.methodId))
			)
		);
	});

	app.post('/endpoints/:endpointId', (req: $Request, res: $Response) => {
		const body: $CreateMethodType = req.body;
		const { method, desc } = body;

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
		res.send(getMethodJson(methodInst));
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

	const getResponseJson = ({ response, responseId, status, data }: Response): GetResponseResponseType => ({
		response,
		responseId,
		status,
		data,
	});

	app.get('/endpoints/:endpointId/:methodId/:responseId', (req: $Request, res: $Response) => {
		res.send(
			getResponseJson(
				api
					.getEndpoint(encodeURIComponent(req.params.endpointId))
					.getMethod(encodeURIComponent(req.params.methodId))
					.getResponse(encodeURIComponent(req.params.responseId))
			)
		);
	});

	app.listen(port);
}

start({
	port: 3003,
	src: path.join(fs.realpathSync(process.cwd()), '/../demo-data/.nodemockserver/data'),
});
