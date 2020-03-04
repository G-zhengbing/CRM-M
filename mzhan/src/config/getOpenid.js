import Vue from 'vue'

// 获取getOpendID
const wxGet = () => {
  Vue.axiosGet(Vue.api.weixinPublicLoginPlugin, {code: WXcode}).then(res => {
    if (res.code === 1) {
      localStorage.setItem('WXInfo', JSON.stringify(res.data))
    } else {
      alert('获取OpendID失败')
    }
  })
}
 
// 微信授权登录
const getLogin = () => {
  let urlrouter = window.location.href.split('#/')[1] // 当前路由
  let url = 'http://quanpinzaixian.com' // 重定向返回地址
  let wxappid = 'wx406b6ad3a5a9d5b4' // 微信公众号appid
  let str = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&redirect_uri=' + url + urlrouter + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  window.location.href = str
}
 
var WXcode
var WXInfo = localStorage.getItem('WXInfo') ? JSON.parse(localStorage.getItem('WXInfo')) : 'noLogin'
let str = window.location.href
var ua = navigator.userAgent.toLowerCase()
var isWeixin = ua.indexOf('micromessenger') !== -1 // 是否 在微信浏览器内
let isURL = window.location.href.indexOf('code=') === -1 // 是否 没有授权重定向回来
 
if (isWeixin && WXInfo === 'noLogin' && isURL) {
  getLogin()
}
// 重定向回来
if (!isURL) {
  let num1 = str.indexOf('code=')
  let num2 = str.indexOf('&state=')
  WXcode = str.slice(num1 + 5, num2)
  localStorage.setItem('WXcode', JSON.stringify(WXcode))
  if (WXInfo === 'noLogin' || WXInfo.openid === null) {
    wxGet()
  }
}