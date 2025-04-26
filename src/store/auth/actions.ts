import type { ActionTree } from 'vuex'
import type { AppState } from '..'
import type { AuthState } from './state'
import { AuthService } from 'src/services/auth.service'

const actions: ActionTree<AuthState, AppState> = {
  async login({ commit }, credentials) {
    const data = await AuthService.login(credentials)
    commit('SET_TOKEN', data)
  },

  tokenRefreshs({ commit }, tokens: { token: string; tokenRefresh: string }) {
    commit('SET_TOKEN', tokens)
  },

  logout({ commit }) {
    commit('CLEAR_DATA')
  },
}

export default actions
