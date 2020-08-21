// 根据不同环境更改不同BASEURL
let BASEURL = '';
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'testing') {
	// BASEURL = "http://liveapi.canpoint.net/api/" // 线上地址
	BASEURL = "http://39.107.156.22/canpoint/api/" // 测试地址
	// BASEURL = "http://192.168.1.181:3000/api/" // 本地地址
} else if (process.env.NODE_ENV == 'production') {
	BASEURL = "http://liveapi.canpoint.net/api/" // 线上地址
	// BASEURL = "http://39.107.156.22/canpoint/api/" // 测试地址
}
export {
	BASEURL
}