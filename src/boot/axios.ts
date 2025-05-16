import type { AxiosInstance } from 'axios'
import type { App } from 'vue'
import axios from 'axios'
import { boot } from 'quasar/wrappers'
import { API_ESOURECES } from 'src/services/api_resources'
import Router from 'src/router'
import store from 'src/store'

const axiosInstance = axios.create({
  baseURL: API_ESOURECES.BASE,
})

// Modificar el interceptor para acceder dinámicamente al store
axiosInstance.interceptors.request.use((config) => {
  const tokenAccess = store.getters['auth/tokenAccess'] as string // <-- Añadir type assertion
  console.log('Access token Inserted', tokenAccess)

  if (tokenAccess) {
    config.headers.Authorization = `Bearer ${tokenAccess}`
  }

  config.headers.Accept = 'application/json'
  config.headers['Content-Type'] = 'application/json'
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.request.status == 401) {
      try {
        const refreshRes = await axiosInstance.post('/auth/refresh', null, {
          params: {
            token: store.getters['auth/tokenRefresh'],
          },
        })

        if (refreshRes.status == 200) {
          await store.dispatch('auth/tokenRefreshs', {
            token: refreshRes.data.token,
            tokenRefresh: refreshRes.data.tokenRefresh,
          })
          return axiosInstance.request(error.config)
        }
      } catch {
        await store.dispatch('auth/logout')
        await Router.push({ name: 'Login' })
      }
    } else {
      return Promise.reject(new Error('Error message'))
    }
  },
)
declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default boot(({ app }: { app: App }) => {
  app.config.globalProperties.$axios = axiosInstance
})

export { axiosInstance }
