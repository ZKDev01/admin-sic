<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './services/auth.service'
import store from './store'

export default defineComponent({
  name: 'App',
  setup() {
    onBeforeMount(() => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN)
      const tokenRefresh = localStorage.getItem(REFRESH_TOKEN)

      // Verificar si los tokens existen antes de actualizar el estado
      if (accessToken && tokenRefresh) {
        store.commit('auth/SET_TOKEN', {
          token: accessToken,
          tokenRefresh: tokenRefresh,
        })
      }
    })
  },
})
</script>
