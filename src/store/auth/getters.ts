import type { AppState } from 'src/store'
import type { AuthState } from './state'
import type { GetterTree } from 'vuex'
import { jwtDecode } from 'jwt-decode'
import { AuthService } from 'src/services/auth.service'

interface SicJwt {
  role: string
  ou: string
  isRefresh: boolean
  exp: number
  iat: number
  iss: string
}

const getters: GetterTree<AuthState, AppState> = {
  loggedIn: (state: AuthState): boolean => {
    return !!state.accessToken
  },

  tokenAccess: (state: AuthState): string | null => {
    return state.accessToken
  },

  tokenRefresh: (state: AuthState): string | null => state.tokenRefresh,

  role: (): string => {
    const localToken: string = AuthService.getAccessToken()

    let role = ''
    try {
      role = jwtDecode<SicJwt>(localToken).role
    } catch (error) {
      console.error('Error decoding token:', error)
      return ''
    }
    return role
  },

  availableRoles: (state): string[] => state.availableRoles,

  currentUser: (state): AuthState['user'] => state.user,
}

export default getters
