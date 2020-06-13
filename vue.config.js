//vue.config.js
module.exports = {
	devServer: {
		port: 8081,
		
		// host: "192.168.31.200",
		
		https: false,
		
		// 自动启动浏览器
		
		open: true,
		proxy: {
			"/youdao": {
				target: "http://openapi.youdao.com", //设置调用的接口域名和端口
				// target: "http://api.fanyi.baidu.com", //设置调用的接口域名和端口
				changeOrigin: true, //是否跨域
				ws: true,
				pathRewrite: {
					"^/youdao": "/"
				}
			},
			"/api": {
				target: "http://localhost:8080/api", //设置调用的接口域名和端口
				changeOrigin: true, //是否跨域
				ws:true,
				pathRewrite: {
					"^/api": "/"
				}
			},
			"/demo": {
				target: "http://127.0.0.1:5000", //设置调用的接口域名和端口
				changeOrigin: true, //是否跨域
				ws:true,
				pathRewrite: {
					"^/demo": "/"
				}
			}
		}
	}
}
