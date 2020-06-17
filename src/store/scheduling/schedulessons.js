import axios from 'axios'
import {
  SCHEDULESSONSLIST
} from '../../uilt/url/scheduing/scheduing'
import storage from '../../uilt/storage'

export default {
  namespaced: true,
  state: {
    lessonsList: [],
    currentPage: 1,
    pageSize: 10,
    total: 0
  },
  mutations: {
    setTotal(state, payload) {
      state.total = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setLessonsList(state, payload) {
      state.lessonsList = payload
    }
  },
  actions: {
    //课节列表
    getLessonsList({
      state,
      commit
    }, {
      form,
      page
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: SCHEDULESSONSLIST,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setLessonsList", res.data.data.resources)
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
