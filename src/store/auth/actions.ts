import type { ActionTree } from 'vuex'
import type { AppState } from '..'
import type { AuthState } from './state'
import { AuthService } from 'src/services/auth.service'
import type { RegistrationRequest } from 'src/services/auth.service'
import type { AxiosError } from 'axios'

const actions: ActionTree<AuthState, AppState> = {
  async register({ commit }, userData: RegistrationRequest) {
    try {
      const response = await AuthService.register(userData)

      commit('SET_TOKEN', {
        token: response.token,
        refreshToken: response.refreshToken,
      })

      commit('SET_USER', response.user)

      // Si el backend envía roles disponibles (ej: en primera registro)
      if (response.availableRoles) {
        commit('SET_AVAILABLE_ROLES', response.availableRoles)
      }

      return Promise.resolve(response)
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string
        errors?: Record<string, string[]>
      }>

      let errorMessage = 'Error al registrar usuario'

      // Manejo detallado de errores del backend
      if (axiosError.response?.data?.errors) {
        errorMessage = Object.values(axiosError.response.data.errors).flat().join(', ')
      } else if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message
      }

      return Promise.reject(new Error(errorMessage))
    }
  },
  /*   async login({ commit }, credentials) {
    const data = await AuthService.login(credentials)
    commit('SET_TOKEN', data)
  }, */

  tokenRefresh({ commit }, tokens: { token: string; refreshToken: string }) {
    commit('SET_TOKEN', {
      token: tokens.token,
      refreshToken: tokens.refreshToken,
    })
  },

  logout({ commit }) {
    commit('CLEAR_DATA')
  },
}

export default actions
