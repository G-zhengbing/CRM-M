// build/get-ip.js

var os = require('os'), ip = '', ifaces = os.networkInterfaces() // 获取本机ip
out:
for (var i in ifaces) {
	for (var j in ifaces.WLAN) {
		var val = ifaces.WLAN[j]
		if (val.family === 'IPv4' && val.address !== '127.0.0.1') {
			ip = val.address
			break out
		}
	}
}
console.log(ifaces)
module.exports = ip