import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Erweima from '../components/Erweima.vue'
import Daiban from '../components/home/Daiban'
import NotVisit from '../components/NotVisit'
import Public from '../components/Public'
import FollowUp from '../components/FollowUp'
import Money from '../components/Money'
import NotCallBack from '../components/NotCallBack'
import Studentpay from '../components/minecllient/Studentpay.vue'
import Mineclient from '../components/minecllient/Mineclient.vue'
import Mineclientcopy from '../components/minecllient/Mineclientcopy.vue'
import Notification from '../components/minecllient/Notification.vue'
import Reserved from '../components/reserved/Reserved.vue'
import Teacher from '../components/teachering/Teacher.vue'
import Statistics from '../components/Statistics'
import Importdata from '../components/minecllient/Importdata.vue'
import Importorder from '../components/minecllient/Importorder.vue'
import Scheduteachers from '../components/scheduling/Scheduteachers.vue'
import storage from '../uilt/storage'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: ()=>import('../components/entrancefile/login/index.vue')
    },
    {
      path: '/forget',
      component: ()=>import('../components/entrancefile/login/Forget.vue')
    },
    {
      path: '/succeed',
      component: ()=>import('../components/entrancefile/login/Succeed.vue')
    },
    {
      path: '/main',
      component: ()=>import('../components/entrancefile/main/index.vue'),
      children: [
        {
          path: '/main/template',
          component: ()=>import('../components/template/index.vue')
        },
        {
          path: '/main/bookcode',
          component: ()=>import('../components/Mzhan/bookcoed/index.vue')
        },
        {
          path: '/main/special',
          component: ()=>import('../components/Mzhan/Special/index.vue')
        },
        {
          path: '/main/databank',
          component: ()=>import('../components/Mzhan/databank/index.vue')
        },
        {
          path: '/main/curriculum',
          component: ()=>import('../components/Mzhan/curriculum/index.vue')
        },
        {
          path: '/main/advertising',
          component:()=>import('../components/Mzhan/Advertising/index.vue')
        },
        {
          path: '/main',
          redirect: '/main/home'
        },
        {
          path: '/main/home',
          component: Home,
        },
        {
          path: '/main/erweima',
          component: Erweima
        },
        {
          path: '/main/daiban',
          component: Daiban
        },
        {
          path: '/main/notvisit',
          component: NotVisit
        },
        {
          path: '/main/public',
          component: Public
        },
        {
          path: '/main/followup',
          component: FollowUp
        },
        {
          path: '/main/money',
          component: Money
        },
        {
          path: '/main/notcallback',
          component: NotCallBack
        },
        {
          path: '/main/studentpay',
          component: Studentpay
        },
        {
          path: '/main/mineclient',
          component: Mineclient
        },
        {
          path: '/main/mineclientcopy',
          component: Mineclientcopy
        },
        {
          path: '/main/notification',
          component: Notification
        },
        {
          path: '/main/reserved',
          component: Reserved
        },
        {
          path: '/main/teacher',
          component: Teacher
        },
        {
          path: '/main/statistics',
          component: Statistics
        },
        {
          path: '/main/importdata',
          component: Importdata
        },
        {
          path: '/main/importorder',
          component: Importorder
        },
        {
          path: '/main/scheducourse',
          component: ()=>import('../components/scheduling/scheducourse/index.vue')
        },
        {
          path: '/main/schedulessons',
          component: ()=>import('../components/scheduling/schedulessons/index.vue')
        },
        {
          path: '/main/schedustudent',
          component: ()=>import('../components/scheduling/schedustudent/index.vue')
        },
        {
          path: '/main/scheduteachers',
          component: Scheduteachers
        },

        // M站管理
        {
          path: '/main/inbookcode', // 书内一书一码
          component: () => import('@/components/Mzhan/inBookCode')
        },

        // 教务
        {
          path: '/main/classstudents', // 班课学员
          component: () => import('@/components/teacher/ClassStudents')
        },
        {
          path: '/main/inclass', // 开课中学员
          component: () => import('@/components/teacher/InClass')
        },
        {
          path: '/main/myreservation', // 我的预约单
          component: () => import('@/components/teacher/MyReservation')
        },
        {
          path: '/main/payingstudents', // 付费学员
          component: () => import('@/components/teacher/PayingStudent/index')
        },
        {
          path: '/main/course', // 课程
          component: () => import('@/components/teacher/course')
        },
        {
          path: '/main/oneononestudent', // 一对一学员
          component: () => import('@/components/teacher/OneOnOneStudent')
        },
        {
          path: '/main/statisticAnalysis', // 统计分析
          component: () => import('@/components/teacher/StatisticAnalysis')
        },
        // { <!-- 后台无数据，无法验证完善，待更改 -->
        //   path: '/main/oneinclass', // 开课中学员
        //   component: () => import('@/components/teacher/OneInClass')
        // },
        {
          path: '/main/onemyreservation', // 我的预约单
          component: () => import('@/components/teacher/OneMyReservation')
        },

        // 设置
        {
          path: '/main/departments', // 部门和用户
          component: () => import('@/components/setup/Departments')
        },
        {
          path: '/main/jurisdiction', // 角色和权限
          component: () => import('@/components/setup/Jurisdiction')
        },
        {
          path: '/main/weightallocation', // 权重分配
          component: () => import('@/components/setup/weightAllocation')
        },
        {
          path: '/main/smsset', // 信息设置
          component: () => import('@/components/setup/smsSet')
        },
        {
          path: '/main/smsallot', // 信息分配
          component: () => import('@/components/setup/smsAllot')
        },
        {
          path: '/main/smsMarketing', // 信息分配
          component: () => import('@/components/setup/SMS-Marketing')
        },

        // 营销
        {
          path: '/main/channelcode', // 营销,公众号,渠道码
          component: () => import('@/components/Marketing/PublicMark/ChannelCode')
        },
        {
          path: '/main/smsrecord', // 营销,短信记录
          component: () => import('@/components/Marketing/sms-record')
        },
        {
          path: '/main/pageanalysis', // 数据，流量分析，页面分析
          component: () => import('@/components/data/flowAnalysis/pageAnalysis')
        },
      ]
    }
  ]
})

router.beforeEach((to, form, next) => {
  var arr = ['/', '/forget', '/succeed']
  if (arr.includes(to.path)) {
    next()
  } else if (JSON.stringify(storage.get()) == '{}') {
    next('/')
  } else {
    next()
  }
})

export default router
