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

	window.hershey = {
		Progress: __webpack_require__(1),
		Tooltip: __webpack_require__(2),
		Carousel: __webpack_require__(3)
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Progress = function(elem) {
		// let the element become a progress bar
		if(!elem || !/progress/.test(elem.className)) throw new Error('The element should with class \'progress\' which is defined by hershey');

		// attach progress backdrop
		var backdrop = document.createElement('div');
		backdrop.className = 'backdrop';
		elem.appendChild(backdrop);

		var value;
		Object.defineProperty(this, 'value', {
			get: function() { return value; },
			set: function(val) {
				if(isNaN(+val) || val < 0) val = 0;
				if(val > 100) val = 100;
				value = val;
				// set value 0-100
				backdrop.style.width = val + '%';
			}
		});
	};

	module.exports = Progress;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(4);
	// constructor
	var Tooltip = function() {

	    this.init();
	};

	// init dom elemnt
	Tooltip.prototype.init = function() {

	    var tooltip = document.createElement('div');
	    tooltip.className = 'tooltip';
	    var caret = document.createElement('div');
	    caret.className = 'caret';
	    var content = document.createElement('div');
	    content.className = 'content';
	    tooltip.appendChild(caret);
	    tooltip.appendChild(content);

	    this.instance = tooltip;
	    this.caret = caret;
	    this.content = content;

	    var self = this;
	    this.tooltipshowHandler = function(e) {
	        show.call(self);
	    }
	    this.tooltiphideHandler = function(e) {
	        hide.call(self);
	    }

	    Object.defineProperty(this, 'title', {
	        get: function() { return this.content.innerText || this.content.textContent; },
	        set: function(title) {
	            this.content.innerText ? (this.content.innerText = title) : (this.content.textContent = title);
	        }
	    });
	};

	// append tooltip instance to 
	Tooltip.prototype.appendTo = function(elem, dir, title) {

	    // control direction of the tooltip instance
	    dir = dir || 'top';
	    title = title || elem.title;
	    elem.title = ''; // prevent default

	    this.target = elem;
	    this.title = title;

	    this.setDirection(dir);
	    
	    if(title) {
	        this.target.addEventListener('mouseenter', this.tooltipshowHandler);
	        this.target.addEventListener('mouseleave', this.tooltiphideHandler);
	    }
	};

	// subtract tooltip instance
	Tooltip.prototype.subtract = function() {

	    if(this.target) {
	        this.target.removeEventListener('mouseenter', this.tooltipshowHandler);
	        this.target.removeEventListener('mouseleave', this.tooltiphideHandler);
	        this.target = null; 
	    }
	};

	// change the direction of the instance, re-compute position
	Tooltip.prototype.setDirection = function(dir) {
	    this.dir = dir;
	    utils.addClass(this.instance, dir);
	    utils.addClass(this.instance, 'slide' + dir);
	};

	// compute the position of tooltip
	Tooltip.prototype.computePosition = function() {

	    var pos = {
	        top: this.target.offsetTop,
	        left: this.target.offsetLeft
	    }, top, left;

	    switch(this.dir) {
	      case 'top': {
	        top = pos.top - this.instance.offsetHeight - 6 - 2; // leave some space for two elemnt
	        left = pos.left + this.target.offsetWidth / 2 - this.instance.offsetWidth / 2;
	        break;
	      }
	      case 'bottom': {
	        top = pos.top + this.target.offsetHeight + 6 + 2;
	        left = pos.left + this.target.offsetWidth / 2 - this.instance.offsetWidth / 2;
	        break;
	      }
	      case 'left': {
	        top = pos.top + this.target.offsetHeight / 2 - this.instance.offsetHeight / 2;
	        left = pos.left - this.instance.offsetWidth - 6 - 2;
	        break;
	      }
	      case 'right':
	      default: {
	        top = pos.top + this.target.offsetHeight / 2 - this.instance.offsetHeight / 2;
	        left = pos.left + this.target.offsetWidth + 6 + 2;
	        break;
	      }
	    }
	    return {
	        top: top, left: left
	    }
	};

	 function show() {
	    // clear animate timeout
	    if(this.clr) clearTimeout(this.clr);

	    // remove obsolete effect class
	    utils.removeClass(this.instance, 'positioned');
	    utils.removeClass(this.instance, 'fadeOut');

	    this.target.parentElement.appendChild(this.instance);
	    
	    var pos = this.computePosition();       
	    this.instance.style.top = pos.top + 'px';
	    this.instance.style.left = pos.left + 'px';

	    // add effect class
	    utils.addClass(this.instance, 'fadeIn');
	    utils.addClass(this.instance, 'positioned');
	}

	function hide() {
	    // add effect animate
	    utils.removeClass(this.instance, 'fadeIn');
	    utils.addClass(this.instance, 'fadeOut');

	    var self = this;
	    this.clr = setTimeout(function() {
	      
	      // reset position
	      self.instance.style.top = '';
	      self.instance.style.left = '';
	      // remove effect
	      utils.removeClass(self.instance, 'fadeOut');
	      utils.removeClass(self.instance, 'positioned');

	      self.instance.remove();
	    }, 500); // time of animation
	}

	module.exports = Tooltip;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(4);
	var offset = 0, cit;

	var Carousel = function(elem) {

	    // var bodySelector = opts.selector || 'carousel';
	    // var itemSelector = opts.itemSelector || 'carousel-item';
	    this.instance = elem;
	    this.items = [].slice.call(elem.children);
	    this.autoPlaying = false;

	    var self = this;
	    offset = parseInt(window.getComputedStyle(this.instance.parentElement).width);
	    
	    var current = 0;
	    Object.defineProperty(self, "current", {
	        get: function() { return current; },
	        set: function(i) {
	            // adjust index
	            i = this.items.length && (i % this.items.length);
	            while(i < 0) i += this.items.length;

	            self.goto(i);
	            current = i;
	        }
	    });
	};

	Carousel.prototype.goto = function(i) {
	    var left = i * (- offset);
	    this.instance.style.left = left + 'px';
	};

	Carousel.prototype.prev = function() {
	    this.current --;
	};

	Carousel.prototype.next = function() {
	    this.current ++;
	};

	Carousel.prototype.autoPlay = function(interval) {
	    var self = this;
	    self.autoPlaying = true;

	    if(cit) clearInterval(cit);

	    cit = setInterval(function() {
	        self.current ++;
	    }, interval);
	};

	Carousel.prototype.pause = function() {
	    this.autoPlaying = false;
	    if(cit) clearInterval(cit);
	};

	module.exports = Carousel;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports.addClass = function (elem, className) {

	    if(elem.classList) elem.classList.add(className);
	    else {
	        elem.className ? (elem.className += (' ' + className)) : (elem.className = className);
	    }
	};

	exports.removeClass = function(elem, className) {

	    if(elem.classList) elem.classList.remove(className);
	    else {
	        elem.className = elem.className.replace(new RegExp("\\s*" + className + "\\s*"), ' ');
	    }
	};

	var es5obj = true;
	try {
	    Object.defineProperty({}, "x", "");
	}
	catch(e) { es5obj = false; }

	exports.es5obj = es5obj;

	// undefined or null
	exports.isDefined = function(obj) {
	    return obj != null;
	};

	// judge object is DOM element or not
	exports.isDOMElement = function(elem) {
	    
	};


/***/ }
/******/ ]);