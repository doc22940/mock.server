// @flow

const delayed = (fn: Function, delay?: number = 1): string => {
	const timerId: string = window.setTimeout((): Function => {
		window.clearTimeout(timerId);
		return fn.call();
	}, delay);

	return timerId;
};

export default delayed;
