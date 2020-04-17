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
				title: "总课时",
				key: "totalClassTime",
				align: "center",
				width: 100
			},
			{
				title: "已消耗课时",
				key: "course_rate_of_progress",
				align: "center",
				width: 120
			},
			{
				title: "剩余课时",
				key: "restOfClass",
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
				title: "实收",
				key: "pay_amount",
				align: "center",
				width: 100
			},
			{
				type: "html",
				title: "首电呼出情况",
				key: "dial_up_situation",
				align: "center",
				width: 160,
				sortable: true,
				sortType: 'desc', // 排序，反排
			},
			{
				title: "交接单",
				key: "reception_state",
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
				title: "操作",
				key: "operation",
				fixed: 'right',
				align: "center",
				width: 180,
				render: (h, params) => {
					return h("div", [
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
				title: "总课时",
				key: "totalClassTime",
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
				title: "实收",
				key: "pay_amount",
				align: "center",
				width: 100
			},
			{
				type: "html",
				title: "首电呼出情况",
				key: "dial_up_situation",
				align: "center",
				width: 140
			},
			{
				title: "交接单",
				key: "reception_state",
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
				title: "操作",
				key: "operation",
				fixed: 'right',
				align: "center",
				width: 180,
				render: (h, params) => {
					return h("div", [
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
					]);
				}
			}
		],
		data1: [
		],
		data2: [
		],
		data3: [
		]
	},
	mutations: {
		// 写方法
	},
	actions: {

	},
	modules: {
	}
})
