const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractCSS = new ExtractTextPlugin("[name].fonts.css");
const extractSCSS = new ExtractTextPlugin("[name].styles.css");

const BUILD_DIR = path.resolve(__dirname, "build");
const SRC_DIR = path.resolve(__dirname, "src");

console.log("BUILD_DIR", BUILD_DIR);
console.log("SRC_DIR", SRC_DIR);

module.exports = (env = {}) => {
  return {
    entry: {
      index: [SRC_DIR + "/index.js"],
    },
    output: {
      path: BUILD_DIR,
      filename: "[name].bundle.js",
      publicPath: '/'
    },
    watch: true,
    devtool: !process.env.TEST_ENVIRONMENT ? "source-map" : "cheap-module-eval-source-map",
    devServer: {
        contentBase: BUILD_DIR,
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy:[{
              context: ['/api', '/api/verify_token', '/api/token','/api/vote_actions', 'api/coins'],
              target: process.env.TEST_SERVER_ENVIRONMENT? 'http://localhost:5000' : 'https://crypto-coin-trend.herokuapp.com',
              changeOrigin: true,
               ws: true,
          }],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["react", "env"]
            }
          }
        },
        {
          test: /\.html$/,
          loader: "html-loader"
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
        },

        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              // loader: "url-loader"
              loader: "file-loader",
              options: {
                name: "./img/[name].[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "./img/[name].[hash].[ext]",
                jsx: true // true outputs JSX tags
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader",
          options: {
            name: "./fonts/[name].[hash].[ext]"
          }
        }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin(),
      new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
      new webpack.NamedModulesPlugin(),
      extractCSS,
      extractSCSS,
      new HtmlWebpackPlugin(
        {
          inject: true,
          template: "./public/index.html"
        }
      ),
      new CopyWebpackPlugin([],
        {copyUnmodified: false}
      ),
      new webpack.DefinePlugin({
        "process.env": {
          TEST_ENVIRONMENT: JSON.stringify(process.env.TEST_ENVIRONMENT)
        }
      }),
      // new webpack.NodeEnvironmentPlugin(["TEST_ENVIRONMENT"])
      new CopyWebpackPlugin([
        // relative path is from src
        {from: "./favicon.ico"}, // <- your path to favicon
      ]),
    ]
  }
};