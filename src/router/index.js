import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes = [
  {
    path: '/',
    name: '/home',
    component: Home
  },
  {
    path: '/newdoc',
    name: 'Newdoc',
    component: () => import('@/views/newdoc.vue')
  },
  {
    path: '/editdoc',
    name: 'Editdoc',
    component: About
  },
  {
    path: '/deldoc',
    name: 'Deldoc',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }      
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  mode: 'hash',
  routes
})
export default router
