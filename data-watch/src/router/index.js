import Vue from 'vue'
import VueRouter from 'vue-router'
import RelatorioView from '../views/Relatorio.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/relatorio',
    name: 'Relatorio',
    component: RelatorioView,
    meta: {
      authRequired: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
      if (!store.state.currentUser) {
          next({ name: 'Login' })
      } else {
          next()
      }
  } else {
      next()
  }
})

export default router
