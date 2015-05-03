var path = require('path');

module.exports = {
	// lib: [
	// 	'node_modules/jquery/dist/jquery.min.js',
	// 	'node_modules/jquery/dist/jquery.min.map'
	// ],
	js: [
		'src/js/utils.js',
		'src/js/*.js'
	],
	css: [
		'src/css/*.css'
	],
	destJs: 'hershey.js',
	destCss: 'hershey.css',
	release: path.join(__dirname, 'dist')
	// librealse: './dist/lib'
};