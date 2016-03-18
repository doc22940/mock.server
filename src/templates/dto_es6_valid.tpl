	/**
	 *
	 * @method hasValid<%=name%>
	 * @public
	 */
	hasValid<%=name%> () {
		try {
			let v = this._data.<%=path%>;
			if (v && this._is('<%=type%>', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}