const path = require("path");
const PugPlugin = require("pug-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
    plugins: [
        new PugPlugin({
            entry: {
                // define many page templates here
                index: "src/temlates/index.pug", // => dist/index.html
                //suggestions: "src/templates/pages/suggestions.pug"
            },
            js: {
                // JS output filename
                filename: "js/[name].[contenthash:8].js",
            },
            css: {
                // CSS output filename
                filename: "css/[name].[contenthash:8].css",
            },
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist']
                }
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(s?css|sass)$/,
                use: ["css-loader", "sass-loader"],
            },
            {
                test: /\.(ico|png|jp?g|webp|svg)$/,
                type: "asset/resource",
                exclude: path.resolve(__dirname, "./src/assets/fonts"),
                generator: {
                    filename: "img/[name].[hash:8][ext][query]",
                },
            },
            {
                test: /\.(ttf|eot|woff|woff2|otf|svg)$/i,
                type: "asset/resource",
                exclude: path.resolve(__dirname, "./src/assets/images"),
                generator: {
                    filename: "fonts/[name].[hash:8][ext][query]",
                }
            }
        ],
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 5050,
        hot: true
    }
};
