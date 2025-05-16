import { boot } from 'quasar/wrappers'
import store from 'src/store' // Asegúrate de que esta ruta sea correcta

export default boot(({ app }) => {
  app.use(store) // Registra Vuex en la app
})
