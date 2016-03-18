
'use strict';

/**
 *
 * @class <%=className%>
 * @param {object} data
 * @constructor
 *
 */
class <%=className%> {

	/**
	 *
	 * @method constructor
	 * @param {Object} data
	 * @public
	 */
	constructor(data) {
		this._data = data;
	}

	/**
	 *
	 * @method _is
	 * @param {String} type
	 * @param {*} value
	 * @private
	 */
	_is(type, value) {
		switch (type) {
			case 'Array': return (value instanceof Array);
			default: return (typeof value === type.toLowerCase());
		}
	}

<%=methods%>

}