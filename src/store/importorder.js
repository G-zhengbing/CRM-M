import axios from 'axios'
import storage from '../uilt/storage'
import {
	IMPORTANT
} from '../uilt/url/url'

export default {
  state: {
    importorderList: [],
    currentPage: 1,
    pageSize: 10,
    total: 0
  },
  mutations: {
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    },
    setImportorderlist(state, payload) {
      state.importorderList = payload
    }
  },
  actions: {
    getImportOrderList({
      state,
      commit
    }, page) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: IMPORTANT,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            type: 2,
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setImportorderlist", res.data.data.resources)
          commit("setCurrentPage", res.data.data.links.current_page)
          commit("setTotal", res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  getters: {

  }
}
