<template>
  <q-card class="q-ma-lg bg-grey-1">
    <q-card-section class="row justify-center">
      <div class="text-h3">Sitio de administración de SIC.</div>
    </q-card-section>
    <q-card-section class="row justify-center">
      <p class="text-h6">Su rol actual es: {{ role }}</p>
    </q-card-section>
    <q-card-section class="row justify-center">
      <p>* Las secciones a las que podrá acceder dependen de los permisos de su rol</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

defineOptions({
  name: 'PageIndex',
})

const store = useStore()
const role = computed(() => store.getters['auth/role'])
</script>
