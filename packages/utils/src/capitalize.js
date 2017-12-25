// @flow

import _capitalize, {words} from 'capitalize';

export function capitalize(value: string): string {
	return _capitalize(value);
}
export function capitalizeWords(value: string): string {
	return words(value);
}
