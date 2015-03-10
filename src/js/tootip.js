'use strict';

(function ($) {

  function Tooltip(dir) {
    this.$instance = $('<div class="tooltip"><div class="caret"></div><div class="content"></div></div>');
    // set direction
    this._direction = dir;
    this.$instance.addClass(dir);
    this.$instance.addClass('slide' + dir);
    // set timeout
    this._clr;
  }

  Tooltip.prototype.setTitle = function(title) {
    this.title = title;
    this.$instance.children('.content').text(title);
  }

  Tooltip.prototype.show = function($target) {
    // reset timeout
    if(this._clr) clearTimeout(this._clr);
    // remove obsolete effect class
    this.$instance.removeClass('positioned');
    this.$instance.removeClass('fadeOut');
    // set position
    this.$instance.appendTo('body');
    var pos = $target.offset(), top, left;
    // pop left
    switch(this._direction) {
      case 'top': {
        top = pos.top - this.$instance.outerHeight() - 12;
        left = pos.left + $target.innerWidth() / 2 - this.$instance.innerWidth() / 2 - 1;
        break;
      }
      case 'bottom': {
        top = pos.top + $target.innerHeight() + 12;
        left = pos.left + $target.innerWidth() / 2 - this.$instance.innerWidth() / 2 - 1;
        break;
      }
      case 'left': {
        top = pos.top + $target.innerHeight() / 2 - this.$instance.innerHeight() / 2 - 1;
        left = pos.left - this.$instance.outerWidth() - 12;
        break;
      }
      case 'right':
      default: {
        top = pos.top + $target.innerHeight() / 2 - this.$instance.innerHeight() / 2 - 1;
        left = pos.left + $target.innerWidth() + 12;
        break;
      }
    }
    this.$instance.css('top', top);
    this.$instance.css('left', left);
    // add effect class
    this.$instance.addClass('fadeIn');
    this.$instance.addClass('positioned');
  }

  Tooltip.prototype.hide = function() {
    // add effect animate
    this.$instance.removeClass('fadeIn');
    this.$instance.addClass('fadeOut');

    var self = this;
    this._clr = setTimeout(function() {
      
      self.resetState();
    }, 500);
  }

  Tooltip.prototype.resetState = function() {
    // reset position
    this.$instance.css('top', '');
    this.$instance.css('left', '');
    // remove effect
    this.$instance.removeClass('fadeOut');
    this.$instance.removeClass('positioned');

    this.$instance.remove();
  }

  $.fn.extend({
    // [direction][class][title][animate]
    tooltip: function(opt) {
      opt = $.extend({
        direction: 'right'
      }, opt);
      // add tooltip for every matched element
      this.each(function(index) {
          
        var $target = $(this),
            // get title, the attribute 'title' is priority
            title = $target.attr('title') || (typeof opt.title == 'function' ? opt.title.call(null, index, this): opt.title),
            dir =  (typeof opt.direction == 'function') ? opt.direction.call(null, index, this): opt.direction;

        if(title) {
          var tooltip = new Tooltip(dir);
          var clr;
          $target.on({
            mouseenter: function() {
              if(clr) clearTimeout(clr);

              // prevent default tilte
              $target.attr('title', '');

              tooltip.setTitle(title);
              tooltip.show($target);
            },
            mouseleave: function() {
              // give title back
              $target.attr('title', title);

              tooltip.hide();
            }
          });
        }
      });
    }
  });
})(jQuery);