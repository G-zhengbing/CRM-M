import axios from 'axios'
import {
  STATISTICS,
  ANALYZE_STATISTICS,
  PERSON_STATISTICS
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    personList:[],
    statisticsList: [],
    analyzeList: [],
    statisticsTypesList: null,
    collect:[]
  },
  mutations: {
    setPerson(state,payload){
      state.personList = payload
    },
    setCollect(state,payload){
      state.collect = payload
    },
    setAnalyze(state, payload) {
      state.analyzeList = payload
    },
    setStatistics(state, payload) {
      state.statisticsList = payload
    }
  },
  actions: {
    //统计分析/个人业绩分布
    getPersonList({state,commit},{form}){
      return new Promise((resolve,reject)=>{
        axios({
          method:"get",
          url:PERSON_STATISTICS,
          headers: {
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form
          }
        }).then(res=>{
          commit('setPerson',res.data.data)
          resolve(res)
        }).catch(e=>{
          reject(e)
        })
      })
    },
    //统计分析/业绩分析
    getAnalyzeList({
      state,
      commit
    }, {
      form,
      status
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: ANALYZE_STATISTICS,
          headers: {
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            type: status
          }
        }).then(res => {
          commit('setAnalyze',res.data.data.data)
          commit('setCollect',res.data.data.total)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    //统计分析列表
    getsSatisticsList({
      state,
      commit
    }, {
      form,
      status
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: STATISTICS,
          headers: {
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
            type: status
          }
        }).then(res => {
          commit("setStatistics", res.data.data)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
