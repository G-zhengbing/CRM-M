import {
  COURSELIST,
  LESSONSLIST,
  CREATEDLESSONS,
  LESSONSSTUDENT,
  ADDALLSTUDENT,
  ADDLESSONSSTUDENT
} from '../../uilt/url/scheduing/scheduing'
import axios from 'axios'
import storage from '../../uilt/storage'

export default {
  namespaced: true,
  state: {
    studentCurrentpage:1,
    studentPagesize:10,
    studentTotal:0,
    lessonsStudent: [],
    lessonsList: [],
    lessonsCurrentpage: 1,
    lessonsPagesize: 10,
    lessonsTotal: 0,
    courseList: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    lessonsTeacherList: [],
    lessonsCourseCard: []
  },
  mutations: {
    setStudentCurrentpage(state,payload){
      state.studentCurrentpage = payload
    },
    setStudentTotal(state,payload){
      state.studentTotal = payload
    },
    setStudentPagesize(state,payload){
      state.studentPagesize = payload
    },
    setLessonsCourseCard(state, payload) {
      state.lessonsCourseCard = payload
    },
    setLessonsTeacherList(state, payload) {
      state.lessonsTeacherList = payload
    },
    setLessonsstudent(stata, payload) {
      stata.lessonsStudent = payload
    },
    setLessonscurrentpage(state, payload) {
      state.lessonsCurrentpage = payload
    },
    setLessonspagesize(state, payload) {
      state.lessonsPagesize = payload
    },
    setLessonstotal(state, payload) {
      state.lessonsTotal = payload
    },
    setLessonslist(state, payload) {
      state.lessonsList = payload
    },
    setCourselist(state, payload) {
      state.courseList = payload
    },
    setCurrentpage(state, payload) {
      state.currentPage = payload
    },
    setPagesize(state, payload) {
      state.pageSize = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //班课添加课节学员
    addLessonsStudent({state,commit,dispatch},{uid,form,page,parentForm,cid}){
      return new Promise((resolve,reject)=>{
        axios({
          method:"post",
          url:ADDLESSONSSTUDENT,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params:{
            ...form,
            lesson_id:uid
          }
        }).then(res=>{
          dispatch('getLessonsList',{page,form:parentForm,uid:cid})
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    },
    //班课添加学员
    addCourseStudents({state,commit,dispatch},{uid,form,page,parentForm}){
      return new Promise((resolve,reject)=>{
        axios({
          method:'post',
          url:ADDALLSTUDENT,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params:{
            ...form,
            schedule_id:uid
          }
        }).then(res=>{
          dispatch('getCourseList',{form:parentForm,page})
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    },
    //学生列表
    getlessonsStudent({
      state,
      commit
    },{form,page}) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: LESSONSSTUDENT,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params:{
            ...form,
            page:page?page:state.studentCurrentpage
          }
        }).then(res => {
          commit('setLessonsstudent', res.data.data.resources)
          commit('setStudentPagesize', res.data.data.links.per_page)
          commit('setStudentTotal', res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //一对一添加课节
    setCreatedlessons({
      state,
      commit
    }, {
      form
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: CREATEDLESSONS,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },params:{
						...form
					}
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //课节列表
    getLessonsList({
      state,
      commit,
      dispatch
    }, {
      uid,
      form,
			page
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: LESSONSLIST + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
						...form,
						page:page?page:state.lessonsCurrentpage
          }
        }).then(res => {
          commit('setLessonslist', res.data.data.resources)
          commit('setLessonspagesize', res.data.data.links.per_page)
          commit('setLessonstotal', res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //课程列表
    getCourseList({
      state,
      commit
    }, {
      form,
      page
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: COURSELIST,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit('setCourselist', res.data.data.resources)
          commit('setPagesize', res.data.data.links.per_page)
          commit('setTotal', res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
