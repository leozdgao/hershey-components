/// <reference path="typings/node/node.d.ts"/>

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: './dist',
        filename: 'hershey.js'
    },
    externals: {
      react: 'React'
    }
};