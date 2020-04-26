import axios from 'axios'
import {
  JINRI
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    xinfenList: [],
    currentPage: 1,
    total: 0,
    pageSize: 10,
    notvisitTypes: null
  },
  mutations: {
    setNotvisitTypes(state, payload){
      state.notvisitTypes = payload
    },
    setXinfenList(state, payload) {
      state.xinfenList = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    getXinfenList({
      state,
      commit
    }, {form, page}) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: JINRI,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setXinfenList", res.data.data.resources)
          commit("setTotal", res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  getters: {
    notvisitType(state) {
      let type = state.notvisitTypes
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
      var gender = new Map([
        ["男", 1],
        ["女", 2]
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
      type.follow_status = follow.get(type.follow_status)
      type.age = age.get(type.age)
      type.grade = maps.get(type.grade)
      type.subject = subjects.get(type.subject)
      type.sex = gender.get(type.sex)
      type.intention_option = intention.get(type.intention_option)
      return type
    },
    NotdataArr(state) {
      let data = state.xinfenList
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
      var intention = new Map([
        [1, "A强烈"],
        [2, "B一般"],
        [3, "C挖掘"],
        [4, "D无效"]
      ])

      // var follow = new Map([
      //   [1, "待分配"],
      //   [2, "已分配"],
      //   [3, "跟进中"],
      //   [4, "已调库"],
      //   [5, "已移出"],
      // ])

      // var pone = new Map([
      //   [1,"正常接听"],
      //   [2,"无人接听"],
      //   [3,"空号"],
      //   [4,"挂断"],
      // ])

      var gender = new Map([
        [1, "男"],
        [2, "女"]
      ])

      var age = new Map([
        [5,"5岁"],
        [6,"6岁"],
        [7,"7岁"],
        [8,"8岁"],
        [9,"9岁"],
        [10,"10岁"],
        [11,"11岁"],
        [12,"12岁"],
        [13,"13岁"],
        [14,"14岁"],
        [15,"15岁"],
        [16,"16岁"],
        [17,"17岁"],
        [18,"18岁"],
        [19,"19岁"],
        [20,"20岁"]
      ])
      return data.map(element => {
        var phone = element.mobile.toString()
        var str = phone.split('')
        for (let i = 0; i < str.length; i++) {
          if (i === 3 | i === 4 | i === 5 | i === 6) {
            str[i] = '*'
          }
        }
        if(element.many_calls != 0){
          element.many_calls = `失败(${element.many_calls}次)`
        }else{
          element.many_calls = '-'
        }

        storage.getDaiban().channel.map((i => {
          if (i.id == element.refer) {
            return element.refer = i.channel_title
          }
        }))

        element.mobile = str.join("")
        element.grade = maps.get(element.grade);
        element.sex = gender.get(element.sex);
        element.age = age.get(element.age);
        // element.follow_status = follow.get(element.follow_status);
        element.intention_option = intention.get(element.intention_option);
        return element;
      });
    }
  }
}
