import { createStore } from 'vuex' // <-- Usar createStore directo
import type { AuthState } from './auth'
import auth from './auth'

export interface AppState {
  auth: AuthState
}

const store = createStore<AppState>({
  modules: {
    auth,
  },
  strict: !!process.env.DEBUGGING,
})

export default store
