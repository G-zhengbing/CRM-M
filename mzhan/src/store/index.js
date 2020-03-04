import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../uilt/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    giwe_status:storage.getDraw(),
    user:"",
    openid:"",
    code:"",
    appid:"wx406b6ad3a5a9d5b4",
    secret:'f6f62dbf84e648df5b1484fc64b41d4c',
    payType:""
	},
  mutations: {
    setpayType(state,payload){
      state.payType = payload
    },
    setCode(state,payload){
      state.code = payload
    },
		steGiweStatus(state,payload){
			state.giwe_status = payload
    },
    setUserInfo(state,payload){
      state.user = payload
    },
    setOpenid(state,payload){
      state.openid = payload
    }
	},
  actions: {},
  getters: {},
  modules: {}
})
