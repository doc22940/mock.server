/* global describe, it, expect */
import path from 'path';
import Response from './index';

const response = {
	src: path.join(process.cwd(), '../demo-data/.nodemockserver/data'),
	endpointId: 'L3Jlc3Qvc3RvcmUvaW52ZW50b3J5',
	methodId: 'GET',
	responseId: '200_success.json',
};

describe('Response', () => {
	it('method: getData', () => {
		const res = new Response(response);
		expect(res.getData()).toBe('{}');
	});
	it('method: responseId without status', () => {
		const res = new Response({...response, responseId: 'success.json'});
		expect(res.getData()).toBe(undefined);
	});
	it('method: updateResponse', () => {
		const res = new Response(response);
		res.updateResponse('{success:true}');
		expect(res.getData()).toBe('{success:true}');
		res.updateResponse('{}');
	});
	it('method: updateResponse invalid', () => {
		const res = new Response(response);
		res.updateResponse(11321);
		expect(res.getData()).toBe('{}');
	});
	it('method: toJson', () => {
		const res = new Response(response);
		expect(res.toJson()).toEqual({
			data: '{}',
			response: '200_success.json',
			responseId: '200_success.json',
			status: 200,
		});
	});
});
