// @flow

const config = {
	getUrlApi(): string {
		return window.location.href
			.split('/')
			.slice(0, 3)
			.join('/')
			.replace('3000', '3003');
	},
};

export default config;
