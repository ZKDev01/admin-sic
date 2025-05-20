import { createApp } from 'vue'
import { Quasar } from 'quasar'
import store from 'src/store'
import router from 'src/router'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Quasar)
app.mount('#app')
