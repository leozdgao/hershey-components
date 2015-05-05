var path = require('path');

module.exports = {
	js: [
		'src/js/utils.js',
		'src/js/*.js'
	],
	css: [
		'src/css/*.css'
	],
  views: [
    'testpage.html'
  ],
	destJs: 'hershey.js',
	destCss: 'hershey.css',
	release: path.join(__dirname, 'dist')
};