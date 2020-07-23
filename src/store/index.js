import Vue from 'vue'
import Vuex from 'vuex'
import erweima from './erweima'
import main from './main'
import daiban from './daiban'
import publics from './public'
import money from './money'
import followup from './followup'
import notcallback from './notcallback'
import notvisit from './notvisit'
import advertising from './advertising'
import special from './special'
import curriculum from './curriculum'
import databank from './databank'
import minestudent from './minestudent'
import bookcode from './bookcode'
import studentpay from './studentpay'
import mineclient from './mineclient'
import notification from './notification'
import reserved from './reserved'
import teacher from './teacher'
import statistics from './statistics'
import importdata from './importdata'
import importorder from './importorder'
import scheducourse from './scheduling/scheducourse'
import schedulessons from './scheduling/schedulessons'
import schedustudent from './scheduling/schedustudent'
import scheduteachers from './scheduteachers'
import axios from "axios";

import Payingstudent from './payingstudent/index'
import selectState from './selectState'
import currentPage from './currentPage'
import learningReport from './learningReport'
import {
  GENJIN,
  REFER,
  MEPERMISSION
} from "../uilt/url/url";
import storage from '../uilt/storage'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uName: "",
    permission: []
  },
  mutations: {
    setuName(state, payload) {
      state.uName = payload
    },
    setPermission(state, permission) {
      state.permission = permission
    },
    clearuName(state) {
      state.uName = ""
    }
  },
  actions: {
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
          commit("setRefer", res.data.data.channel)
          commit("setFenpeiList", res.data.data.sale_list)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //跟进
    Genjin({
      dispatch
    }, {
      type,
      status
    }) {
      if (!type.note) {
        type.note = ""
      }
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: GENJIN + "/" + type.id,
          params: {
            ...type,
            page: status
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
    getUser({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: MEPERMISSION,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          }
        }).then(res => {
          commit('setuName', res.data.data.user_name)
          commit("setPermission", res.data.data.permission)
          resolve(res)
        }).catch(e => {
          reject(e);
        })
      })
    }
  },
  modules: {
    scheducourse,//课程管理
    schedulessons,//课节统计
    schedustudent,//教师管理
    scheduteachers,//学员管理
    importorder,//导入订单
    learningReport, // 学情报告
    currentPage, // 储存当前页面信息
    selectState, // 教务/搜索信息
    Payingstudent, // 教务/付费学员
    erweima, //二维码页面
    main, //主页面
    daiban, //资源池
    publics, //公共资源池
    money, //订单中心
    followup, //今日回访
    notcallback, //预期未回访
    notvisit, //今日新分
    advertising ,//广告管理,
    special,//专题管理
    curriculum,//课程管理
    databank,//资料管理
    minestudent,//我的学员
    bookcode,//一书一码
    studentpay,//我的客户/付费学员
    mineclient,//我的客户
    notification,//我的客户/消息提醒
    reserved,//我的预约单
    teacher,//教师管理
    statistics,//统计分析
    importdata,//线索导入
  }
})
