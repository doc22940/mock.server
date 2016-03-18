	/**
	 *
	 * @method hasValid<%=name%>
	 * @public
	 */
	hasValid<%=name%>: function () {
		try {
			var v = this._data.<%=path%>;
			if (v && this._is('<%=type%>', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}