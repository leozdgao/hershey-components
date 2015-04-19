exports.addClass = function (elem, className) {

	if(elem.classList) elem.classList.add(className);
	else {
		elem.className ? (elem.className += (' ' + className)) : (elem.className = className);
	}
};

exports.removeClass = function(elem, className) {

	if(elem.classList) elem.classList.remove(className);
	else {
		elem.className = elem.className.replace(new RegExp("\\s*" + className + "\\s*"), ' ');
	}
};

var es5obj = true;
try {
    Object.defineProperty({}, "x", "");
}
catch(e) { es5obj = false; }

exports.es5obj = es5obj;

exports.isDefined = function(obj) {
    return obj != null;
};