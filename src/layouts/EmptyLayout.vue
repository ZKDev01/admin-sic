<template>
  <q-layout view="hhh lpR fFf">
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'EmptyLayout',
})
</script>
