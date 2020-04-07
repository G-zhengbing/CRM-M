import Vue from 'vue'
import Router from 'vue-router'
import storage from '../uilt/storage'
import axios from 'axios'
import store from '../store/index'

const Home = ()=>import("@/components/Home")
const Databank = ()=>import("@/components/Databank")
const Personage = ()=>import("@/components/Personage")
const PersonageData = ()=>import("@/components/PersonageData")
const Course = ()=>import("@/components/Course")
const SmallClass = ()=>import("@/components/SmallClass")
const Order = ()=>import("@/components/Order")
const Special = ()=>import("@/components/Special")
const Login = ()=>import("@/components/Login")
const Classify = ()=>import("@/components/Classify")
const Data = ()=>import("@/components/Data")
const Signin = ()=>import("@/components/Signin")
const Address = ()=>import("@/components/address/Address")
const Addsite = ()=>import("@/components/address/Addsite")
const Databanklist = ()=>import("@/components/Databanklist")
const Bookcode = ()=>import("@/components/book/Bookcode")
const BookList = ()=>import("@/components/book/BookList")
const Bookdetails = ()=>import("@/components/book/Bookdetails")
const callback = ()=>import("@/components/callback/callback")
const payGateWay = ()=>import("../uilt/pay/payGateWay")
const Seclcen = ()=>import("@/components/seleclasscenter/Seclcen")
const PersonageList = ()=>import("@/components/PersonageList")

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
      path: '/signin/:type',
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
      path:'/personagelist',
      component:PersonageList
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
      path: "/bookdetails/:id",
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
