const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const configFunc = require('../webpack.config.js');
const config = configFunc();
const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

app.listen(8080, function () {
    console.log('Example app listening on port 8080!\n');
});
