var Progress = function (elem) {
	// let the element become a progress bar
	if (!elem || !/progress/.test(elem.className)) throw new Error('The element should with class \'progress\' which is defined by hershey');

	// attach progress backdrop
	var backdrop = document.createElement('div');
	backdrop.className = 'backdrop';
	elem.appendChild(backdrop);

	var value;
	Object.defineProperty(this, 'value', {
		get: function () { return value; },
		set: function (val) {
			if (isNaN(+val) || val < 0) val = 0;
			if (val > 100) val = 100;
			value = val;
			// set value 0-100
			backdrop.style.width = val + '%';
		}
	});
};

module.exports = Progress;
