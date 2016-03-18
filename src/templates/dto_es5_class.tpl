
'use strict';

/**
 *
 * @class <%=className%>
 * @param {object} data
 * @constructor
 *
 */
function <%=className%>(data) {
	this.init(data);
}

<%=className%>.prototype = {

	constructor : <%=className%>,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {Object} data
	 * @public
	 */
	init: function (data) {
		this._data = data;
	},

	/**
	 *
	 * @method _is
	 * @param {String} type
	 * @param {*} value
	 * @private
	 */
	_is: function (type, value) {
		switch (type) {
			case 'Array': return (value instanceof Array);
			default: return (typeof value === type.toLowerCase());
		}
	},

<%=methods%>

};