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