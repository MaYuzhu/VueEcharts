import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Page01 from '../page/page01'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page01',
      component: Page01
    }
  ]
})
