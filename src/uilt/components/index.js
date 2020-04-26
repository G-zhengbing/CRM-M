/**
 * 全局注册组件
 */

import select from './select'
import table from './table'
import paging from './paging'
import loading from '@/uilt/loading/loading'
import learningReport from './learningReport'
import studentsFollowUp from './studentsFollowUp'
import stateOfCourse from './stateOfCourse'
import newCourse from './newCourse'
import stateSelection from './stateSelection'
import allocation from './allocation'
import signin from './signin'
import cancelreservation from './cancelreservation'
import callOut from './callOut'
import newLecturer from './newLecturer'
import audition from './audition'
import referral from './referral'
import appraisal from './appraisal'
import createdOrder from './createdOrder'
import newReport from './learningReport/newReport'
import BreadCrumb from './bread-crumb'

export default {
	install(Vue) {
		// 全局注册
		Vue.component('SelectBox', select); // 搜索
		Vue.component('TableBox', table); // 表格
		Vue.component('PagingBox', paging); // 页码
		Vue.component('Loading', loading); // loading
		Vue.component('LearningReport', learningReport); // 学情报告
		Vue.component('StudentsFollowUp', studentsFollowUp); // 学员跟进
		Vue.component('StateOfCourse', stateOfCourse); // 课程状态
		Vue.component('NewCourse', newCourse); //  新建课程
		Vue.component('StateSelection', stateSelection); // 作业，到课状态，按钮
		Vue.component('Allocation', allocation); // 分配
		Vue.component('Signin', signin); // 签到按钮
		Vue.component('Cancelreservation', cancelreservation); // 取消预约
		Vue.component('CallOut', callOut); // 呼出
		Vue.component('NewLecturer', newLecturer); // 新建讲师
		Vue.component('Audition', audition); // 试听
		Vue.component('Referral', referral); // 转介绍
		Vue.component('Appraisal', appraisal); // 查看测评
		Vue.component('CreatedOrder', createdOrder); // 订单
		Vue.component('NewReport', newReport); // 订单
		Vue.component('bread-crumb', BreadCrumb); // 面包屑
	}
}