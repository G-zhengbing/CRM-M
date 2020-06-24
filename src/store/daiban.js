import axios from 'axios'
import {
  KEHULIST,
  FENPEI,
  FENPAIXS,
  YIRUGONG,
  DINGDAN,
  HUCHU,
  ASSIGNPAIDALLOCATED,
  REFER,
  PONESTATUS
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    forms: {},
    datas: [],
    status: 1,
    type: null,
    genjinType: null,
    data: [],
    refer: storage.getDaiban().channel,
    follow_status: {},
    intention: {},
    course_type: {},
    currentPage: 1,
    total: 0,
    pageSize: 10,
    fenpeiList: [],
    xiansuoId: [],
    xiaoshowId: 0,
  },
  mutations: {
    setCourse_type(state, payload) {
      state.course_type = payload
    },
    setIntention(state, payload) {
      state.intention = payload
    },
    setFollow_status(state, payload) {
      state.follow_status = payload
    },
    setRefs(state, payload) {
      state.refer = payload
    },
    setForm(state, payload) {
      state.forms = payload
    },
    setDatas(state, payload) {
      state.datas = payload
    },
    setStatusNum(state, payload) {
      state.status = payload
    },
    setGenjinType(state, payload) {
      state.genjinType = payload
    },
    setType(state, payload) {
      state.type = payload
    },
    setXiaoshowId(state, payload) {
      state.xiaoshowId = payload
    },
    setXiansuoId(state, payload) {
      state.xiansuoId = payload
    },
    setColumns(state, payload) {
      state.columns = payload
    },
    setData(state, payload) {
      state.data = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    },
    setPagesize(state, payload) {
      state.pageSize = payload
    },
    setFenpeiList(state, payload) {
      state.fenpeiList = payload
    }
  },
  actions: {
    removeData({
      state,
      commit,
      dispatch
    }, {
      uid,
      note
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: YIRUGONG + '/' + uid,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            status: 5,
            assign_note: note
          }
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //发送验证码
    sendPone({
      state,
      commit,
      dispatch
    }, pone) {
      return new Promise((reoslve, reject) => {
        axios({
          method: "post",
          url: PONESTATUS,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          data: {
            mobile: pone
          }
        }).then(res => {
          reoslve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    //渠道来源列表
    getReferList({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: REFER,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res => {
          storage.savaDaiban(res.data.data)
          commit("setRefs", res.data.data.channel)
          commit("setFenpeiList", res.data.data.sale_list)
          commit("setFollow_status", res.data.data.screen_list.follow_status)
          commit("setIntention", res.data.data.screen_list.intention)
          commit("setCourse_type", res.data.data.screen_list.course_type)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //呼出
    RingUp({}, {
      form,
      status
    }) {
      return new Promise((resolve, reject) => {
        var tel = form.tel
        if (typeof status == 'undefined') {
          tel = form.tel
        } else {
          if (status == 1) {
            tel = form.tel
          } else if (status == 2) {
            tel = form.spare_phone
          }
        }
        axios({
          method: "post",
          url: HUCHU,
          params: {
            mobile: tel
          },
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
    //创建订单
    updataDing({
      state,
      commit,
      dispatch
    }, {
      cid,
      item
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: DINGDAN + '/' + cid,
          params: {
            ...item
          },
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
    //移入公共客户区域
    ShiftOut({
      state,
      commit,
      dispatch
    }, data) {
      return new Promise((resolve, reject) => {
        var num = 5
        if (data.classify == "shiftTo") {
          num = 2
        }
        axios({
          method: "put",
          url: YIRUGONG + "/" + data.data.id,
          params: {
            status: num,
            page: state.currentPage
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res => {
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },

    //分配
    fenPai({
      state,
      commit,
      dispatch
    }, {
      form,
      status
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: FENPAIXS,
          params: {
            account_ids: state.xiansuoId,
            sale_id: state.xiaoshowId.id,
            assign_note: form.assign_note,
            sale_name: form.sale_name,
            page: state.currentPage
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res => {
          if (status == 3) {
            dispatch("getKehuList", {
              status: 3,
              form: state.forms
            })
          } else if (status == 2) {
            dispatch("getKehuList", {
              status: 2,
              form: state.forms
            })
          } else {
            dispatch("getKehuList", {
              status: 1,
              form: state.forms
            })
          }
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //得到列表数据
    getKehuList({
      state,
      commit,
      dispatch
    }, {
      status,
      form,
      page,
      page_num
    }) {
      if (status == 3) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'get',
            url: ASSIGNPAIDALLOCATED,
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Authorization: "bearer " + storage.get()
            },
            params: {
              ...form,
              page: page ? page : state.currentPage,
              is_allocated: 1
            }
          }).then(res => {
            commit("setDatas", res.data.data.resources)
            commit("setData", res.data.data.resources)
            commit("setCurrentPage", res.data.data.links.current_page)
            commit("setTotal", res.data.data.links.total)
            resolve()
          }).catch(e => {
            reject(e)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          axios({
            method: "get",
            url: KEHULIST,
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Authorization: "bearer " + storage.get()
            },
            params: {
              ...form,
              highsea_status: status ? status : 1,
              page: page ? page : state.currentPage,
              page_num: page_num ? page_num : state.pageSize
            }
          }).then(res => {
            commit("setDatas", res.data.data.resources)
            commit("setData", res.data.data.resources)
            commit("setCurrentPage", res.data.data.links.current_page)
            commit('setPagesize', res.data.data.links.per_page * 1)
            commit("setTotal", res.data.data.links.total)
            resolve()
          }).catch(e => {
            reject(e)
          })
        })
      }
    },
    //分配人员列表
    getFenpeiList({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: FENPEI,
          params: {

          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res => {
          commit("setFenpeiList", res.data.data)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  getters: {
    Types(state) {
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

      var version = new Map([
        ["人教版", 1],
        ["北师大版", 2],
        ["华师大版", 3],
        ["苏教版", 4],
        ["鄂教版", 5],
        ["鲁教版", 6],
        ["沪教版", 7],
        ["冀教版", 8],
        ["浙教版", 9],
        ["河大版", 10],
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

      type.textbook_version = version.get(type.textbook_version)
      type.grade = maps.get(type.grade)
      type.sex = gender.get(type.sex)
      type.age = age.get(type.age)
      type.follow_status = follow.get(type.follow_status)
      type.subject = subjects.get(type.subject)
      type.intention_option = intention.get(type.intention_option)
      return type
    },
    dataArr(state) {
      let data = state.data
      var product = new Map([
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
        [1, "高"],
        [2, "中"],
        [3, "低"],
        [4, "无"]
      ])

      var gender = new Map([
        [1, "男"],
        [2, "女"]
      ])

      var type = new Map([
        [1, "班课"],
        [2, "微课"],
        [4, "一对一"]
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

      // var version = new Map([
      //   [1,"人教版"],
      //   [2,"北师大版"],
      //   [3,"华师大版"],
      //   [4,"苏教版"],
      //   [5,"鄂教版"],
      //   [6,"鲁教版"],
      //   [7,"沪教版"],
      //   [8,"冀教版"],
      //   [9,"浙教版"],
      //   [10,"河大版"],
      // ])

      return data.map(element => {
        // if (state.status == 1) {
        var phone = element.mobile.toString()
        var str = phone.split('')
        for (let i = 0; i < str.length; i++) {
          if (i === 3 | i === 4 | i === 5 | i === 6) {
            str[i] = '*'
          }
        }
        element.mobile = str.join("")

        state.refer.map((i => {
          if (i.id == element.refer) {
            return element.refer = i.channel_title
          }
        }))
        // }
        // element.textbook_version = version.get(element.textbook_version);
        element.product_grade = product.get(element.product_grade);
        element.product_type = type.get(element.product_type);
        element.grade = maps.get(element.grade);
        element.sex = gender.get(element.sex);
        element.age = age.get(element.age);
        // element.follow_status = follow.get(element.follow_status);
        // element.subject = subjects.get(element.subject);
        element.intention_option = intention.get(element.intention_option);

        return element;
      });
    }
  }
}
