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
				title: "试听类型",
				key: "type",
				align: "center",
				width: 100
			},
			{
				title: "试听课程",
				key: "course_name",
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
				title: "教师",
				key: "name",
				align: "center",
				width: 100
			},
			{
				title: "上课日期",
				key: "date_time",
				align: "center",
				sortable: true,
				sortType: "asc",
				width: 140
			},
			{
				title: "上课时段",
				key: "time_slot",
				align: "center",
				width: 140
			},
			{
				type: "html",
				title: "状态",
				key: "appoint_status",
				align: "center",
				width: 120
			},
			{
				title: "预约提交时间",
				key: "create_time",
				align: "center",
				width: 180
			},
			{
				title: "备注",
				key: "note",
				align: "center",
				width: 140
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				fixed: 'right',
				width: 240,
				render: (h, params) => {
					return h("div", [
						h(
							"Signin",
							{
								props: {
									type: "text",
									size: "small",
									userIndex: params.index
								},
								style: {
									display: "inline",
									padding: '4px',
								}
							},
						),
						h(
							"Appraisal",
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
							"Cancelreservation",
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
				title: "试听类型",
				key: "type",
				align: "center",
				width: 100
			},
			{
				title: "试听课程",
				key: "course_name",
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
				title: "教师",
				key: "name",
				align: "center",
				width: 100
			},
			{
				title: "上课日期",
				key: "date_time",
				align: "center",
				sortable: true,
				sortType: "asc",
				width: 140
			},
			{
				title: "上课时段",
				key: "time_slot",
				align: "center",
				width: 140
			},
			{
				type: "html",
				title: "状态",
				key: "appoint_status",
				align: "center",
				width: 120
			},
			{
				title: "预约提交时间",
				key: "create_time",
				align: "center",
				width: 180
			},
			{
				title: "备注",
				key: "note",
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
							"Appraisal",
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
		data: [
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
