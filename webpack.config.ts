import {resolve} from 'path';
import webpack from 'webpack';
import StylishReporter from 'webpack-stylish';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const stylish = new StylishReporter();

const config: webpack.Configuration = {
	entry: {
		background: resolve(__dirname, './src/background.ts')
	},
	output: {
		filename: '[name].js',
		path: resolve(__dirname, './dist')
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([
			'dist'
		]),
		new CopyWebpackPlugin([
			'manifest.json',
			{from: 'assets', to: 'assets'}
		]),
		stylish
	],
	devtool: false,
	stats: 'minimal'
};

export default config;
