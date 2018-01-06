const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './build/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};