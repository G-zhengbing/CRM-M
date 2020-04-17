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
				title: "学员姓名",
				key: "student_name",
				align: "center",
				width: 100
			},
			{
				title: "注册手机",
				key: "mobile",
				align: "center",
				width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				width: 100
			},
			{
				title: "科目",
				key: "subject",
				align: "center",
				width: 100
			},
			{
				title: "购买课程",
				key: "course_name",
				align: "center",
				width: 180
			},
			{
				title: "班级类型",
				key: "class_type",
				align: "center",
				width: 100
			},
			{
				title: "课节进度",
				key: "classSchedule",
				align: "center",
				width: 100
			},
			{
				title: "开课日期",
				key: "start_date",
				align: "center",
				sortable: true,
				sortType: "asc",
				width: 120
			},
			{
				title: "主讲老师",
				key: "lecturer",
				align: "center",
				width: 100
			},
			{
				title: "交易时间",
				key: "pay_time",
				align: "center",
				width: 180
			},
			{
				title: "本周到课情况",
				key: "class_attendance",
				align: "center",
				width: 140,
				// render: (h, params) => {
				// 	return h("div", [
				// 		h(
				// 			"StateSelection",
				// 			{
				// 				props: {
				// 					type: "text",
				// 					size: "small",
				// 					classify: 1,
				// 					userIndex: params.index
				// 				},
				// 			},
				// 		)
				// 	]);
				// }
			},
			{
				title: "上周交作业情况",
				key: "delivery_of_work",
				align: "center",
				width: 140,
				// render: (h, params) => {
				// 	return h('StateSelection', {
				// 		props: {
				// 			type: "text",
				// 			size: "small",
				// 			classify: 2,
				// 			userIndex: params.index
				// 		},
				// 	},
				// 	)
				// }
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				fixed: 'right',
				width: 200,
				render: (h, params) => {
					return h("div", [
						h(
							"LearningReport",
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
						h(
							"StudentsFollowUp",
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
						h(
							"CallOut",
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
			}
		],
		columns2: [
			{
				type: "selection",
				width: 60,
				align: "center"
			},
			{
				title: "学员姓名",
				key: "student_name",
				align: "center",
				width: 100
			},
			{
				title: "注册手机",
				key: "mobile",
				align: "center",
				width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				width: 100
			},
			{
				title: "科目",
				key: "subject",
				align: "center",
				width: 100
			},
			{
				title: "购买课程",
				key: "course_name",
				align: "center",
				width: 180
			},
			{
				title: "班级类型",
				key: "class_type",
				align: "center",
				width: 100
			},
			{
				title: "课节进度",
				key: "classSchedule",
				align: "center",
				width: 100
			},
			{
				title: "开课日期",
				key: "start_date",
				align: "center",
				width: 140
			},
			{
				title: "主讲老师",
				key: "lecturer",
				align: "center",
				width: 100
			},
			{
				title: "上次跟进内容",
				key: "content_of_last_return_visit",
				align: "center",
				width: 180
			},
			{
				title: "本周到课情况",
				key: "class_attendance",
				align: "center",
				width: 140,
				// render: (h, params) => {
				// 	return h('StateSelection', {
				// 		props: {
				// 			type: "text",
				// 			size: "small",
				// 			classify: 1
				// 		},
				// 	},
				// 	)
				// }
			},
			{
				title: "上周交作业情况",
				key: "delivery_of_work",
				align: "center",
				width: 140,
				// render: (h, params) => {
				// 	return h('StateSelection', {
				// 		props: {
				// 			type: "text",
				// 			size: "small",
				// 			classify: 2
				// 		},
				// 	},
				// 	)
				// }
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				fixed: 'right',
				width: 200,
				render: (h, params) => {
					return h("div", [
						h(
							"LearningReport",
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
						h(
							"StudentsFollowUp",
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
						h(
							"CallOut",
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
			}
		],
		columns3: [
			{
				type: "selection",
				width: 60,
				align: "center"
			},
			{
				title: "学员姓名",
				key: "student_name",
				align: "center",
				width: 100
			},
			{
				title: "注册手机",
				key: "mobile",
				align: "center",
				width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				width: 100
			},
			{
				title: "科目",
				key: "subject",
				align: "center",
				width: 100
			},
			{
				title: "购买课程",
				key: "course_name",
				align: "center",
				width: 180
			},
			{
				title: "班级类型",
				key: "class_type",
				align: "center",
				width: 100
			},
			{
				title: "课节进度",
				key: "classSchedule",
				align: "center",
				width: 100
			},
			{
				title: "开课日期",
				key: "start_date",
				align: "center",
				width: 140
			},
			{
				title: "主讲老师",
				key: "lecturer",
				align: "center",
				width: 100
			},
			{
				title: "回访日期",
				key: "date_of_return_visit",
				align: "center",
				width: 140
			},
			{
				title: "上次跟进内容",
				key: "content_of_last_return_visit",
				align: "center",
				width: 180
			},
			{
				title: "本周到课情况",
				key: "class_attendance",
				align: "center",
				width: 140,
				// render: (h, params) => {
				// 	return h('StateSelection', {
				// 		props: {
				// 			type: "text",
				// 			size: "small",
				// 			classify: 1
				// 		},
				// 	},
				// 	)
				// }
			},
			{
				title: "上周交作业情况",
				key: "delivery_of_work",
				align: "center",
				width: 140,
				// render: (h, params) => {
				// 	return h('StateSelection', {
				// 		props: {
				// 			type: "text",
				// 			size: "small",
				// 			classify: 2
				// 		},
				// 	},
				// 	)
				// }
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				fixed: 'right',
				width: 200,
				render: (h, params) => {
					return h("div", [
						h(
							"LearningReport",
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
						h(
							"StudentsFollowUp",
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
						h(
							"CallOut",
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
			}
		],
		columns4: [
			{
				type: "selection",
				width: 60,
				align: "center"
			},
			{
				title: "学员姓名",
				key: "student_name",
				align: "center",
				width: 100
			},
			{
				title: "注册手机",
				key: "mobile",
				align: "center",
				width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				width: 100
			},
			{
				title: "科目",
				key: "subject",
				align: "center",
				width: 100
			},
			{
				title: "购买课程",
				key: "course_name",
				align: "center",
				width: 180
			},
			{
				title: "班级类型",
				key: "class_type",
				align: "center",
				width: 100
			},
			{
				title: "课节进度",
				key: "classSchedule",
				align: "center",
				width: 100
			},
			{
				title: "开课日期",
				key: "start_date",
				align: "center",
				width: 140
			},
			{
				title: "主讲老师",
				key: "lecturer",
				align: "center",
				width: 100
			},
			{
				title: "上次跟进时间",
				key: "last_return_visit_time",
				align: "center",
				width: 140
			},
			{
				title: "上次跟进内容",
				key: "content_of_last_return_visit",
				align: "center",
				width: 180
			},
			{
				title: "交易时间",
				key: "pay_time",
				align: "center",
				width: 140
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				fixed: 'right',
				width: 200,
				render: (h, params) => {
					return h("div", [
						h(
							"LearningReport",
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
						h(
							"StudentsFollowUp",
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
						h(
							"CallOut",
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
			}
		],
		data: []
	},
	mutations: {
		// 写方法
		setData(state, data) {
			state.data = data
		}
	},
	actions: {
	},
	modules: {
	}
})
