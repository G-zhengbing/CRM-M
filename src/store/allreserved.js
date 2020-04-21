import axios from 'axios'
import {
  RESERVEDAll,
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
    //我的客户列表
    getReservedAllList({
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
          url: RESERVEDAll,
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
    reservedAllTypes(state) {
      let type = state.reservedTypesList
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

      // var version = new Map([
      //   ["人教版",1],
      //   ["北师大版",2],
      //   ["华师大版",3],
      //   ["苏教版",4],
      //   ["鄂教版",5],
      //   ["鲁教版",6],
      //   ["沪教版",7],
      //   ["冀教版",8],
      //   ["浙教版",9],
      //   ["河大版",10],
      // ])

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

      // type.textbook_version = version.get(type.textbook_version)
      type.grade = maps.get(type.grade)
      type.sex = gender.get(type.sex)
      type.age = age.get(type.age)
      type.type = follow.get(type.type)
      type.subject = subjects.get(type.subject)
      type.intention_option = intention.get(type.intention_option)
      return type
    },
    reservedAllData(state) {
      let data = state.reserved
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
      // var subjects = new Map(...state.subject)
      // var subjects = new Map([
      //   [1, '数学'],
      //   [2, "英语"],
      //   [3, "语文"],
      //   [4, "物理"],
      //   [5, "化学"],
      //   [6, "政治"],
      //   [7, "生物"],
      //   [8, "地理"],
      //   [9, "历史"]
      // ])
      var intention = new Map([
        [1, "A强烈"],
        [2, "B一般"],
        [3, "C挖掘"],
        [4, "D无效"]
      ])
      // var version = new Map([
      //   [1,"人教版"],
      //   ["北师大版"],
      //   ["华师大版",3],
      //   ["苏教版",4],
      //   ["鄂教版",5],
      //   ["鲁教版",6],
      //   ["沪教版",7],
      //   ["冀教版",8],
      //   ["浙教版",9],
      //   ["河大版",10],
      // ])

      // var follow = new Map(state.follow_status)

      var pone = new Map([
        [1, "班课"],
        [4, "一对一"]
      ])

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
        element.type = pone.get(element.type);
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
