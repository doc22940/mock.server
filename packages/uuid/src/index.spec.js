/* global describe it expect */
import {encode, decode} from './index.js';

describe('encode', () => {
	it('default', () => {
		expect(encode('/app/v1/products/:productId')).toBe('L2FwcC92MS9wcm9kdWN0cy86cHJvZHVjdElk');
	});
	it('with equal sign', () => {
		expect(encode('/pet/:petId/uploadImage')).toBe('L3BldC86cGV0SWQvdXBsb2FkSW1hZ2U%3D');
	});
});

describe('decode', () => {
	it('default', () => {
		expect(decode('L2FwcC92MS9wcm9kdWN0cy86cHJvZHVjdElk')).toBe('/app/v1/products/:productId');
	});
	it('with equal sign', () => {
		expect(decode('L3BldC86cGV0SWQvdXBsb2FkSW1hZ2U%3D')).toBe('/pet/:petId/uploadImage');
	});
	it('example', () => {
		expect(decode('L3Jlc3Qvc3RvcmUvaW52ZW50b3J5')).toBe('/rest/store/inventory');
	});
});
