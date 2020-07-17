import axios from 'axios'
import {
  STATISTICS
} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    statisticsList: [],
    statisticsTypesList: null
  },
  mutations: {
    setStatistics(state, payload) {
      state.statisticsList = payload
    }
  },
  actions: {
    //统计分析列表
    getsSatisticsList({
      state,
      commit
    }, {form,status}) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: STATISTICS,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
          params: {
            ...form,
						type:status
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
