/// <reference path="typings/node/node.d.ts"/>

var path = require('path');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'hershey.js'
    },
    externals: {
      react: 'React'
    }
};