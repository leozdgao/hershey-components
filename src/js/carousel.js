var utils = require('./utils');
var offset = 0, cit;

var Carousel = function (elem) {

    if (!utils.isDOMElement(elem)) throw new Error("Only accept the HTMLElement.");

    this.instance = elem;
    this.items = [].slice.call(elem.children);
    this.autoPlaying = false;

    var self = this;
    offset = parseInt(window.getComputedStyle(this.instance.parentElement).width);

    var current = 0;
    Object.defineProperty(self, "current", {
        get: function () { return current; },
        set: function (i) {
            // adjust index
            i = this.items.length && (i % this.items.length);
            while (i < 0) i += this.items.length;

            self.goto(i);
            current = i;
        }
    });
};

Carousel.prototype.goto = function (i) {
    var left = i * (- offset);
    this.instance.style.left = left + 'px';
};

Carousel.prototype.prev = function () {
    this.current--;
};

Carousel.prototype.next = function () {
    this.current++;
};

Carousel.prototype.autoPlay = function (interval) {
    var self = this;
    self.autoPlaying = true;

    if (cit) clearInterval(cit);

    cit = setInterval(function () {
        self.current++;
    }, interval);
};

Carousel.prototype.pause = function () {
    this.autoPlaying = false;
    if (cit) clearInterval(cit);
};

module.exports = Carousel;
