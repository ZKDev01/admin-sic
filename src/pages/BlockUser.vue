<template>
  <div class="row justify-center q-mt-md">
    <div class="col-12 col-md-6">
      <q-card>
        <q-card-section class="row justify-center">
          <q-input v-model="email" class="col-12" outlined label="Usuario por email" />
          <q-input
            v-model="comment"
            class="col-12 q-mt-lg"
            outlined
            type="textarea"
            label="Comentario"
          />
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn no-caps color="orange" size="lg" dense @click="onUnblock"> Desbloquear </q-btn>
          <q-btn no-caps color="negative" size="lg" dense @click="onBlock"> Bloquear </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { UserService } from 'src/services/user.service'

defineOptions({
  name: 'BlockUserPage',
})

const $q = useQuasar()
const email = ref('')
const comment = ref('')

async function onBlock() {
  try {
    await UserService.blockUser(email.value, comment.value)
    $q.notify({
      message: 'El usuario ha sido bloqueado',
      color: 'green',
      position: 'top',
    })
    email.value = ''
    comment.value = ''
  } catch (error: unknown) {
    const errorMessage =
      typeof error === 'object' && error !== null && 'response' in error
        ? (error as { response: { data?: { message?: string } } }).response?.data?.message
        : 'Error al bloquear usuario'

    $q.notify({
      message: errorMessage,
      color: 'red',
      position: 'top',
    })
  }
}

async function onUnblock() {
  try {
    await UserService.unblockUser(email.value)
    $q.notify({
      message: 'El usuario ha sido desbloqueado',
      color: 'green',
      position: 'top',
    })
    email.value = ''
    comment.value = ''
  } catch (error: unknown) {
    const errorMessage =
      typeof error === 'object' && error !== null && 'response' in error
        ? (error as { response: { data?: { message?: string } } }).response?.data?.message
        : 'Error al desbloquear usuario'

    $q.notify({
      message: errorMessage,
      color: 'red',
      position: 'top',
    })
  }
}
</script>
