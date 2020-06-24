import axios from "axios";
import {
  COURSETEACHERS,
  CURR_URL,
  ADDCURR_URL,
  CURRSHOW_URL,
  CURRUPDOWN_URL,
  DELECURR_URL
} from "../uilt/url/Murl.js";
import storage from '../uilt/storage'

export default {
  namespaced: true,
  state: {
    currlList: [],
    currentPage: 1,
    pageSize: 5,
    total: 0,
    currculumTeachs:''
  },
  mutations: {
    setCUrrculumTeachs(state,payload){
      state.currculumTeachs = payload
    },
    setCurrList(state, payload) {
      state.currlList = payload
    },
    setCurrerntPage(state, payload) {
      state.currentPage = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //教师列表
    getCurrculumTeachs({state,commit,dispatch}){
      return new Promise((resolve,reject)=>{
        axios({
          method:"get",
          url:COURSETEACHERS + '/' + '1',
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res=>{
          commit("setCUrrculumTeachs",res.data.data)
          resolve()
        }).catch(e=>{
          reject(e)
        })
      })
    },
    putawayData({
      state,
      commit,
      dispatch
    }, 
      uid) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: CURRUPDOWN_URL,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            id: uid,
            status:1
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //课程下架
    setCurrDownUp({
      state,
      commit,
      dispatch
    }, uid) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: CURRUPDOWN_URL,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            id: uid,
            status: 2
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //删除课程
    delCurrList({
      state,
      commit,
      dispatch
    }, arr) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DELECURR_URL,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ids: arr.length > 1 ? arr.join(',') : arr
          }
        }).then(res => {
          dispatch("getCurrList",{})
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //是否首页展示
    setCurrSwitch({
      dispatch
    }, {params,form}) {
      if (form.is_hot) {
        form.is_hot = 2
      } else {
        form.is_hot = 1
      }
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: CURRSHOW_URL,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            id: form.id,
            type: form.is_hot
          }
        }).then(res => {
          dispatch("getCurrList",{form:params})
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //课程列表
    getCurrList({
      state,
      commit
    }, {form, page, sort}) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: CURR_URL,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            page: page ? page : state.currentPage,
            sort: sort ? sort : "",
            ...form
          }
        }).then(res => {
          commit("setCurrList", res.data.data.data)
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
