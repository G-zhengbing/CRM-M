import axios from 'axios'
import {
  TEACHER_RANKING
} from '../../uilt/url/url'
import storage from '../../uilt/storage'

export default {
  state: {
		rankingList:[]
	},
  mutations: {
		setRanking(state,payload){
			state.rankingList = payload
		}
	},
  actions: {
		//教师排名列表
		getTeacherRanking({state,commit},{form}){
			return new Promise((resolve,reject)=>{
				axios({
					method:"get",
					url:TEACHER_RANKING,
					headers: {
            Authorization: "bearer " + storage.get()
					},
					params:{
						...form
					}
				}).then(res=>{
					commit('setRanking',res.data.data)
					resolve()
				}).catch(e=>{
					reject(e)
				})
			})
		}
  }
}
