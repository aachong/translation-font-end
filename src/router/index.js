import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/infotranslator',
    name: 'InfoTranslator',
    component: () => import('../views/InfoTranslator.vue')
  },
  {
    path: '/infouser',
    name: 'InfoUser',
    component: () => import('../views/InfoUser.vue')
  },
  {
    path: '/moneyt',
    name: 'MoneyT',
    component: () => import('../views/MoneyT.vue')
  },
  {
    path: '/moneyu',
    name: 'MoneyU',
    component: () => import('../views/MoneyU.vue')
  },
  {
    path: '/ordert',
    name: 'OrderT',
    component: () => import('../views/OrderT.vue')
  },
  {
    path: '/orderu',
    name: 'OrderU',
    component: () => import('../views/OrderU.vue')
  },
  {
    path: '/ordercu',
    name: 'OrderCU',
    component: () => import('../views/OrderCU.vue')
  },
  {
    path: '/orderct',
    name: 'OrderCT',
    component: () => import('../views/OrderCT.vue')
  },
  {
    path: '/orderlt',
    name: 'OrderLT',
    component: () => import('../views/OrderLT.vue')
  },
  {
    path: '/topic',
    name: 'Topic',
    component: () => import('../views/Topic.vue')
  },
  {
    path: '/translation',
    name: 'Translation',
    component: () => import('../views/Translation.vue')
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('../views/Vip.vue')
  },
  {
    path: '/signuser',
    name: 'SignUser',
    component: () => import('../views/SignUser.vue'),
    children:[
      {
        path:'in',
        component: () => import('../components/SignInUser.vue'),
      },
      {
        path:'up',
        component: () => import('../components/SignUpUser.vue'),
      },
      {
        path:'int',
        component: () => import('../components/SignInTranslator.vue'),
      },
      {
        path:'upt',
        component: () => import('../components/SignUpTranslator.vue'),
      },
    ]
  },
  {
    path: '/signtranslator',
    name: 'SignTranslator',
    component: () => import('../views/SignTranslator.vue'),
    
  },
]

const router = new VueRouter({
  routes
})

export default router
