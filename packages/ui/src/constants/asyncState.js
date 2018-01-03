// @flow

export type AsyncStateType = 'INITIAL' | 'PENDING' | 'ERROR' | 'DONE';

const asyncState = {
	INITIAL: 'INITIAL',
	PENDING: 'PENDING',
	ERROR: 'ERROR',
	DONE: 'DONE',
};

export default asyncState;
