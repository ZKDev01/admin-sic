import type { Store } from 'vuex'
import type { AppState } from './store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<AppState>
  }
}
