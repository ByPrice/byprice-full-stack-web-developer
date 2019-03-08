const path = require("path");

module.exports = {
    devtool: 'source-map',
    entry: "./public-src/index.js",
    output: {
        path: path.join(__dirname, "/public/js"),
        filename: "main.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }]
    }
}
