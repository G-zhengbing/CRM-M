import axios from 'axios'
import {
  ANALLOT,
  ACCOUNTORDER,
  CLIENTTYPE,
  CREATEUPGRADE
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    studentpayList: [],
    refer: storage.getDaiban().channel,
    currentPage: 1,
    total: 0,
    pageSize: 10,
    studentpayTypesList: null,
    accountList:[],
    ordersnList:[]
  },
  mutations: {
    setOrdersnList(state,payload){
      state.ordersnList = payload
    },
    setAccountList(state,payload){
      state.accountList = payload
    },
    setStudentpayTypes(state, payload) {
      state.studentpayTypesList = payload
    },
    setStudentpayList(state, payload) {
      state.studentpayList = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //创建升级订单
    createUpOrder({state,commit,dispatch},form){
      return new Promise((resolve,reject)=>{
        axios({
          method:"post",
          url:CREATEUPGRADE,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params:{
            ...form
          }
        }).then(res=>{
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    },
    //订单列表
    getOrdersnList({state,commit,dispatch},form){
      return new Promise((resolve,reject)=>{
        axios({
          method:"get",
          url:CLIENTTYPE,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params:{
            ...form
          }
        }).then(res=>{
          commit("setOrdersnList",res.data.data.resources)
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    },
    //补款升级列表
    getAccountList({
      state,
      commit,
      dispatch
    }, uid) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: ACCOUNTORDER + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res => {
          commit("setAccountList",res.data.data.resources)
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //付费学员列表
    getStudentList({
      state,
      commit
    }, {form, page}) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: ANALLOT,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.currentPage,
            is_allocated: 2
          }
        }).then(res => {
          commit("setStudentpayList", res.data.data.resources)
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
    studentpayTypes(state) {
      let type = state.studentpayTypesList
      var maps = new Map([
        ["一年级", 1],
        ["二年级", 2],
        ["三年级", 3],
        ["四年级", 4],
        ["五年级", 5],
        ["六年级", 6],
        ["七年级", 7],
        ["八年级", 8],
        ["九年级", 9],
      ])
      var subjects = new Map([
        ["数学", 1],
        ["英语", 2],
        ["语文", 3],
        ["物理", 4],
        ["化学", 5],
        ["政治", 6],
        ["生物", 7],
        ["地理", 8],
        ["历史", 9]
      ])
      var intention = new Map([
        ["高", 1],
        ["中", 2],
        ["低", 3],
        ["无", 4]
        
      ])
      var gender = new Map([
        ["男", 1],
        ["女", 2]
      ])
      type.grade = maps.get(type.grade)
      type.subject = subjects.get(type.subject)
      type.sex = gender.get(type.sex)
      type.intention_option = intention.get(type.intention_option)
      return type
    },
    studentpaykData(state) {
      let data = state.studentpayList
      var maps = new Map([
        [1, '一年级'],
        [2, '二年级'],
        [3, '三年级'],
        [4, '四年级'],
        [5, '五年级'],
        [6, '六年级'],
        [7, '七年级'],
        [8, '八年级'],
        [9, '九年级'],
        [10, '高一'],
        [11, '高二'],
        [12, '高三'],
      ]);
      var subjects = new Map([
        [1, '一年级'],
        [2, '二年级'],
        [3, '三年级'],
        [4, '四年级'],
        [5, '五年级'],
        [6, '六年级'],
        [7, '七年级'],
        [8, '八年级'],
        [9, '九年级'],
        [10, '高一'],
        [11, '高二'],
        [12, '高三'],
      ]);
      // var subjects = new Map([
      //   [1, '英语'],
      //   [2, "数学"]
      // ])
      // var course = new Map([
      //   [1, '未约课'],
      //   [2, "已约课"]
      // ])
      var intention = new Map([
        [1, "高"],
        [2, "中"],
        [3, "低"],
        [4, "无"]
      ])

      var product_type = new Map([
        [1, "班课"],
        [2, "微课"],
        [3, "一书一码"],
        [4, "一对一"]
      ])

      // var follow = new Map([
      //   ["待分配", 1],
      //   ["已分配", 2],
      //   ["跟进中", 3],
      //   ["已调库", 4],
      //   ["已移出", 5],
      //   ["已超时", -1]
      // ])

      var gender = new Map([
        [1, "男"],
        [2, "女"]
      ])

      var age = new Map([
        [5, "5岁"],
        [6, "6岁"],
        [7, "7岁"],
        [8, "8岁"],
        [9, "9岁"],
        [10, "10岁"],
        [11, "11岁"],
        [12, "12岁"],
        [13, "13岁"],
        [14, "14岁"],
        [15, "15岁"],
        [16, "16岁"],
        [17, "17岁"],
        [18, "18岁"],
        [19, "19岁"],
        [20, "20岁"]
      ])
      return data.map(element => {
        var phone = element.mobile.toString()
        var str = phone.split('')
        for (let i = 0; i < str.length; i++) {
          if (i === 3 | i === 4 | i === 5 | i === 6) {
            str[i] = '*'
          }
        }
        element.mobile = str.join("")
        element.product_type = product_type.get(element.product_type);
        element.product_grade = subjects.get(element.product_grade);
        element.grade = maps.get(element.grade);
        element.sex = gender.get(element.sex);
        element.age = age.get(element.age);
        // element.follow_status = follow.get(element.follow_status);
        // element.subject = subjects.get(element.subject);
        // element.is_course = course.get(element.is_course);
        element.intention_option = intention.get(element.intention_option);
        return element;
      });
    }
  }
}
