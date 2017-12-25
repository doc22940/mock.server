
import type { express$Middleware } from 'express';

declare module 'body-parser' {
	declare module.exports: {
		json: () => express$Middleware,
		urlencoded: ({ extended: boolean }) => express$Middleware,
	};
}
