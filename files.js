var path = require('path');

module.exports = {
	js: [
//		'src/**/utils.js',
		'src/**/*.js',
    'src/**/*.jsx'
	],
	css: [
		'src/css/*.css'
	],
  views: [
    'testpage.html',
    'testpage_jquery.html'
  ],
	destJs: 'hershey.js',
	destCss: 'hershey.css',
	release: path.join(__dirname, 'dist'),
  entry: './testpage.html',
  entry_jq: './testpage_jquery.html'
};