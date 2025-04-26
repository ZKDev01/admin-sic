import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { ACCESS_TOKEN } from 'src/services/auth.service'

const router = createRouter({
  history: createWebHistory(process.env.VUE_ROUTER_BASE), // Usa la base desde Quasar
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }), // Corrección para Vue 3
})

// Middleware para autenticación antes de cada ruta
router.beforeEach((to, from, next) => {
  const tok = localStorage.getItem(ACCESS_TOKEN)
  const loggedIn = tok !== 'null' && tok

  if (!to.meta?.free && !loggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
