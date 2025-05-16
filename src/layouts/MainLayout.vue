<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> SIC Admin </q-toolbar-title>

        <q-space />
        <q-btn-dropdown color="white" flat size="lg">
          <template #label>
            <q-icon name="account_circle" />
          </template>
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Secciones </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex' 
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'

const store = useStore()
const router = useRouter()
const leftDrawerOpen = ref(false)

const essentialLinks = ref([
  { title: 'Home', icon: 'dashboard', link: 'Home' },
  { title: 'Usuarios', caption: 'Gestión de usuarios', icon: 'school', link: 'User' },
])

const role = computed(() => store.getters['auth/role'])

watchEffect(() => {
  if (role.value === 'superAdmin') {
    essentialLinks.value.push(
      { title: 'VPN', caption: 'Gestión de cuentas de VPN', icon: 'vpn_lock', link: 'Vpn' },
      {
        title: 'Bloqueos',
        caption: 'Gestión de bloqueos de cuentas',
        icon: 'block',
        link: 'Block',
      },
    )
  }
})

const handleLogout = () => {
  void onLogout()
}
const onLogout = async () => {
  try {
    await store.dispatch('auth/logout')
    router.push({ name: 'Login' }).catch((error) => {
      console.error('Error en la redirección:', error)
    })
  } catch (error) {
    console.error('Error en logout:', error)
  }
}
</script>
