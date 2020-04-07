import axios from 'axios'
import {
  ANALLOT
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    studentpayList: [],
    refer: storage.getDaiban().channel,
    currentPage: 1,
    total: 0,
    pageSize: 10,
    studentpayTypesList: null
  },
  mutations: {
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
    getStudentList({
      state,
      commit
    }, form, page) {
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
        ["A强烈", 1],
        ["B一般", 2],
        ["C挖掘", 3],
        ["D无效", 4]
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
        [9, '九年级']
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
        [9, '九年级']
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
        [1, "A强烈"],
        [2, "B一般"],
        [3, "C挖掘"],
        [4, "D无效"]
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
