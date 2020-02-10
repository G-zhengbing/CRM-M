import axios from "axios";
import {
  ADVER_URL,
  DELEADVER_URL,
  ADVEUPDOWN_URL,
  UPDATAADVER_URL
} from "../uilt/url/Murl";
import storage from '../uilt/storage'

export default {
  state: {
    adverList: [],
    adCurrentPage: 1,
    pageSize: 10,
    total: 0
  },
  mutations: {
    setAdverList(state, payload) {
      state.adverList = payload
    },
    setCurrerntPage(state, payload) {
      state.adCurrentPage = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //上线/下线
    setSwitch({dispatch},form){
      if(form.status){
        form.status = 1
      }else{
        form.status = 2
      }
      return new Promise((resolve,reject)=>{
        axios({
          method:"post",
          url:ADVEUPDOWN_URL + "/" + form.id,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params:{
            status:form.status
          }
        }).then(res=>{
          dispatch("getAdverList")
          resolve()
        }).catch(e=>{
          reject(e)
        })
      })
    },
    //删除广告
    deleAdverList({
      state,
      commit,
      dispatch
    }, arr) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: DELEADVER_URL,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            banner_id: arr
          }
        }).then(res => {
          dispatch("getAdverList")
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //得到广告列表
    getAdverList({
      state,
      commit
    }, form,page,sort) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: ADVER_URL,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            page:page? page : state.adCurrentPage,
            field:sort?sort:"",
            ...form
          }
        }).then(res => {
          commit("setAdverList", res.data.data.resources)
          commit("setCurrerntPage", res.data.data.links.current_page)
          commit("setPageSize", res.data.data.links.per_page)
          commit("setTotal", res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  getters: {}
}
