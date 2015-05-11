/// <reference path="../../typings/react/react.d.ts"/>
var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
        <label className="toggle">
          <input type="checkbox" ref="checkbox" />
          <span className="toggle-inner"></span>
        </label>
    )
  },
  getValue: function () {
    var cb = React.findDOMNode(this.refs.checkbox);
    return cb.checked;
  }
});