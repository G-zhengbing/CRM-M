import axios from 'axios'
import {
  RESERVED,
  QIANDAO
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    reserved: [],
    currentPage: 1,
    total: 0,
    pageSize: 10,
    reservedTypesList: null
  },
  mutations: {
    setReservedTypes(state, payload) {
      state.reservedTypesList = payload
    },
    setReserved(state, payload) {
      state.reserved = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //签到
    setSignin({
      state,
      commit,
      dispatch
    }, {
      uid
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: QIANDAO +'/' + uid,
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
    //我的客户列表
    getReservedList({
      state,
      commit
    }, {
      tab_type,
      form,
      page
    }) {
      if (tab_type == 3) {
        tab_type = ""
      }
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: RESERVED,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            tab_type: tab_type ? tab_type : '',
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setReserved", res.data.data.resources)
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
    reservedTypes(state) {
      let type = state.reservedTypesList
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

      var follow = new Map([
        ["待分配", 1],
        ["已分配", 2],
        ["跟进中", 3],
        ["已调库", 4],
        ["已移出", 5],
        ["已超时", -1]
      ])

      var age = new Map([
        ["5岁", 5],
        ["6岁", 6],
        ["7岁", 7],
        ["8岁", 8],
        ["9岁", 9],
        ["10岁", 10],
        ["11岁", 11],
        ["12岁", 12],
        ["13岁", 13],
        ["14岁", 14],
        ["15岁", 15],
        ["16岁", 16],
        ["17岁", 17],
        ["18岁", 18],
        ["19岁", 19],
        ["20岁", 20],
      ])

      type.grade = maps.get(type.grade)
      type.sex = gender.get(type.sex)
      type.age = age.get(type.age)
      type.type = follow.get(type.type)
      type.subject = subjects.get(type.subject)
      type.intention_option = intention.get(type.intention_option)
      return type
    },
    reservedData(state) {
      let data = state.reserved
      var intention = new Map([
        [1, "高"],
        [2, "中"],
        [3, "低"],
        [4, "无"]
      ])

      var pone = new Map([
        [1, "班课"],
        [4, "一对一"]
      ])

      var gender = new Map([
        [1, "男"],
        [2, "女"]
      ])
      var is_schedule = new Map([
        [1, "未排"],
        [2, "已排"]
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
        element.type = pone.get(element.type);
        element.sex = gender.get(element.sex);
        element.age = age.get(element.age);
        element.is_schedule = is_schedule.get(element.is_schedule);
        element.intention_option = intention.get(element.intention_option);
        return element;
      });
    }
  }
}
