import asiox from 'axios'
import {} from '../uilt/url/url'
import storage from '../uilt/storage'

export default {
  state: {
    currentPage: 1,
    total: 0,
    pageSize: 10,
    reservList: []
  },
  mutations: {
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setTotal(state, payload) {
      state.total = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setData(state, payload) {
      state,
      reservList = payload
    }
  },
  actions: {
    //预约单列表
    getReservList({state,commit}) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
					},
					params:{
						page:state.currentPage
					}
        }).then(res => {
          console.log(res)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  getters: {

  }
}
