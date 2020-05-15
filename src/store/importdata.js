import axios from 'axios'
import storage from '../uilt/storage'
import {
  IMPORTCLUELIST
} from '../uilt/url/url'

export default {
  state: {
    importList: [],
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
    setImportlist(state, payload) {
      state.importList = payload
    }
  },
  actions: {
    getImportList({
      state,
      commit
    }, page) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: IMPORTCLUELIST,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setImportlist", res.data.data.resources)
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
