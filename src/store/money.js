import axios from 'axios'
import {
  MONEY
} from '../uilt/url/url'
import {
  CANCELORDERFORM
} from '../uilt/url/clientManage/index'
import storage from '../uilt/storage'

export default {
  state: {
    moneyList: [],
    currentPage: 1,
    total: 0,
    pageSize: 10
  },
  mutations: {
    setMoneyList(state, payload) {
      state.moneyList = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
    //取消订单
    cancelOrder({
      state,
      commit,
      dispatch
    }, {
      cid
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: CANCELORDERFORM + '/' + cid,
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
    //订单中心列表
    getMoneyList({
      state,
      commit
    }, {
      form,
      page
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: MONEY,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            page: page ? page : state.currentPage
          }
        }).then(res => {
          commit("setMoneyList", res.data.data.resources)
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
    dataArrmoney(state) {
      let data = state.moneyList

      var monly = new Map([
        [1, '待支付'],
        [2, '已支付'],
        [3, '已取消'],
      ])

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

      var account = new Map([
        [1, '未付费'],
        [2, '已付费']
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

        if (element.is_upgrade == 2) {
          element.is_upgrade = '已升级订单'
        } else if (element.is_upgrade == 3) {
          element.is_upgrade = '升级订单'
        } else {
          element.is_upgrade = '普通订单'
        }
        element.status = monly.get(element.status);
        element.product_grade = maps.get(element.product_grade);
        element.account_status = account.get(element.account_status);
        element.product_subject = subjects.get(element.product_subject);

        return element;
      });
    }
  }
}
