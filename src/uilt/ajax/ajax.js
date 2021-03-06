import axios from 'axios'
import router from '../../router/index'
import store from '../../store/index'
import storage from '../storage'

let instance = axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})
instance.interceptors.request.use(
  config => {
    
    if (storage.get()) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = "bearer " + storage.get() //请求头加上token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

instance.interceptors.response.use(
  response => {
    //拦截响应，做统一处理 
    if (response.data.code) {
      switch (response.data.code) {
        case 1002:
          store.state.isLogin = false
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })
export default instance
