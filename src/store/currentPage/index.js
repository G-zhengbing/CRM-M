export default {
	state: {
		dataList: {},
		refresh: false,
		followUp: false,
		userId: "",
		order_id: ""
	},
	mutations: {
		setCurrentPages(state, data) {
			state.dataList = data
		},
		// 设置页面是否刷新
		setRefresh(state, data) {
			state.refresh = data
		},
		// 设置是否显示跟进页面
		setFollowUp(state, data) {
			state.followUp = data
		},
		// 设置用户唯一值,代替userIndex
		setUserId(state, data) {
			state.userId = data
		},
		// 设置用户跟进对比
		setOrder_id(state,data) {
			state.order_id = data
		}
	},
	actions: {

	}
}