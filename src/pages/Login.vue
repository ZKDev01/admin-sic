<template>
  <q-page>
    <div class="row items-center justify-center window-height window-width">
      <div class="col-md-4 col">
        <q-card
          :class="{
            'window-height': $q.screen.lt.md,
            'window-width': $q.screen.lt.md,
          }"
        >
          <q-card-section class="text-h3 row justify-center text-center text-grey-14">
            Sitio de Administración
          </q-card-section>
          <q-card-section class="row justify-center">
            <q-img src="imgs/logo.png" style="width: 60%" />
          </q-card-section>
          <q-card-section>
            <q-form @submit="onLogin" class="q-gutter-md">
              <q-input outlined v-model="username" label="Correo:" lazy-rules :rules="[]" />
              <q-input
                outlined
                :type="passwordVisibility ? 'text' : 'password'"
                v-model="password"
                label="Contraseña:"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Este campo no puede estar en blanco',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="passwordVisibility ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    color="blue-9"
                    @click="passwordVisibility = !passwordVisibility"
                  />
                </template>
              </q-input>
              <q-card-actions>
                <q-btn
                  class="full-width"
                  label="INICIAR SESIÓN"
                  type="submit"
                  size="lg"
                  color="primary"
                  :loading="loading"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const store = useStore()
    const username = ref('')
    const password = ref('')
    const passwordVisibility = ref(false)
    const loading = ref(false)

    const onLogin = async () => {
      loading.value = true
      try {
        await store.dispatch('login', {
          user: username.value,
          password: password.value,
        })

        // Comprobar el rol después de login
        const role = store.getters['role']
        if (role === 'admin') {
          // Redirigir al dashboard u otra página
          window.location.href = '/dashboard'
        } else {
          throw new Error('user')
        }
      } catch (error) {
        let msg = 'Error'
        if (error.message === 'user') {
          msg = 'Credenciales inválidas'
        } else {
          msg = 'Ha ocurrido un error inesperado'
        }
        store.dispatch('showNotification', msg)
        loading.value = false
      }
    }

    return { onLogin, username, password, passwordVisibility, loading }
  },
})
</script>
