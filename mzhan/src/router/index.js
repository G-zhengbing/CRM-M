import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Databank from '@/components/Databank'
import Personage from '@/components/Personage'
import PersonageData from '@/components/PersonageData'
import Course from '@/components/Course'
import SmallClass from '@/components/SmallClass'
import Order from '@/components/Order'
import Special from '@/components/Special'
import Login from '@/components/Login'
import Classify from '@/components/Classify'
import Data from '@/components/Data'
import Signin from '@/components/Signin'
import Address from '../components/address/Address'
import Addsite from '../components/address/Addsite'
import Databanklist from '../components/Databanklist'
import Bookcode from '../components/book/Bookcode'
import BookList from '../components/book/BookList'
import Bookdetails from '../components/book/Bookdetails'
import callback from '../components/callback/callback.vue'
import payGateWay from '../uilt/pay/payGateWay.vue'
import Seclcen from '../components/seleclasscenter/Seclcen.vue'
import storage from '../uilt/storage'
import axios from 'axios'
import store from '../store/index'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login/:type/:uid',
      name: 'login',
      component: Login
    },
    {
      path: '/signin/:id',
      name: 'Signin',
      component: Signin
    },
    {
      path: "/home",
      component: Home
    },
    {
      path:"/callback/:id",
      component:callback
    },
    {
      path: "/home/databank/:id",
      component: Databank
    },
    {
      path: "/personage",
      component: Personage
    },
    {
      path: "/course",
      component: Course
    },
    {
      path: "/smallclass",
      component: SmallClass
    },
    {
      path: "/personagedata",
      component: PersonageData
    },
    {
      path: "/order/:id",
      name: 'Order',
      component: Order
    },
    {
      path: "/special",
      component: Special
    },
    {
      path: "/login",
      name: 'Login',
      component: Login
    },
    {
      path: "/classify",
      component: Classify
    },
    {
      path: "/data",
      component: Data
    },
    {
      path: "/address",
      name: "Address",
      component: Address
    },
    {
      path: "/addsite",
      name: "Addsite",
      component: Addsite
    },
    {
      path: "/data/databanklist/:id",
      name: "Databanklist",
      component: Databanklist
    },
    {
      path: "/bookcode/:id",
      name: "Bookcode",
      component: Bookcode
    },
    {
      path: "/booklist/:id",
      name: "BookList",
      component: BookList
    },
    {
      path: "/bookdetails/:id/:type",
      name: "Bookdetails",
      component: Bookdetails
    },
    {
      path:'/paygateway',
      component:payGateWay
    },
    {
      path:'/seclcen',
      component:Seclcen
    }
  ]
})
// router.beforeEach((to, form, next) => {
//   var arr = ['/login']
//   if (arr.includes(to.path) || JSON.stringify(storage.getToken()) != '{}') {
//     next()
//     return
//   } else {
//     return next('/login')
//   }
// })
export default router
