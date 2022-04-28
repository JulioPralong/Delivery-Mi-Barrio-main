import Vue from 'vue'
import VueRouter from 'vue-router'
import USERindex from '../views/USERindex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: USERindex
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/signIn.vue')
  },
  {
    path:'/login',
    name: 'login',
    component: () => import('../views/USERlogin.vue')
  },
  {
    path: '/misPedidos',
    name: 'USERpedidos',
    component: () => import('../views/USERmispedidos.vue')
  },
  {
    path: '/registroNegocio',
    name: 'RegistroNegocio',
    component: () => import('../views/registronegocio.vue')
  },
  {
    path: '/restaurant/:id',
    name: 'restaurant',
    component: () => import('../views/restaurant.vue')
  },
  {
    path: '/finalizarPedido',
    name: 'finalizarPedido',
    component: () => import('../views/USERfinalizarpedido.vue')
  },
  { 
     path: '/plato/:id',
     name: 'Plato',
     component: () => import('../views/plato.vue')
  },
  { 
     path: '/section/:id',
     name: 'Section',
     component: () => import('../views/section.vue')
  },
  { 
     path: '/soporte',
     name: 'Soporte',
     component: () => import('../views/soporte.vue')
  },
  { 
     path: '/search/:id',
     name: 'SearchFood',
     component: () => import('../views/searchFood.vue')
  },
  { 
     path: '/partnerIndex',
     name: 'partnerIndex',
     component: () => import('../views/PARTNERindex.vue')
  },
  { 
     path: '/PartnerAsks',
     name: 'PartnerAsks',
     component: () => import('../views/PARTNERasks.vue')
  },
  { 
     path: '/PartnerHistory',
     name: 'PartnerHistory',
     component: () => import('../views/PARTNERhistory.vue')
  },
  { 
     path: '/RiderIndex',
     name: 'RiderIndex',
     component: () => import('../views/RIDERindex.vue')
  },
  { 
     path: '/RiderAskInfo/:id',
     name: 'RiderAskInfo',
     component: () => import('../views/RIDERinfoproduct.vue')
  },
  { 
     path: '/RiderHistory',
     name: 'RiderHistory',
     component: () => import('../views/RIDERhistory.vue')
  },
  { 
     path: '/RiderProfit',
     name: 'RiderProfit',
     component: () => import('../views/RIDERprofit.vue')
  },
  { 
     path: '/RiderMyAsks',
     name: 'RiderMyAsks',
     component: () => import('../views/RIDERmyasks.vue')
  },
  { 
     path: '/PartnerLogin',
     name: 'PARTNERlogin',
     component: () => import('../views/PARTNERlogin.vue')
  },
  { 
     path: '/RiderLogin',
     name: 'LoginRider',
     component: () => import('../views/RIDERlogin.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
