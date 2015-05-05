/// <reference path="../../typings/react/react.d.ts"/>
var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      tags: this.props.tags || []
    };
  },
  render: function () {
    var that = this;
    var tags = this.state.tags.map(function (tag, i) {
      return (<span className="tag">{tag} <span className="tag-remove" onClick={function() { that.removeTag(i); }}>x</span></span>); 
    });

    return (
      <div className="tag-input" onClick={this._click}>
        {tags}
        <input type="text" ref="input" onKeyDown={this._keyDown} />
      </div>
      );
  },
  addTag: function (val) {
    var tags = this.state.tags;
    if(val && tags.indexOf(val) < 0) tags.push(val);
    
    this.setState({ tags: tags });
  },
  removeTag: function (i) {
    var tags = this.state.tags;
    if(typeof i == 'undefined') i = tags.length - 1;
    tags.splice(i, 1);
    
    this.setState({ tags: tags });
  },
  _click: function () {
    var input = React.findDOMNode(this.refs.input);
    input.focus();
  },

  _keyDown: function (e) {
    var input = React.findDOMNode(this.refs.input);
    
    switch(e.keyCode) {
      case 188: { // add tag if ','
        e.preventDefault();  // prevent the input of ','
          
        var val = input.value.trim();
        input.value = "";
        this.addTag(val);
        break;
      };
      case 8: { // remove tag if 'del'
        if(input.value == '') this.removeTag(); 
        break;
      };
      default: {
        // dynamic adjust input width
      };
    }
  }
});