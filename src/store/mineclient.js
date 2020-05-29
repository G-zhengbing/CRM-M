import axios from 'axios'
import {
  MINECLIENT,
  CLIENTTYPE,
  USERRESERVED,
  CREATERESERVED,
  CLICKTEACHER,
  GETTIMEBLOCK,
  PROVINCE,
  CREATEINTRODUCE,
  QUDAO,
  INTRODUCE,
  YIRUGONG,
  CREATEORDER,
  HANDOVER,
  CITY
} from '../uilt/url/url'
import storage from '../uilt/storage'
import { axiosGet } from '../uilt/ajax/axios'

export default {
  state: {
    city: [],
    provinceList: [],
    mineclient: [],
    currentPage: 1,
    total: 0,
    pageSize: 10,
    clientTypesList: null,
    clientCurrentpage: 1,
    clientTotal: 0,
    clientData: [],
    clientPagesize: 10,
    auditionTotal: 0,
    auditionCurrentPage: 1,
    auditionPageSize: 5,
    auditionData: [],
    notifiTotal: 0,
    notifiCurrentPage: 1,
    notifiPageSize: 10,
    notifiData: []
  },
  mutations: {
    setCity(state, payload) {
      state.city = payload
    },
    setProvinceList(state, payload) {
      state.provinceList = payload
    },
    setNotifiData(state, payload) {
      state.notifiData = payload
    },
    setNotifiPageSize(state, payload) {
      state.notifiPageSize = payload
    },
    setNotifiCurrentPage(state, payload) {
      state.notifiCurrentPage = payload
    },
    setNotifiTotal(state, payload) {
      state.notifiTotal = payload
    },
    setAuditionData(state, payload) {
      state.auditionData = payload
    },
    setAuditionPageSize(state, payload) {
      state.auditionPageSize = payload
    },
    setAuditionCurrentPage(state, payload) {
      state.auditionCurrentPage = payload
    },
    setAuditionTotal(state, payload) {
      state.auditionTotal = payload
    },
    setClientData(state, payload) {
      state.clientData = payload
    },
    setClientTotal(state, payload) {
      state.clientTotal = payload
    },
    setClientCurrentpage(state, payload) {
      state.clientCurrentpage = payload
    },
    setClientTypes(state, payload) {
      state.clientTypesList = payload
    },
    setMineclient(state, payload) {
      state.mineclient = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //移除
    removeMineclient({
      state,
      commit,
      dispatch
    },{uid,note}) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url:YIRUGONG + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            status: 5,
            assign_note:note
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //市
    getCity({
      state,
      commit
    }, cid) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: CITY + "/" + cid
        }).then(res => {
          commit("setCity", res.data.data)
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //交接单
    handover({
      state,
      commit,
      dispatch
    }, form) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: HANDOVER,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //创建订单
    createOrderList({
      state,
      commit,
      dispatch
    }, {
      aid,
      pid,
      num
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: CREATEORDER,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            account_id: aid,
            product_id: pid,
            goods_num: num
          }
        }).then(res => {
          dispatch("getClientType", {
            form: {},
            page: 1
          })
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //转介绍移入
    introduceImmigration({
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
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //检测手机号
    detectionMobile({
      state,
      commit,
      dispatch
    }, mobile) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: INTRODUCE,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            mobile
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //转介绍/创建转介绍
    createIntroduce({
      state,
      commit,
      dispatch
    }, {
      mobile,
      uid
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: CREATEINTRODUCE,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            mobile,
            account_id: uid
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //转介绍列表
    getIntroduce({
      state,
      commit,
      dispatch
    }, uid) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: QUDAO + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            type: 1
          }
        }).then(res => {
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //省
    getProvince({
      state,
      commit,
      dispatch
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: PROVINCE
        }).then(res => {
          commit("setProvinceList", res.data.data)
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //转化时间块
    setTimeBlock({
      state,
      commit,
      dispatch
    }, time) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: GETTIMEBLOCK + '/' + time
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //预约选老师
    getTeacherListN({
      state,
      commit,
      dispatch
    }, form) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: CLICKTEACHER,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //新建预约单
    createdReserved({
      state,
      commit,
      dispatch
    }, {
      form,
      uid
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: CREATERESERVED,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            account_id: uid
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //用户预约单列表
    getUserReservedList({
      state,
      commit,
      dispatch
    }, {
      page,
      uid
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: USERRESERVED + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            page: page ? page : state.notifiCurrentPage
          }
        }).then(res => {
          commit("setNotifiData", res.data.data.resources)
          commit("setNotifiCurrentPage", res.data.data.links.current_page)
          commit("setNotifiTotal", res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //订单列表
    getClientType({
      state,
      commit,
      dispatch
    }, form, page) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: CLIENTTYPE,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.clientCurrentpage
          }
        }).then(res => {
          commit("setClientData", res.data.data.resources)
          commit("setClientCurrentpage", res.data.data.links.current_page)
          commit("setClientTotal", res.data.data.links.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //我的客户列表
    getClientList({
      state,
      commit
    }, {form, page}) {
      // axiosGet({method:"get",url:MINECLIENT,params:{ ...form, page: page ? page : state.currentPage}}).then(res => {
      //   commit("setMineclient", res.data.data.resources)
      //   commit("setCurrentPage", res.data.data.links.current_page)
      //   commit("setTotal", res.data.data.links.total)
      //   resolve()
      // }).catch(e => {
      //   reject(e)
      // })
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: MINECLIENT,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setMineclient", res.data.data.resources)
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
    notifiDatas(state) {
      let data = state.notifiData

      var pone = new Map([
        [1, "班课"],
        [4, "一对一"]
      ])
      return data.map(element => {
        element.type = pone.get(element.type);
        return element
      })
    },
    clientTypes(state) {
      let type = state.clientTypesList
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
      type.follow_status = follow.get(type.follow_status)
      type.subject = subjects.get(type.subject)
      type.intention_option = intention.get(type.intention_option)
      return type
    },
    clientkData(state) {
      let data = state.mineclient
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
        [1, "正常接听"],
        [2, "无人接听"],
        [3, "空号"],
        [4, "挂断"],
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

        storage.getDaiban().channel.map((i => {
          if (i.id == element.refer) {
            return element.refer = i.channel_title
          }
        }))

        element.mobile = str.join("")
        element.phone_status = pone.get(element.phone_status);
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
