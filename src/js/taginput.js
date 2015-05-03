/// <reference path="../../typings/react/react.d.ts"/>
var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      tags: this.props.tags || []
    };
  },
  render: function () {
    /**
     * JSX syntax:
     *   <div class="tag-input">
     *     <span class="tag">tag</span>
     *     <input type="text">
     *   </div>
     */
    return React.DOM.div({ className: 'tag-input', onClick: this._click },
             this.state.tags.map(function (tag) {
               return React.DOM.span({ className: 'tag' }, tag); 
             }),
             React.DOM.input({ type: "text", ref: 'input', onKeyDown: this._keyDown })
      	   );
  },
  _click: function () {
    var input = React.findDOMNode(this.refs.input);
    input.focus();
  },
  _keyDown: function (e) {
    // ','
    if(e.keyCode === 188) {
      e.preventDefault();
      
      var input = React.findDOMNode(this.refs.input);
      var val = input.value.trim();
      var tags = this.state.tags;
      
      if(val && tags.indexOf(val) < 0) tags.push(val);
      input.value = '';
      
      this.setState({ tags: tags });
    }
  }
});