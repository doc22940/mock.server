<%

  function _getArray(getData) {
    var out = [],
      len = 2,
      i;

    for (i = 0; i < len; i += 1) {
      out.push(getData());
    }

    return JSON.stringify(out);
  }
%>