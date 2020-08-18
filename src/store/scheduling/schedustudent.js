import axios from 'axios'
import {
  STUDENTLIST,
  TEACHERLIST,
  CUORSECARD
} from '../../uilt/url/scheduing/scheduing'
import {
  HUCHU
} from '../../uilt/url/url'
import storage from '../../uilt/storage'

export default {
  namespaced: true,
  state: {
    teacherList: [],
    studentList: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    courseCard: [],
    teacherCurrentPage: 1,
    teacherPageSize: 10,
    teacherTotal: 0
  },
  mutations: {
    setTeacherTotal(state, payload) {
      state.teacherTotal = payload
    },
    setTeacherPageSize(state, payload) {
      state.teacherPageSize = payload
    },
    setTeacherCurrentPage(state, payload) {
      state.teacherCurrentPage = payload
    },
    setCoursecard(state, payload) {
      state.courseCard = payload
    },
    setTEacherList(state, payload) {
      state.teacherList = payload
    },
    setTotal(state, payload) {
      state.total = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setStudentList(state, payload) {
      state.studentList = payload
    }
  },
  actions: {
    //呼出
    RingUp({}, {
      form,
      status
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: HUCHU,
          params: {
            mobile: form.mobile,
            id: form.id
          },
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
    //课程卡
    getCoursecard({
      state,
      commit
    }, uid) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: CUORSECARD + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res => {
          commit("setCoursecard", res.data.data)
          commit('scheducourse/setLessonsCourseCard', res.data.data, {
            root: true
          })
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //获取班课老师列表
    getTeacherList({
      state,
      commit
    }, {
      form,
      type,
      page
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: TEACHERLIST,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            ...type,
            page: page ? page : state.teacherCurrentPage
          }
        }).then(res => {
          commit("setTEacherList", res.data.data.resources)
          // commit('scheducourse/setLessonsTeacherList', res.data.data, {
          //   root: true
          // })
          commit('setTeacherPageSize', res.data.data.links.per_page)
          commit('setTeacherTotal', res.data.data.links.total)
          commit('setTeacherCurrentPage', res.data.data.links.current_page)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //学员列表
    getStudentList({
      state,
      commit
    }, {
      form,
      page
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: STUDENTLIST,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setStudentList", res.data.data.resources)
          commit('setPageSize', res.data.data.links.per_page)
          commit('setTotal', res.data.data.links.total)
          commit('setCurrentPage', res.data.data.links.current_page)
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
