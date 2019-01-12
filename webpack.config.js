/**
 * Webpack Configuration
 * 
 * Guide : https://webpack.js.org/guides/
 * Documentation : https://webpack.js.org/concepts/
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');

let environment = 'development';

/**Adjust These to match your computer ipv4*/
const networkIP = '192.168.100.128';
const networkPort = '9000';

module.exports = env => {

    (typeof env.production == 'undefined') ? environment = 'development': environment = 'production';

    return {
        mode: environment,
        entry: {
            app: './src/scripts/main.js'
        },
        devtool: 'eval-source-map',
        devServer: {
            host: networkIP,
            port: networkPort,
            contentBase: path.join(__dirname, 'dist')
        },
        plugins: [
            new CleanWebPackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Chain Frontend Framework'
            })
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, {
                    test: /\.scss$/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(csv|tsv)$/,
                    use: [
                        'csv-loader'
                    ]
                },
                {
                    test: /\.xml$/,
                    use: [
                        'xml-loader'
                    ]
                }
            ]
        }
    }
};