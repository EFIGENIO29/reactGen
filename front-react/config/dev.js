'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env) {
	return {
		resolve: {
			alias: {
				actions: path.resolve(__dirname, '../src/actions/'),
				components: path.resolve(__dirname, '../src/components/'),
				constants: path.resolve(__dirname, '../src/constants/'),
				containers: path.resolve(__dirname, '../src/containers/'),
				reducers: path.resolve(__dirname, '../src/reducers/'),
				routes: path.resolve(__dirname, '../src/routes'),
				styles: path.resolve(__dirname, '../src/styles/'),
				store: path.resolve(__dirname, '../src/store'),
			},
			extensions: ['*', '.js', '.jsx', '.json', '.es6']
		},
		devtool: 'eval-source-map',
		context: path.resolve(__dirname, '../src'),
		entry: {
			app: './index.js',
		},
		output: {
			path: path.resolve(__dirname, '../dist/assets'),
			filename: 'bundle.js',
		},
		module: {
			loaders: [
				// JSX and JS transpilation using babel
				{
					test: /\.js|\.jsx|\.es6$/,
					exclude: /node_modules/,
					loaders: ['babel-loader']//, 'eslint-loader'
				},
				// SASS modularization using style and css loader
				{
					test: /\.(scss|css)$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{ loader: 'css-loader', query: { modules: false, sourceMaps: true } },
							{ loader: 'sass-loader', query: { sourceMaps: true } }
						]
					})
				},
				// Font path loader
				{
					test: /\.(eot|ttf|woff|woff2|svg|otf)$/,
					loader: 'file-loader'
				},
				// Image path loader
				{
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					exclude: /node_modules/,
					loader: 'url-loader?limit=10000'
				},
				// JSON files loader
				{
					test: /\.json$/,
					loader: 'json-loader'
				}
			]
		},
		externals: ['window'],
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('development')
				}
			}),
			new HtmlWebpackPlugin({
				template: './index.html',
				filename: 'index.html',
				favicon: './styles/images/layout/favicon.png',
				inject: 'body'
			}),
			new CopyWebpackPlugin([
				// Default image for the menu item
				{ from: 'styles/images/menu/default.png', to: 'images' },
				// Old Menu Images
				{ from: 'styles/images/menu/icon_ap.jpg', to: 'images' },
				{ from: 'styles/images/menu/icon_burocredito.png', to: 'images' },
				{ from: 'styles/images/menu/icon_sic.jpg', to: 'images' },
				{ from: 'styles/images/menu/icon_sif.jpg', to: 'images' },
				// Menu images
				{ from: 'styles/images/menu/GAP.png', to: 'images' },
				{ from: 'styles/images/menu/Buro.png', to: 'images' },
				{ from: 'styles/images/menu/SIC.png', to: 'images' },
				{ from: 'styles/images/menu/SIF.png', to: 'images' },
			]),
			new ExtractTextPlugin('[name].css?v=[contenthash]')
		],
		devServer: {
			contentBase: path.join(__dirname, "../dist"),
			compress: false,
			host: "0.0.0.0",
			port: 3333,
			// Display only errors to reduce the amount of output.
			stats: 'errors-only',
            disableHostCheck: true
		},
		watch: true
	}
};
