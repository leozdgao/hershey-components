var utils = require('./utils');

var Carousel = function(opts) {
    opts = opts || {};

    var bodySelector = opts.bodySelector || 'carousel';
    var itemSelector = opts.itemSelector || 'carousel-item';
    this.instance = document.querySelector(bodySelector);
    this.items = this.instance ? this.instance.querySelectorAll(itemSelector) : [];
    this.autoPlaying = false;

    var self = this;
    
    var current = 0;
    Object.defineProperty(self, "current", {
        get: function() { return current; },
        set: function(i) {
            // adjust index
            while(i < 0) i += this.items.length;
            i = this.items.length && (i % this.items.length);

            self.goto(i);
        }
    });
};

Carousel.prototype.goto = function(i) {
    
};

Carousel.prototype.prev = function() {
    // body...
};

Carousel.prototype.next = function() {
    // body...
};

var cit;
Carousel.prototype.autoPlay = function(interval) {
    this.autoPlaying = true;
    cit = setInterval(function() {

    }, interval);
};

Carousel.prototype.pause = function() {
    this.autoPlaying = false;
    if(cit) clearInterval(cit);
};

module.exports = Carousel;
