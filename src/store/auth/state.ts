import type { AuthUser } from 'src/types/auth'

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: AuthUser | null
  availableRoles: string[]
}

export default (): AuthState => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  availableRoles: ['admin', 'user'],
})
