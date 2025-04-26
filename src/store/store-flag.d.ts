import Vuex from 'vuex'
import auth from './auth'
import type { AuthState } from './auth/state'
import Vue from 'vue'

export interface AppState {
  auth: AuthState
}

Vue.use(Vuex)

const store = new Vuex.Store<AppState>({
  modules: {
    auth,
  },
  strict: !!process.env.DEBUGGING,
})

export default store
