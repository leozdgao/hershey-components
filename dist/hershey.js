'use strict';

(function ($) {
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
          var $tooltip = $('<div class="tooltip"><div class="caret"></div><div class="content"></div></div>');
          var clr;
          $target.on({
            mouseenter: function() {
              if(clr) clearTimeout(clr);

              // prevent default tilte
              $target.attr('title', '');

              // remove animation class
              $tooltip.removeClass('positioned');
              $tooltip.removeClass('fadeOut');
              // add position class
              $tooltip.addClass(dir);
              $tooltip.addClass('slide' + dir);
              // add content
              $tooltip.children('.content').text(title);
              $tooltip.appendTo('body');

              // set tooltip position
              var pos = $target.offset(), top, left;
              // pop left
              switch(dir) {
                case 'top': {
                  top = pos.top - $tooltip.outerHeight() - 12;
                  left = pos.left + $target.innerWidth() / 2 - $tooltip.innerWidth() / 2 - 1;
                  break;
                }
                case 'bottom': {
                  top = pos.top + $target.innerHeight() + 12;
                  left = pos.left + $target.innerWidth() / 2 - $tooltip.innerWidth() / 2 - 1;
                  break;
                }
                case 'left': {
                  top = pos.top + $target.innerHeight() / 2 - $tooltip.innerHeight() / 2 - 1;
                  left = pos.left - $tooltip.outerWidth() - 12;
                  break;
                }
                case 'right':
                default: {
                  top = pos.top + $target.innerHeight() / 2 - $tooltip.innerHeight() / 2 - 1;
                  left = pos.left + $target.innerWidth() + 12;
                  break;
                }
              }
              $tooltip.css('top', top);
              $tooltip.css('left', left);

              // add animate
              $tooltip.addClass('fadeIn');
              $tooltip.addClass('positioned');
            },
            mouseleave: function() {
              $target.data('title', '');
              $target.attr('title', title);

              $tooltip.removeClass('fadeIn');
              $tooltip.addClass('fadeOut');

              clr = setTimeout(function() {
                // reset position
                $tooltip.css('top', '');
                $tooltip.css('left', '');
                // remove effect
                $tooltip.removeClass('fadeOut');
                $tooltip.removeClass('positioned');
                // remove node from DOM
                $tooltip.remove();
              }, 500);
            }
          });
        }
      });
    }
  });
})(jQuery);