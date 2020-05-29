import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Login from '../components/login/Login.vue'
import Forget from '../components/login/Forget.vue'
import Succeed from '../components/login/Succeed.vue'
import Main from '../components/Main.vue'
import Home from '../components/Home.vue'
import Erweima from '../components/Erweima.vue'
import Daiban from '../components/home/Daiban'
import NotVisit from '../components/NotVisit'
import Public from '../components/Public'
import FollowUp from '../components/FollowUp'
import Money from '../components/Money'
import Number from '../components/Number'
// import Minestudent from '../components/teacher/Minestudent'
// import Payingstudent from '../components/teacher/Payingstudent'
// import StatisticAnalysis from '../components/teacher/StatisticAnalysis'
import Paystudent from '../components/Paystudent'
import NotCallBack from '../components/NotCallBack'
import Advertising from '../components/Mzhan/Advertising'
import Curriculum from '../components/Mzhan/Curriculum'
import Databank from '../components/Mzhan/Databank'
import Special from '../components/Mzhan/Special'
import Bookcode from '../components/Mzhan/Bookcode'
import Studentpay from '../components/minecllient/Studentpay.vue'
import Mineclient from '../components/minecllient/Mineclient.vue'
import Mineclientcopy from '../components/minecllient/Mineclientcopy.vue'
import Notification from '../components/minecllient/Notification.vue'
import Reserved from '../components/reserved/Reserved.vue'
import Allreserved from '../components/reserved/Allreserved.vue'
import Teacher from '../components/teachering/Teacher.vue'
import Statistics from '../components/Statistics'
import Importdata from '../components/minecllient/Importdata.vue'
import Importorder from '../components/minecllient/Importorder.vue'
import Timeblock from '../uilt/timeblock/Timeblock.vue'
import Scheducourse from '../components/scheduling/scheducourse/Scheducourse.vue'
import Schedulessons from '../components/scheduling/schedulessons/Schedulessons.vue'
import Schedustudent from '../components/scheduling/schedustudent/Schedustudent.vue'
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
      component: Login
    },
    {
      path: '/forget',
      component: Forget
    },
    {
      path: '/succeed',
      component: Succeed
    },
    {
      path: '/main',
      component: Main,
      children: [{
          path: '/main/bookcode',
          component: Bookcode
        },
        {
          path: '/main/special',
          component: Special
        },
        {
          path: '/main/databank',
          component: Databank
        },
        {
          path: '/main/curriculum',
          component: Curriculum
        },
        {
          path: '/main/advertising',
          component: Advertising
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
          path: '/main/number',
          component: Number
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
          path: '/main/paystudent',
          component: Paystudent
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
          path: '/main/allreserved',
          component: Allreserved
        },
        {
          path: '/main/statistics',
          component: Statistics
        },
        {
          path: '/main/timeblock',
          component: Timeblock
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
          component: Scheducourse
        },
        {
          path: '/main/schedulessons',
          component: Schedulessons
        },
        {
          path: '/main/schedustudent',
          component: Schedustudent
        },
        {
          path: '/main/scheduteachers',
          component: Scheduteachers
        },
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
        {
          path: '/main/departments', // 部门和用户
          component: () => import('@/components/setup/Departments')
        },
        {
          path: '/main/jurisdiction', // 角色和权限
          component: () => import('@/components/setup/Jurisdiction')
        },

        {
          path: '/main/channelcode', // 营销,公众号,渠道码
          component: () => import('@/components/Marketing/PublicMark/ChannelCode')
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
