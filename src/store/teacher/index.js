import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	namespaced: true,
	state: {
		// 存数据
		columns1: [
			{
				type: "selection",
				width: 60,
				align: "center"
			},
			{
				title: "教师姓名",
				key: "teacherName",
				align: "center",
				// width: 100
			},
			{
				title: "性别",
				key: "gender",
				align: "center",
				// width: 80
			},
			{
				title: "联系方式",
				key: "mobile",
				align: "center",
				// width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				// width: 100
			},
			{
				title: "教授科目",
				key: "professorSubject",
				align: "center",
				// width: 100
			},
			{
				title: "创建时间",
				key: "creationTime",
				align: "center",
				// width: 140
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				// width: 340,
				render: (h, params) => {
					return h("div", [
						h(
							"div",
							{
								props: {
									type: "text",
									size: "small",
								},
								style: {
									display: "inline",
									padding: '4px'
								}
							},
							"编辑"
						),
					]);
				}
			}
		],
		columns2: {

		},
		data1: [
			{
				teacherName: "张二二",
				gender: "女",
				mobile: "15612454626",
				grade: "七年级、八年级、九年级",
				professorSubject: "数学",
				creationTime:"2019-11-22 12:00:29"
			}
		],
		data2: [

		]
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	},
	// 过滤器
	getters: {
	}
})
