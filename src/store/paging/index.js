import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	namespaced: true,
	state: {
		// 存数据
		total: 1, // 总数
		per_page: 10, // 每页多少
		current_page: 1, // 当前页数
		last_page: 1 // 最后一页
	},
	mutations: {
		// 写方法
		// 判断首电是否完成 style 需调用
		setData(state,data) {
			state.total = data.total
			state.per_page = data.per_page
			state.current_page = data.current_page
			state.last_page = data.last_page
		}
	},
	actions: {
	},
	modules: {
	},
	// 过滤器
	getters: {
	}
})
