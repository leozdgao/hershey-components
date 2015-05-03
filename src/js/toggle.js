/// <reference path="../../typings/react/react.d.ts"/>
var React = require('react');

module.exports = React.createClass({
  render: function () {
    /**
     * JSX syntax:
     *   <label className="toggle">
     *     <input type="checkbox">
     *     <span className="toggle-inner">
     *   </label>
     */
    return React.DOM.label({ className: 'toggle' }, 
             React.DOM.input({ type: 'checkbox' }),
             React.DOM.span({ className: 'toggle-inner' }));
  }
});