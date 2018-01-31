const webpack = require('webpack');
//路径模块
const path = require('path');
//压缩模块插件
const Uglifyjs = require('uglifyjs-webpack-plugin');
//将chunk插入dom
const HtmlWebpackPlugin = require('html-webpack-plugin');
//打包公共的chunk 
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const version = 'v1.0.14';

module.exports = {
	//文件起始路径
	/*context: path.resolve(__dirname, 'src'),*/
	//入口
	entry: {
		'blue-tmpl': path.join(__dirname, './src/index.js'),
		'blue-tmpl.min': path.join(__dirname, './src/index.js')
	},
	//出口
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js',
		publicPath: '/dist', //公共打包的默认路径
		libraryTarget: 'umd',
		umdNamedDefine: true,
		library: "BlueTmpl"
	},
	//模块处理器
	module: {
		//loader预处理设置
		rules: [{
			test: /\.js$/,
			use: [
				'babel-loader?presets[]=es2015'
			]
		}, {
			test: /\.html$/,
			loader: [
				'html-loader'
			]
		}]
	},
	//loader模块文件解析
	resolveLoader: {
		moduleExtensions: ["-loader"]
	},
	//map文件生成
	devtool: 'source-map',
	plugins: [
		new webpack.BannerPlugin(`
blue-tmpl.js ${version}
(c) 2016-2017 Blue
Released under the MIT License.
https://github.com/azhanging/blue-tmpl
time:${new Date()}
		`),
		new Uglifyjs({
			sourceMap: true,
			mangle: true,
			include: /\.min\.js$/
		})
		// new HtmlWebpackPlugin({
		// 	filename:path.join(__dirname,'./nodejsDemo/tmpl-views/base.html'),
		// 	template:path.join(__dirname,'./nodejsDemo/tmpl-views/base.tmpl'),
		// 	chunks:['tmpl'],
		// 	hash:true
		// })
	],
	//配置服务器
	devServer: {
		publicPath: "/",
		watchContentBase: true,
		port: 8880,
		open: true,
		openPage: '/',
		//重新代理地址
		proxy: {
			'/': 'http://127.0.0.1:8888'
		}
	}
}