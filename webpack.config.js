const path = require('path');

module.exports = {
    entry: './build/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist/js')
    }
};