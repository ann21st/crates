// https://babeljs.io/docs/options

module.exports = {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns: 'usage',
                        targets: { chrome: 59, edge: 13, firefox: 50, },
                        corejs: { version: '3.37', proposals: true }
                    },
                ],
            ],
        },
    },
};
