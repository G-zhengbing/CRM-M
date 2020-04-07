import Vue from 'vue'
import Router from 'vue-router'
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
import Uplist from '../components/Uplist'
import Minestudent from '../components/teacher/Minestudent'
import Payingstudent from '../components/teacher/Payingstudent'
import Paystudent from '../components/Paystudent'
import NotCallBack from '../components/NotCallBack'
import Advertising from '../components/Mzhan/Advertising'
import Curriculum from '../components/Mzhan/Curriculum'
import Databank from '../components/Mzhan/Databank'
import Special from '../components/Mzhan/Special'
import Bookcode from '../components/Mzhan/Bookcode'
import Reservation from '../components/Reservation'
import Thread from '../components/Thread'
import Studentpay from '../components/minecllient/Studentpay.vue'
import Mineclient from '../components/minecllient/Mineclient.vue'
import Notification from '../components/minecllient/Notification.vue'
import Reserved from '../components/reserved/Reserved.vue'
import Allreserved from '../components/reserved/Allreserved.vue'
import Teacher from '../components/teachering/Teacher.vue'
import Statistics from '../components/Statistics'
 
import storage from '../uilt/storage'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
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
      children: [
        {
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
          path: '/main/uplist',
          component: Uplist
        },
        {
          path: '/main/minestudent',
          component: Minestudent
        },
        {
          path: '/main/payingstudent',
          component: Payingstudent
        },
        {
          path: '/main/reservation',
          component: Reservation
        },
        {
          path: '/main/thread',
          component: Thread
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
        }
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
