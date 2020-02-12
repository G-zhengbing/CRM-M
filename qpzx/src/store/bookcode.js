import axios from "axios";
import qs from "qs"
import {
	BOOK_URL
} from "../uilt/url/Murl.js";
import storage from '../uilt/storage'

export default {
  state: {
    bookList: [],
    currentPage: 1,
    pageSize: 5,
    total: 0
  },
  mutations: {
    setBookList(state, payload) {
      state.bookList = payload
    },
    setCurrerntPage(state, payload) {
      state.currentPage = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setTotal(state, payload) {
      state.total = payload
    }
  },
  actions: {
		getBookList({state,commit},page,form){
			return new Promise((resolve,reject)=>{
				axios({
					method:"get",
					url:BOOK_URL,
					headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + storage.get()
          },
					params:{
						page:page?page : state.currentPage,
						...form
					}
				}).then(res=>{
					commit("setBookList",res.data.data.resources)
					commit("setCurrerntPage", res.data.data.links.current_page)
          commit("setPageSize", res.data.data.links.per_page)
          commit("setTotal", res.data.data.links.total)
					resolve()
				}).catch(e=>{
					reject(e)
				})
			})
		}
  },
  getters: {}
}
