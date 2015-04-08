(function() {
	var Utility = {
		addClass: function (elem, className) {
			if(elem.classList) elem.classList.add(className);
			else {
				elem.className ? (elem.className += (' ' + className)) : (elem.className = className);
			}
		},
		removeClass: function(elem, className) {
			if(elem.classList) elem.classList.remove(className);
			else {
				elem.className = elem.className.replace(new RegExp("\\s*" + className + "\\s*"), ' ');
			}
		}
	}

	window.Util = Utility;
})();
(function() {
	var Progress = function(elem) {
		// let the element become a progress bar
		if(!/progress/.test(elem.className)) throw new Error('The element should with class \'progress\' which is defined by hershey');

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

	window.Progress = Progress;
})();

// 'use strict';

// (function ($) {
//   // var animate
  
//   $.fn.extend({
//     progress: function(percentage) {
//       percentage = percentage >  100 ? 100 : percentage;
//       this.each(function() {
//         var $target = $(this);
//         var $backdrop = $target.children('.backdrop');
//         // init state
//         if($backdrop.length <= 0) {
//           $backdrop = $('<div class="backdrop"></div>');
//           $backdrop.appendTo($target);
//         }

//         var width = $target.width() *percentage / 100;
//         $backdrop.width(width);
//       });
//       return this;
//     }
//   });

// })(jQuery);
(function() {
    var Util = window.Util;
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
        Util.addClass(this.instance, dir);
        Util.addClass(this.instance, 'slide' + dir);
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
        Util.removeClass(this.instance, 'positioned');
        Util.removeClass(this.instance, 'fadeOut');

        this.target.parentElement.appendChild(this.instance);
        
        var pos = this.computePosition();       
        this.instance.style.top = pos.top + 'px';
        this.instance.style.left = pos.left + 'px';

        // add effect class
        Util.addClass(this.instance, 'fadeIn');
        Util.addClass(this.instance, 'positioned');
    }

    function hide() {
        // add effect animate
        Util.removeClass(this.instance, 'fadeIn');
        Util.addClass(this.instance, 'fadeOut');

        var self = this;
        this.clr = setTimeout(function() {
          
          // reset position
          self.instance.style.top = '';
          self.instance.style.left = '';
          // remove effect
          Util.removeClass(self.instance, 'fadeOut');
          Util.removeClass(self.instance, 'positioned');

          self.instance.remove();
        }, 500); // time of animation
    }

    window.Tooltip = Tooltip;
})();
