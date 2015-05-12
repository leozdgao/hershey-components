/// <reference path="../../typings/jquery/jquery.d.ts" />

(function ($) {
  // cache menu items for bind event
  var _items = {};
  
  $.fn.extend({
    contextMenu: function (opts) {
      var $body = $(document.body);
      var $menu = generateItems(opts);
      
      $body.on('click', function () {
        $menu.removeClass('show')
          // remove 'active' class from menu items
          .children().removeClass('active');
          
        setTimeout(function() {
          $menu.remove();
        }, 300);
      });
      
      return this.on('contextmenu', function (e) {
        e.preventDefault();
        
        var x = e.offsetX, y = e.offsetY;
        $menu.css({ left: x, top: y }).appendTo($body);
        // bind item click event
        bindEvent();
        // effect
        setTimeout(function () { $menu.addClass('show'); });
      });
      
      function bindEvent() {
        for(var key in _items) {
          (function (key) {
            var item = _items[key];
            var sub = item.sub;
            
            // menu item
            if(typeof sub == 'function') {
              item.instance.on('click', function () {
                sub.call();
              })
              .hover(function () {
                $(this).addClass('active')
                // keep parents 'active'
                .parents('li.content-menu-item').addClass('active');
              }, function () {
                $(this).removeClass('active');
              });
            }
            // sub menu
            else if (Object.prototype.toString.call(sub) == '[object Object]') {
              item.instance.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              })
              .hover(function () {
                var subItem = $(this);
                var pos = subItem.position();
                var $subMenu = generateItems(sub).appendTo(subItem).css({ top: pos.top - 1, left: pos.left + subItem.outerWidth() });
                setTimeout(function () { $subMenu.addClass('show'); });
              }, function () {
                $(this).children('ul').remove();
              });
            }
          })(key);
        }
      }
      
      function generateItems(opts) {
        var $menu = $('<ul class="content-menu"></ul>');
        for(var key in opts) if(opts.hasOwnProperty(key)) {
          var sub = opts[key];
          if(typeof sub == 'function') {
            _items[key] = {
              instance: $('<li class="content-menu-item"></li>').text(key).appendTo($menu),
              sub: sub
            };
          }
          else if (Object.prototype.toString.call(sub) == '[object Object]') {
            _items[key] = {
              instance: $('<li class="content-menu-item caret"></li>').text(key).appendTo($menu),
              sub: sub
            };
          }
        }
        return $menu;
      }
    }
  });
})(window.jQuery);
