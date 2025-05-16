<template>
  <div class="row justify-center q-mt-md">
    <div class="col-12 col-md-6">
      <q-card>
        <div class="text-h6 q-pa-md">Modificando usuario</div>
        <q-separator class="q-my-md q-mx-md" />
        <div v-if="errorMsg" class="row justify-center text-negative text-h6">
          {{ errorMsg }}
        </div>
        <div v-if="userData && !userData.inSystem" class="row justify-center text-h6">
          El usuario no está en el sistema
        </div>
        <div v-if="userData">
          <q-form @submit.prevent="onSave">
            <q-card-section class="q-gutter-md">
              <q-input v-model="editUser.ci" label="CI" outlined :disable="true" />
              <q-input v-model="editUser.email" label="Email" outlined />
              <!-- Agrega aquí más campos si tu usuario tiene más propiedades -->
              <q-btn color="primary" label="Guardar cambios" type="submit" class="q-mt-md" />
            </q-card-section>
          </q-form>
        </div>
        <div v-else>Usuario no encontrado.</div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'UserEdit',
  setup() {
    const route = useRoute()
    const userId = route.params.id as string
    const errorMsg = ref('')

    // Lista predefinida de usuarios
    const predefinedUsers = [
      {
        ci: '12345678',
        email: 'usuario1@correo.com',
        accountsDetails: [{ ci: '12345678', email: 'usuario1@correo.com' }],
        inSystem: true,
      },
      {
        ci: '87654321',
        email: 'usuario2@correo.com',
        accountsDetails: [{ ci: '87654321', email: 'usuario2@correo.com' }],
        inSystem: true,
      },
    ]

    // Buscar usuario por CI
    const userData = ref(predefinedUsers.find((u) => u.ci === userId) || null)
    // Creamos un objeto editable para el formulario
    const editUser = ref(userData.value ? { ...userData.value } : { ci: '', email: '' })

    const onSave = () => {
      // Aquí puedes hacer la lógica para guardar los cambios (ejemplo: llamar a un servicio)
      // Por ahora solo mostramos un mensaje
      errorMsg.value = 'Cambios guardados'
    }

    return {
      userData,
      editUser,
      errorMsg,
      onSave,
    }
  },
})
</script>
