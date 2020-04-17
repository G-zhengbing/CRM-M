import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 存数据
		// 班课待分配
		columns1: [
			{
				type: "selection",
				width: 60,
				align: "center",
			},
			{
				title: "学员姓名",
				key: "accounts_student_name",
				align: "center",
				width: 100
			},
			{
				title: "注册手机",
				key: "accounts_mobile",
				align: "center",
				width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				width: 80
			},
			{
				title: "科目",
				key: "subject",
				align: "center",
				width: 80
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
				title: "课节数",
				key: "class_hour",
				align: "center",
				width: 100
			},
			{
				title: "开课日期",
				key: "start_date",
				align: "center",
				width: 120
			},
			{
				title: "主讲老师",
				key: "lecturer",
				align: "center",
				width: 100
			},
			{
				title: "签约人",
				key: "sale_login_name",
				align: "center",
				width: 100
			},
			{
				title: "实收",
				key: "pay_amount",
				align: "center",
				width: 100
			},
			{
				title: "订单编号",
				key: "order_sn",
				align: "center",
				width: 200
			},
			{
				title: "交易时间",
				key: "pay_time",
				align: "center",
				width: 120
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				fixed: 'right',
				width: 180,
				render: (h, params) => {
					let _this = this
					return h("div", [
						h(
							"Allocation",
							{
								props: {
									type: "text",
									size: "small",
									userIndex: params.index
								},
								style: {
									display: "inline",
									padding: '4px'
								},
								on: {
									refresh: function () {
										_this.a.commit('setRefreshs', true)
									}
								}
							},
						),
					]);
				}
			}
		],
		// 分配是否刷新信息
		refreshs: false,
		// 班课已分配
		columns2: [
			{
				type: "selection",
				width: 60,
				align: "center",
			},
			{
				title: "学员姓名",
				key: "accounts_student_name",
				align: "center",
				width: 100
			},
			{
				title: "注册手机",
				key: "accounts_mobile",
				align: "center",
				width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				width: 80
			},
			{
				title: "科目",
				key: "subject",
				align: "center",
				width: 80
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
				title: "课节数",
				key: "class_hour",
				align: "center",
				width: 100
			},
			{
				title: "开课日期",
				key: "start_date",
				align: "center",
				width: 120
			},
			{
				title: "主讲老师",
				key: "lecturer",
				align: "center",
				width: 100
			},
			{
				title: "签约人",
				key: "sale_login_name",
				align: "center",
				width: 100
			},
			{
				title: "实收",
				key: "pay_amount",
				align: "center",
				width: 100
			},
			{
				title: "班主任",
				key: "teacher_login_name",
				align: "center",
				width: 100
			},
			{
				type: "html",
				title: "首电呼出情况",
				key: "dial_up_situation",
				align: "center",
				width: 100
			},
			{
				title: "订单编号",
				key: "order_sn",
				align: "center",
				width: 200
			},
			{
				title: "交易时间",
				key: "pay_time",
				align: "center",
				width: 180
			},
			{
				title: "分配时间",
				key: "create_time",
				align: "center",
				width: 180
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				fixed: 'right',
				width: 220,
				render: (h, params) => {
					let _this = this
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
							"Allocation",
							{
								props: {
									type: "text",
									size: "small",
									userIndex: params.index
								},
								style: {
									display: "inline",
									padding: '4px'
								},
								on: {
									refresh: function () {
										_this.a.commit('setRefreshs', true)
									}
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
		// 一对一待分配
		columns3: [
			{
				type: "selection",
				width: 60,
				align: "center"
			},
			{
				title: "学员姓名",
				key: "accounts_student_name",
				align: "center",
				width: 100
			},
			{
				title: "注册手机",
				key: "accounts_mobile",
				align: "center",
				width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				width: 80
			},
			{
				title: "科目",
				key: "subject",
				align: "center",
				width: 80
			},
			{
				title: "购买课程",
				key: "course_name",
				align: "center",
				width: 180
			},
			{
				title: "总课时",
				key: "TotalClassTime",
				align: "center",
				width: 100
			},
			{
				title: "开课日期",
				key: "start_date",
				align: "center",
				width: 120
			},
			{
				title: "签约人",
				key: "sale_login_name",
				align: "center",
				width: 100
			},
			{
				title: "实收",
				key: "pay_amount",
				align: "center",
				width: 100
			},
			{
				title: "订单编号",
				key: "order_sn",
				align: "center",
				width: 200
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
				align: "center",
				fixed: 'right',
				width: 180,
				render: (h, params) => {
					let _this = this
					return h("div", [
						h(
							"Allocation",
							{
								props: {
									type: "text",
									size: "small",
									userIndex: params.index
								},
								style: {
									display: "inline",
									padding: '4px'
								},
								on: {
									refresh: function () {
										_this.a.commit('setRefreshs', true)
									}
								}
							},
						),
					]);
				}
			}
		],
		// 一对一已分配
		columns4: [
			{
				type: "selection",
				width: 60,
				align: "center"
			},
			{
				title: "学员姓名",
				key: "accounts_student_name",
				align: "center",
				width: 100
			},
			{
				title: "注册手机",
				key: "accounts_mobile",
				align: "center",
				width: 140
			},
			{
				title: "年级",
				key: "grade",
				align: "center",
				width: 80
			},
			{
				title: "科目",
				key: "subject",
				align: "center",
				width: 80
			},
			{
				title: "购买课程",
				key: "course_name",
				align: "center",
				width: 140
			},
			{
				title: "总课时",
				key: "TotalClassTime",
				align: "center",
				width: 100
			},
			{
				title: "开课日期",
				key: "start_date",
				align: "center",
				width: 120
			},
			{
				title: "签约人",
				key: "sale_login_name",
				align: "center",
				width: 100
			},
			{
				title: "实收",
				key: "pay_amount",
				align: "center",
				width: 100
			},
			{
				title: "班主任",
				key: "teacher_login_name",
				align: "center",
				width: 100
			},
			{
				type: "html",
				title: "首电呼出情况",
				key: "dial_up_situation",
				align: "center",
				width: 100
			},
			{
				title: "订单编号",
				key: "order_sn",
				align: "center",
				width: 200
			},
			{
				title: "交易时间",
				key: "pay_time",
				align: "center",
				width: 180
			},
			{
				title: "分配时间",
				key: "create_time",
				align: "center",
				width: 180
			},
			{
				title: "操作",
				key: "operation",
				align: "center",
				fixed: 'right',
				width: 220,
				render: (h, params) => {
					let _this = this
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
							"Allocation",
							{
								props: {
									type: "text",
									size: "small",
									userIndex: params.index
								},
								style: {
									display: "inline",
									padding: '4px'
								},
								on: {
									refresh: function () {
										console.log(_this)
										_this.a.commit('setRefreshs', true)
									}
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

		data: [
		],
	},
	mutations: {
		// 写方法
		setData(state, data) {
			state.data = data
		},
		setRefreshs(state, data) {
			state.refreshs = data
		}
	},
	actions: {
		// callState(context) {
		// 	context.commit('callState')
		// }
	},
	modules: {
	},
	// 过滤器
	getters: {
	}
})
