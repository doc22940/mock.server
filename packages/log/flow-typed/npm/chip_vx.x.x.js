
declare module 'chip' {
	declare export default function log(): {
		debug(...args: Array<any>): void,
		trace(...args: Array<any>): void,
		log(...args: Array<any>): void,
		info(...args: Array<any>): void,
		warn(...args: Array<any>): void,
		error(...args: Array<any>): void,
	};
}
