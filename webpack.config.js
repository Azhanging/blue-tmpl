var webpack = require('webpack');
//路径模块
var path = require('path');
//压缩模块插件
var uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = {
	//文件起始路径
	/*context: path.resolve(__dirname, 'src'),*/
	//入口
	entry: {
		'tmpl': './src/index.js',
		'tmpl.min':'./src/index.js'
	},
	//出口
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: './js/[name].js',
		publicPath: './dist',//公共打包的默认路径
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "Tmpl"
	},
	//模块处理器
	module: {
		//loader预处理设置
		rules: [{
			test: /\.js$/,
			use: [
				'babel-loader?presets[]=es2015'
			]
		}]
	},
	//loader模块文件解析
	resolveLoader: {
		moduleExtensions: ["-loader"]
	},
	//map文件生成
	//	devtool: 'source-map',
	plugins: [
		new webpack.BannerPlugin(`
			tmpl.js v1.0.5
			(c) 2016-2017 Blue
			Released under the MIT License.
			https://github.com/azhanging/tmpl
		`),
		new uglifyjs({
			mangle: true,
			include: /\.min\.js$/
		})
	],
	//配置服务器
	devServer: {
		publicPath: "http://localhost",
		watchContentBase: true,
		port: 8880
	}
}