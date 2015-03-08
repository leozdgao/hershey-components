'use strict';

(function ($) {
    $.fn.extend({
        tooltip: function() {
            // add tooltip for every matched element
            this.each(function() {
                
                var $target = $(this),
                    title = $target.attr('title');

                if(title) {
                    var $tooltip = $('<div class="tooltip"><div class="caret"></div><div class="content"></div></div>');
                    var clr;
                    $target.on({
                        mouseenter: function() {
                            if(clr) clearTimeout(clr);

                            // prevent default tilte
                            $target.attr('title', '');

                            $tooltip.removeClass('fadeOut');
                            $tooltip.children('.content').text(title);
                            $tooltip.appendTo('body');

                            // set tooltip position
                            var pos = $target.offset();
                            // pop left
                            $tooltip.css('top', pos.top + $target.innerHeight() / 2 - $tooltip.innerHeight() / 2 - 1);
                            $tooltip.css('left', pos.left - $tooltip.outerWidth() - 12);

                            // add animate
                            $tooltip.addClass('fadeIn');
                        },
                        mouseleave: function() {

                            $target.data('title', '');
                            $target.attr('title', title);

                            $tooltip.removeClass('fadeIn');
                            $tooltip.addClass('fadeOut');
                            clr = setTimeout(function() {
                                $tooltip.removeClass('fadeOut');
                                $tooltip.remove();
                            }, 500);
                        }
                    });
                }
            });

            
        }
    });
})(jQuery);