import axios from 'axios'
import {
  PUBLICCLUES,
  YIRUGONG
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    publicList: [],
    refer: [],
    refers: storage.getDaiban().channel,
    currentPage: 1,
    total: 0,
    pageSize: 10
  },
  mutations: {
    setPublicList(state, payload) {
      state.publicList = payload
    },
    setRefer(state, payload) {
      state.refer = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //领取
    setGet({
      state,
      commit,
      dispatch
    }, uid) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: YIRUGONG + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            status: 2
          }
        }).then(res => {
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //get客户list
    getPublicList({
      state,
      commit
    }, {form, page}) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: PUBLICCLUES,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            highsea_status: 3,
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setPublicList", res.data.data.resources)
          commit("setRefer", res.data.data.links.refer)
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
    puliceTypes(state) {
      let data = state.publicList

      var maps = new Map([
        ['一年级', 1],
        ['二年级', 2],
        ['三年级', 3],
        ['四年级', 4],
        ['五年级', 5],
        ['六年级', 6],
        ['七年级', 7],
        ['八年级', 8],
        ['九年级', 9],
        ['高一', 10],
        ['高二', 11],
        ['高三', 12]
      ]);
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
        ["科学", 10],
        ["全科", -1]
      ])

      var gender = new Map([
        ["男", 1],
        ["女", 2]
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
        ["20岁", 20]
      ])

      var intention = new Map([
        ["高", 1],
        ["中", 2],
        ["低", 3],
        ["无", 4],
        ["E", 5]
      ])

      return data.map(element => {

        element.grade = maps.get(element.grade);
        element.sex = gender.get(element.sex);
        element.age = age.get(element.age);
        element.subject = subjects.get(element.subject);
        element.intention_option = intention.get(element.intention_option);
        return element;
      });

    },
    puliceData(state) {
      let data = state.publicList
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
      var intention = new Map([
        [1, "高"],
        [2, "中"],
        [3, "低"],
        [4, "无"],
        [5, "E"]
      ])
      return data.map(element => {
        var phone = element.mobile.toString()
        var str = phone.split('')
        for (let i = 0; i < str.length; i++) {
          if (i === 3 | i === 4 | i === 5 | i === 6) {
            str[i] = '*'
          }
        }

        storage.getDaiban().channel.map((i => {
          if (i.id == element.refer) {
            return element.refer = i.channel_title
          }
        }))
        element.mobile = str.join("")
        element.grade = maps.get(element.grade);
        element.intention_option = intention.get(element.intention_option);
        return element;
      });
    }
  }
}
