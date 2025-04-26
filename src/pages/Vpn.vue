<template>
  <div class="row justify-center q-ma-md">
    <div class="col-12 col-lg-6">
      <q-card>
        <q-card-section class="row justify-center">
          <q-input v-model="userId" class="col" outlined label="CI del usuario" />
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn fill color="primary" size="lg" dense @click="onSearch" :loading="loading">
            Buscar
          </q-btn>
        </q-card-actions>
        <q-card-section v-if="user">
          <div><span class="text-bold">Tiene VPN creada: </span>{{ user.hasVPN }}</div>
          <div><span class="text-bold">Tiene VPN habilitada: </span>{{ user.enableVPN }}</div>
        </q-card-section>
        <q-card-actions v-if="user" class="row justify-center">
          <q-btn fill color="info" size="md" no-caps dense @click="onEnable" :loading="loading">
            Habilitar
          </q-btn>
          <q-btn fill color="info" size="md" no-caps dense @click="onCreate" :loading="loading">
            Crear
          </q-btn>
          <q-btn fill color="red" size="md" no-caps dense @click="onDisable" :loading="loading">
            Deshabilitar
          </q-btn>
          <q-btn fill color="red" size="md" no-caps dense @click="onDelete" :loading="loading">
            Borrar
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VpnService } from 'src/services/vpn.service'

interface User {
  hasVPN: boolean
  enableVPN: boolean
}

export default defineComponent({
  name: 'VpnPage',
  setup(_, { root }) {
    const userId = ref<string>('')
    const loading = ref<boolean>(false)
    const user = ref<User | null>(null)

    const showNotification = (message: string, color: string) => {
      root.$q.notify({
        message,
        color,
        position: 'top',
      })
    }

    const handleError = (error: unknown) => {
      console.error('Error:', error)
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Hubo un problema con esta operación'
      showNotification(errorMessage, 'red')
    }

    const onSearch = async () => {
      try {
        loading.value = true
        const response = await VpnService.getStatus(userId.value)
        user.value = response.data as User
      } catch (error) {
        handleError(error)
      } finally {
        loading.value = false
      }
    }

    const onEnable = async () => {
      try {
        await VpnService.enableVPN(userId.value)
        showNotification('Operación exitosa', 'green')
        await onSearch()
      } catch (error) {
        handleError(error)
      }
    }

    const onDisable = async () => {
      try {
        await VpnService.disableVPN(userId.value)
        showNotification('Operación exitosa', 'green')
        await onSearch()
      } catch (error) {
        handleError(error)
      }
    }

    const onCreate = async () => {
      try {
        await VpnService.createVPN(userId.value)
        showNotification('Operación exitosa', 'green')
        await onSearch()
      } catch (error) {
        handleError(error)
      }
    }

    const onDelete = async () => {
      try {
        await VpnService.deleteVPN(userId.value)
        showNotification('Operación exitosa', 'green')
        await onSearch()
      } catch (error) {
        handleError(error)
      }
    }

    return {
      userId,
      user,
      loading,
      onSearch,
      onEnable,
      onDisable,
      onCreate,
      onDelete,
    }
  },
})
</script>
