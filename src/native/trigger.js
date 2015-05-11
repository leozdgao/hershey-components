var Trigger = function (opts) {
    opts = opts || {};

    var selector = opts.selector || 'trigger';
    this.instance = document.querySelector(selector);
};

Trigger.prototype.on = function () {
    // body...
};

Trigger.prototype.off = function () {
    // body...
};

Trigger.prototype.toggle = function () {
    // body...
};

module.exports = Trigger;
