import axios from 'axios'
import {
  TECPAY,
  TEPAYSTU,
  TEPAYLIST,
  TECHSTU
} from "../uilt/url/url";
import storage from '../uilt/storage'

export default {
  state: {
    paystu: [],
    CurrentPage: 1,
    pageSize: 10,
    total: 0,
    genjinType: null,
    xiansuoId: [],
    xiaoshowId: 0,
    payList: [],
    fenStu: [],
    fenNum: 0
  },
  mutations: {
    setPaystu(state,payload){
      state.paystu = payload
    },
    setFenStu(state, payload) {
      state.fenStu = payload
    },
    setGenjinpaystu(state, payload) {
      state.genjinType = payload
    },
    setFenNum(state, payload) {
      state.fenNum = payload
    },
    setCurrerntPagep(state, payload) {
      state.CurrentPage = payload
    },
    setCurrerntPagef(state, payload) {
      state.CurrentPage = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setTotal(state, payload) {
      state.total = payload
    },
    setXiaoshowIdPay(state, payload) {
      state.xiaoshowId = payload
    },
    setXiansuoIdPay(state, payload) {
      state.xiansuoId = payload
    },
    setPayList(state, payload) {
      state.payList = payload
    }
  },
  actions: {
    //已分配学员订单
    getFenStu({
      state,
      commit
    }, {
      page,
      form
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: TECHSTU,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.CurrentPage
          }
        }).then(res => {
          commit("setFenStu", res.data.data.resources)
          commit("setCurrerntPagef", res.data.data.links.current_page)
          commit("setTotal", res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //班主任列表
    getPayList({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: TEPAYLIST,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
        }).then(res => {
          commit("setPayList", res.data.data)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //分配
    setPayStu({
      state,
      commit,
      dispatch
    }, {
      form
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: TEPAYSTU,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            order_ids: state.xiansuoId,
            sale_id: state.xiaoshowId.id,
            sale_name: form.sale_name,
          }
        }).then(res => {
          if (state.fenNum == 1) {
            dispatch("getPayStu", {
              page: state.CurrentPage
            })
          } else {
            dispatch("getFenStu", {
              page: state.CurrentPage
            })
          }
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //得到班主任付费学员列表
    getPayStu({
      state,
      commit
    }, {
      page,
      form
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: TECPAY,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.CurrentPage
          }
        }).then(res => {
          commit("setPaystu", res.data.data.resources)
          commit("setCurrerntPagep", res.data.data.links.current_page)
          commit("setTotal", res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  getters: {
    payStuTypes(state) {
      let type = state.genjinType
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
      var course = new Map([
        ["未约课", 1],
        ["已约课", 2]
      ])
      var intention = new Map([
        ["A", 1],
        ["B", 2],
        ["C", 3],
        ["D", 4],
        ["E", 5]
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
        ["已移出", 5]
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

      type.order_grade = maps.get(type.order_grade)
      type.sex = gender.get(type.sex)
      type.age = age.get(type.age)
      type.follow_status = follow.get(type.follow_status)
      type.product_subject = subjects.get(type.product_subject)
      type.is_course = course.get(type.is_course)
      type.intention_option = intention.get(type.intention_option)
      return type
    },
    payStuArr(state) {
      let data = state.paystu
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
        [1, '数学'],
        [2, "英语"],
        [3, "语文"],
        [4, "物理"],
        [5, "化学"],
        [6, "政治"],
        [7, "生物"],
        [8, "地理"],
        [9, "历史"]
      ])
      var course = new Map([
        [1, '未约课'],
        [2, "已约课"]
      ])
      var intention = new Map([
        [1, "A"],
        [2, "B"],
        [3, "C"],
        [4, "D"],
        [5, "E"]
      ])

      var gender = new Map([
        [1, "男"],
        [2, "女"]
      ])
      var follow = new Map([
        [1, "待分配"],
        [2, "已分配"],
        [3, "跟进中"],
        [4, "已调库"],
        [5, "已移出"],
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
        element.order_grade = maps.get(element.order_grade);
        element.sex = gender.get(element.sex);
        element.age = age.get(element.age);
        element.follow_status = follow.get(element.follow_status);
        element.product_subject = subjects.get(element.product_subject);
        element.is_course = course.get(element.is_course);
        element.intention_option = intention.get(element.intention_option);

        return element;
      });
    },
    StuArr(state) {
      let data = state.fenStu
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
        [1, '数学'],
        [2, "英语"],
        [3, "语文"],
        [4, "物理"],
        [5, "化学"],
        [6, "政治"],
        [7, "生物"],
        [8, "地理"],
        [9, "历史"]
      ])
      var course = new Map([
        [1, '未约课'],
        [2, "已约课"]
      ])
      var intention = new Map([
        [1, "A"],
        [2, "B"],
        [3, "C"],
        [4, "D"],
        [5, "E"]
      ])

      var gender = new Map([
        [1, "男"],
        [2, "女"]
      ])
      var follow = new Map([
        [1, "待分配"],
        [2, "已分配"],
        [3, "跟进中"],
        [4, "已调库"],
        [5, "已移出"],
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
        element.order_grade = maps.get(element.order_grade);
        element.sex = gender.get(element.sex);
        element.age = age.get(element.age);
        element.follow_status = follow.get(element.follow_status);
        element.product_subject = subjects.get(element.product_subject);
        element.is_course = course.get(element.is_course);
        element.intention_option = intention.get(element.intention_option);

        return element;
      });
    }
  }
}