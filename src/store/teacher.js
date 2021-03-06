import axios from 'axios'
import {
  TEACHERLIST,
  DELETETEACHER
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    teacherList: [],
    currentPage: 1,
    total: 0,
    pageSize: 10,
    teacherTypesList: {}
  },
  mutations: {
    setTeacherTypes(state, payload) {
      state.teacherTypesList = payload
    },
    setnTeacherList(state, payload) {
      state.teacherList = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //删除老师
    deleteTearch({state,commit,dispatch},{uid}){
      return new Promise((resolve,reject)=>{
        axios({
          method:"patch",
          url:DELETETEACHER + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res=>{
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    },
    //教师管理列表
    getTeacherList({
      state,
      commit
    }, form, page) {
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
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setnTeacherList", res.data.data.resources)
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
    teacherTypes(state) {
      let type = state.teacherTypesList
      
			var subjects = new Map([
        ["数学", 1],
        ["英语", 2],
        ["语文", 3],
        ["物理", 4],
        ["化学", 5],
        ["政治", 6],
        ["生物", 7],
        ["地理", 8],
        ["历史", 9],
        ['科学',10],
        ['全科',-1]
			])
			
      var gender = new Map([
        ["男", 1],
        ["女", 2]
      ])

      var level = new Map([
        ['中级',1],
        ['高级',2],
        ['特一级',3],
        ['特二级',4],
        ['特三级',5]
      ])

      type.subject = subjects.get(type.subject)
      type.level = level.get(type.level);
      type.sex = gender.get(type.sex)
      return type
    },
    teacherData(state) {
			let data = state.teacherList
			
      var gender = new Map([
        [1, "男"],
        [2, "女"]
      ])

      var level = new Map([
        [1,'中级'],
        [2,'高级'],
        [3,'特一级'],
        [4,'特二级'],
        [5,'特三级']
      ])

      return data.map(element => {
        element.sex = gender.get(element.sex);
        element.level = level.get(element.level);
        var phone = element.mobile.toString()
        var str = phone.split('')
        for (let i = 0; i < str.length; i++) {
          if (i === 3 | i === 4 | i === 5 | i === 6) {
            str[i] = '*'
          }
        }
        element.mobile = str.join("")
        return element;
      });
    }
  }
}
