/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.hershey_react = {
	  TagInput: __webpack_require__(5),
	  Toggle: __webpack_require__(6)
	}


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/react/react.d.ts"/>
	var React = __webpack_require__(7);

	module.exports = React.createClass({displayName: "module.exports",
	  getInitialState: function () {
	    return {
	      tags: this.props.tags || []
	    };
	  },
	  componentDidMount: function () {
	    var input = React.findDOMNode(this.refs.input);
	    var width = this._getElementWidth(input);
	    this._initialInputWidth = width;
	  },
	  render: function () {
	    var that = this;
	    var tags = this.state.tags.map(function (tag, i) {
	      return (React.createElement("span", {className: "tag"}, tag, " ", React.createElement("span", {className: "tag-remove", onClick: function() { that.removeTag(i); }}, "x"))); 
	    });

	    return (
	      React.createElement("div", {className: "tag-input", onClick: this._click}, 
	        tags, 
	        React.createElement("input", {type: "text", ref: "input", onKeyDown: this._keyDown, onKeyUp: this._keyUp}), 
	        React.createElement("span", {className: "hidden", ref: "hidden"})
	      )
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
	        input.style.width = this._initialInputWidth + "px";
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
	  },
	  _keyUp: function (e) {
	    var input = React.findDOMNode(this.refs.input);
	    var hidden = React.findDOMNode(this.refs.hidden);

	    hidden.textContent = input.value;

	    var wInput = this._getElementWidth(input); console.log(wInput);
	    var wHidden = this._getElementWidth(hidden); console.log(wHidden);
	    if(wHidden + 20 > wInput) { console.log('obj');
	      input.style.width = wInput + 20 + "px";
	    }
	  },
	  _getElementWidth: function (elem) {
	    var rect = elem.getBoundingClientRect();
	    return rect.right - rect.left;
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/react/react.d.ts"/>
	var React = __webpack_require__(7);

	module.exports = React.createClass({displayName: "module.exports",
	  render: function () {
	    return (
	        React.createElement("label", {className: "toggle"}, 
	          React.createElement("input", {type: "checkbox", ref: "checkbox"}), 
	          React.createElement("span", {className: "toggle-inner"})
	        )
	    )
	  },
	  getValue: function () {
	    var cb = React.findDOMNode(this.refs.checkbox);
	    return cb.checked;
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ }
/******/ ]);