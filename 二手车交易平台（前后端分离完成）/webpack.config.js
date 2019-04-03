const path = require("path")
module.exports = {
	entry:"./www/app/main.js",
	output:{
		// path:path.resolve(__dirname,"www/dist"),
		filename:"bundle.js",
		publicPath:"xuni"
	},
	mode:"development",
	// watch:true,
	module:{
		rules:[
			{
				test:/\.js$/,
				include:[path.resolve(__dirname,"www/app")],
				exclude:[path.resolve(__dirname,"node_modules")],
				loader:"babel-loader",
				options:{
					presets:["env","react"],
					plugins:["transform-object-rest-spread","transform-runtime"]
				}
			},
			{
	            test: /\.less$/,
	            include:[path.resolve(__dirname,"www/app")],
				exclude:[path.resolve(__dirname,"node_modules")],
	            use: [{
	                loader: "style-loader"
	            }, {
	                loader: "css-loader"
	            }, {
	                loader: "less-loader", options: {
	                    strictMath: true,
	                    noIeCompat: true
	                }
	            }]
	        }
		]
	},
	devServer:{
		proxy:{
			"/api":{
				target:"http://127.0.0.1:3000",
				// 如果存在跨域，配上changeOrigin: true
				changeOrigin: true,
				pathRewrite: {'^/api' : ''}
			}
		}
	}
}


// 端口 区别在计算机中联网的应用程序的。 192.168.0.200:80 \ 192.168.0.200:3000 \ 192.168.0.200:8080 \ 192.168.0.2000

// IP  区分计算机地址 192.168.0.200