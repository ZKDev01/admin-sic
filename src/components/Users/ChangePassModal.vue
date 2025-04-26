<template>
  <q-dialog v-model="value" size="md">
    <q-card style="width: 500px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Introduzca la nueva contraseña</div>
      </q-card-section>
      <q-card-section>
        <p>
          * La contraseña debe tener al menos 8 caracteres, un caracter en minúscula, uno en
          mayúscula y un caracter especial
        </p>
      </q-card-section>

      <q-card-section>
        <q-input v-model="pass" outlined placeholder="Nueva contraseña:"> </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cambiar" color="primary" :loading="loading" @click="onClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { UserService } from 'src/services/user.service'

defineProps<{ value: boolean; email: string }>()
const emit = defineEmits(['input'])
const $q = useQuasar()

const loading = ref(false)
const pass = ref('')

const onClick = async () => {
  loading.value = true
  try {
    await UserService.changePass(props.email, pass.value)
    $q.notify({
      message: 'Contraseña cambiada',
      color: 'green',
      position: 'top',
    })
  } catch (e) {
    $q.notify({
      message: 'Ha ocurrido un error',
      color: 'red',
      position: 'top',
    })
  } finally {
    loading.value = false
  }
  emit('input', false)
}
</script>

<style scoped></style>
