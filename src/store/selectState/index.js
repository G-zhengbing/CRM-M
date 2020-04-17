export default {
	state: {
		// 存数据
		subject: {}, // 科目
		grade: {}, // 年级
		class_type: {}, // 班级类型
		classTeacher: {},// 班主任列表
		dial_up_situation: {},// 首电呼出情况
		reception_state: {}, // 交接单
		class_attendance: {}, // 本周到课情况
		delivery_of_work: {}, // 本周交作业情况
		type: {}, // 试听类型
		appoint_status: {}, // 状态
		appointBtn: {
			1: "<div class='state-forClass'>待上课</div>",
			2: "<div class='state-haveClass'>已上课</div>",
			3: "<div class='state-absent'>缺席</div>",
			4: "<div class='state-canceledCanc'>已取消</div>",
		}

	},
	mutations: {
		// 写方法
		// 判断首电是否完成 style 需调用
		setSelectState(state, data) {
			state.subject = data.subject || state.subject
			state.grade = data.grade || state.grade
			state.class_type = data.class_type || state.class_type
			state.classTeacher = data.classTeacher || state.classTeacher
			state.dial_up_situation = data.dial_up_situation || state.dial_up_situation
			state.reception_state = data.reception_state || state.reception_state
			state.class_attendance = data.class_attendance || state.class_attendance
			state.delivery_of_work = data.delivery_of_work || state.delivery_of_work
			state.type = data.course_type || state.type
			state.appoint_status = data.appoint_status || state.appoint_status
		},
	},
	actions: {
	},
	modules: {
	},
	// 过滤器
	getters: {
	}
}
