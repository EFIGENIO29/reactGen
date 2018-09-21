// Webpack: Building for Production
// https://webpack.js.org/guides/production-build/
// Optimizing Performance: Use The Production Build
// https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env) {
	return {
		resolve: {
			alias: {
				actions: path.resolve(__dirname, '../src/actions/'),
				build: path.resolve(__dirname, '../src/build/'),
				components: path.resolve(__dirname, '../src/components/'),
				constants: path.resolve(__dirname, '../src/constants/'),
				containers: path.resolve(__dirname, '../src/containers/'),
				reducers: path.resolve(__dirname, '../src/reducers/'),
				routes: path.resolve(__dirname, '../src/routes'),
				styles: path.resolve(__dirname, '../src/styles/'),
				store: path.resolve(__dirname, '../src/store')
			},
			extensions: ['*', '.js', '.jsx', '.json', '.es6']
		},
		devtool: 'cheap-module-source-map',
		context: path.resolve(__dirname, '../src'),
		entry: {
			app: './index.js',
		},
		output: {
			path: path.resolve(__dirname, '../dist/assets'),
			filename: '[name].js',
			sourceMapFilename: '[name].map'
		},
		module: {
			rules: [
				{test: /\.js|\.jsx|\.es6$/, exclude: /node_modules/, loader: 'babel-loader'},
				{test: /\.(scss|css)$/, use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{ loader: 'css-loader', query: { modules: false, sourceMaps: true } },
							{ loader: 'sass-loader', query: { sourceMaps: true } }
						]
					})
				},
				{test: /\.(eot|ttf|woff|woff2|svg|otf)$/, loaders: 'file-loader'},
				{test: /\.(png|jpg|jpeg|svg|gif)$/, exclude: /node_modules/, use: 'url-loader?limit=10000'},
				{test: /\.json$/, loader: 'json-loader'}
			]
		},
		externals: ['window'],
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.UglifyJsPlugin({
				beautify: false,
				mangle: {
					screw_ie8: true,
					keep_fnames: true
				},
				compress: {
					screw_ie8: true
				},
				comments: false
			}),
			new HtmlWebpackPlugin({
				showErrors: false,
				template: './index.html',
				filename: '../index.html',
				favicon: './styles/images/layout/favicon.png',
				inject: 'body',
				hash: true
			}),
			new ExtractTextPlugin('[name].[contenthash].css'),
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
				// Favorite Icon
				{ from: 'styles/images/layout/favicon.png', to: '../' },
				// Google OAuth image
				{ from: 'styles/images/layout/Logo_Financiera_Independencia.png', to: 'images' },
				// Build files
				{ from: 'build/package.json', to: '../' },
				{ from: 'build/server.js', to: '../' },
			])
		],
		watch: false
	}
};