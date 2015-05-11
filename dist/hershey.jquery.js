/// <reference path="../../typings/jquery/jquery.d.ts" />

(function ($) {
  $.fn.extend({
    contextMenu: function (opts) {
      var $body = $(document.body);
      var menu = $('<ul class="content-menu"></ul>').appendTo($body).hide();
      
      for(var key in opts) if(opts.hasOwnProperty(key)) {
        $('<li class="content-menu-item></li>')
          .text(key)
          .on('click', (function (key) {
            return function (e) {
              opts[key].call(this, e);
          	  menu.hide();
            }
          })(key))
          .appendTo(menu);
      }
      console.log(menu);
      
      $body.on('click', function () {
        menu.hide();
      });
      
      return this.on('contextmenu', function (e) {
        e.preventDefault();
        
        var x = e.offsetX, y = e.offsetY;
        
        menu.show();
        console.log(e);
      });
    }
  });
})(window.jQuery);
