import axios from "axios";
import qs from "qs"
import {
  BOOK_URL,
  BOOK_REMOVE,
  CLASS_LIST
} from "../uilt/url/Murl.js";
import storage from '../uilt/storage'

export default {
  state: {
    bookList: [],
    currentPage: 1,
    pageSize: 5,
    total: 0
  },
  mutations: {
    setBookList(state, payload) {
      state.bookList = payload
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
    //课列表
    getClassList({
      state,
      commit
    }, type) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: CLASS_LIST + '?type=' + type,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    // 删除一书一码
    deleBookList({
      state,
      commit,
      dispatch
    }, arr) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: BOOK_REMOVE,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params:{
            ids:arr.join(',')
          }
        }).then(res => {
          dispatch("getBookList")
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //一书一码列表
    getBookList({
      state,
      commit
    }, form, page) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: BOOK_URL,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            page: page ? page : state.currentPage,
            ...form
          }
        }).then(res => {
          commit("setBookList", res.data.data.data)
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
