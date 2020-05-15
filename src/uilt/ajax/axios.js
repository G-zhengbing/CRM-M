import axios from 'axios'
import storage from '../storage'

export default {
  axiosGet({method, url, params}) {
    return new Promise((resolve,reject) => {
      axios({
        method,
        url,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: "bearer " + storage.get()
        },
        params: {
          ...params
        }
      }).then(res=>{
				resolve(res)
			}).catch(e=>{
				reject(e)
			})
    })
  },
  axiosPost({method, url, params}) {
		return new Promise((resolve,reject)=>{
			axios({
        method,
        url,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: "bearer " + storage.get()
        },
        data: {
          ...params
        }
      }).then(res=>{
				resolve(res)
			}).catch(e=>{
				reject(e)
			})
		})
	},
	axiosPut({method, url, params}) {
		return new Promise((resolve,reject)=>{
			axios({
        method,
        url,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: "bearer " + storage.get()
        },
        params: {
          ...params
        }
      }).then(res=>{
				resolve(res)
			}).catch(e=>{
				reject(e)
			})
		})
  }
}
