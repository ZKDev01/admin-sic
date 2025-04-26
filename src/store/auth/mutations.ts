import type { AuthState } from './state'
import type { MutationTree } from 'vuex'
import { AuthService } from 'src/services/auth.service'

const mutation: MutationTree<AuthState> = {
  SET_TOKEN(state, credentials: { token: string; tokenRefresh: string }) {
    state.accessToken = credentials.token
    state.tokenRefresh = credentials.tokenRefresh
    AuthService.setTokens(credentials.token, credentials.tokenRefresh)
  },

  CLEAR_DATA(state) {
    state.accessToken = null
    state.tokenRefresh = null
    AuthService.removeTokens()
  },
}

export default mutation
