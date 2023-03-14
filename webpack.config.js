const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
	// 组件库的起点入口
	entry: './src/index.tsx',
	output: {
		filename: 'r-ui.umd.js', // 打包后的文件名
		path: resolve(__dirname, 'dist'), // 打包后的文件目录：根目录/dist/
		library: 'rui', // 导出的UMD js会在window挂rui，即可以访问window.rui
		libraryTarget: 'umd', // 导出库为UMD形式
	},
	resolve: {
		// 设置别名
		alias: {
			'@': resolve(__dirname, 'src'), // 这样配置后 @ 可以指向 src 目录
		},
		// webpack 默认只处理js、jsx等js代码
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	externals: {
		// 打包过程遇到以下依赖导入，不会打包对应库代码，而是调用window上的React和ReactDOM
		// import React from 'react'
		// import ReactDOM from 'react-dom'
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	// 模块
	module: {
		// 规则
		rules: [
			//遇到ts或tsx的时候，将这些代码交给babel-loader，babel-loader作为桥接把代码交给内部引用的@babel/core相关API进行处理，当然为了防止babel-loader去解析依赖库node_modules的内容，需要配置exclude。
			/*
            配置babel可以按照如下思路进行：
			xxx.ts(x)代码交给webpack打包；
			webpack遇到ts(x)结尾的代码文件，根据webpack.config.js配置，交给babel-loader；
			babel-loader交给@babel/core；
			@babel/core根据.babelrc配置交给相关的插件处理代码，转为js代码；
			webpack进行后续的打包操作。
            */
			{
				test: /\.tsx?$/,
				use: 'babel-loader',
				exclude: /node_module/,
			},
			{
				test: /\.less$/,
				use: [
					// webpack中的顺序是【从后向前】链式调用的
					// 所以对于less先交给less-loader处理，转为css
					// 再交给css-loader
					// 最后导出css（MiniCssExtractPlugin.loader）
					// 所以注意loader的配置顺序
					{
						loader: MiniCssExtractPlugin.loader,
					},
					// {
					// 	loader: 'css-loader',
					// 	options: {
					// 		module: true,
					// 	},
					// },
					'css-loader',
					'less-loader',
				],
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
		],
	},
	plugins: [
		// 插件用于最终的导出独立的css的工作
		new MiniCssExtractPlugin({
			filename: 'r-ui.umd.css',
		}),
	],
}
