import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profiler',
      name: 'profiler',
      component: () => import(/* webpackChunkName: "profiler" */ '../views/Profiler.vue')
    },
    {
      path: '/readme',
      name: 'readme',
      // route level code-splitting
      // this generates a separate chunk (readme.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "readme" */ '../views/Readme.vue')
    }
  ]
})
