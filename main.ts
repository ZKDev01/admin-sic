import { createApp } from 'vue'
import { Quasar } from 'quasar'
import store from 'src/store' // ✅ Asegúrate de que esta importación es correcta
import router from 'src/router' // ✅ Asegúrate de que esta importación es correcta
import App from 'src/App.vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Quasar)
app.mount('#app')
