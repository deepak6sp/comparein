const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        'whatwg-fetch',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
            {test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },
            {
              test: /\.svg$/,
              loader: 'react-svg-loader?jsx=1',
              query: {
                jsx: true
              }
            },
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
