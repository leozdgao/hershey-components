(function() {
	var Utility = {
		addClass: function (elem, className) {
			if(elem.classList) elem.classList.add(className);
			else {
				elem.className ? (elem.className += (' ' + className)) : (elem.className = className);
			}
		},
		removeClass: function(elem, className) {
			if(elem.classList) elem.classList.remove(className);
			else {
				elem.className = elem.className.replace(new RegExp("\\s*" + className + "\\s*"), ' ');
			}
		}
	}

	window.Util = Utility;
})();