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
				title: "课程名称",
				key: "courseTitle",
				align: "center",
				width: 140
			},
			{
				title: "课程类型",
				key: "classType",
				align: "center",
				width: 120
			},
			{
				title: "收费模式",
				key: "chargeMode",
				align: "center",
				width: 120
			},
			{
				type: "html",
				title: "科目",
				key: "subject",
				align: "center",
				width: 100
			},
			{
				title: "创建时间",
				key: "creationTime",
				align: "center",
				width: 200
			},
			{
				title: "课程状态",
				key: "StateOfCourse",
				align: "center",
				width: 120,
				render: (h, params) => {
					return h("div", [
						h(
							"StateOfCourse",
							{
								props: {
									type: "text",
									size: "small",
									userIndex: params.index
								},
								style: {
									display: "inline",
									padding: '4px'
								}
							},
						),
					]);
				}
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				// width: 340,
				render: (h, params) => {
					return h("div", [
						h(
							"span",
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
						h(
							"span",
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
							"删除"
						)
					]);
				}
			}
		],
		data1: [
			{
				courseTitle: "初一一对一",
				classType: "一对一",
				chargeMode: "按课时",
				subject: "<span class='subjectBGC'>语文</span>",
				creationTime: "2019-11-22 12:00:29",
				StateOfCourse: "<StateOfCourse />"
			}
		],
	},
	mutations: {
		// 写方法
	},
	actions: {
	},
	modules: {
	}
})
