/// <reference path="typings/node/node.d.ts"/>

var path = require('path');

module.exports = {
    entry: {
      'native': './src/native/main.js',
      'react': './src/react/main.js',
      // 'jquery': './src/jquery/main.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'hershey.[name].js'
    },
    externals: {
      react: 'React'
    },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader' }
      ]
    }
};