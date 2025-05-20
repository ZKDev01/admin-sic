<template>
  <q-page class="q-pa-md">
    <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
      <!-- Campos sin cambios (se mantienen las validaciones básicas) -->
      <q-input
        v-model="formData.email"
        label="Correo electrónico"
        type="email"
        :rules="[required, validEmail]"
        outlined
      />

      <q-input
        v-model="formData.password"
        label="Contraseña"
        type="password"
        :rules="[required, minLength(8)]"
        outlined
      />

      <q-input
        v-model="formData.passwordConfirmation"
        label="Confirmar Contraseña"
        type="password"
        :rules="[required, matchPassword]"
        outlined
      />

      <role-selector
        v-model="formData.role"
        :options="availableRoles"
        label="Seleccionar Rol"
        :rules="[required]"
      />

      <q-btn
        type="submit"
        label="Crear Cuenta"
        color="primary"
        :loading="loading"
        class="full-width"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'src/store/index'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import type { AxiosError } from 'axios'
import RoleSelector from 'components/RoleSelector.vue'

const $q = useQuasar()
const router = useRouter()
const store = useStore()

interface RegistrationData {
  email: string
  password: string
  passwordConfirmation: string
  role: string
}

const formData = ref<RegistrationData>({
  email: '',
  password: '',
  passwordConfirmation: '',
  role: '',
})

const loading = ref(false)
const availableRoles = computed(() => store.state.auth.availableRoles)

// Reglas de validación (solo básicas)
const required = (val: string) => !!val || 'Campo obligatorio'
const validEmail = (val: string) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Email inválido'
const minLength = (len: number) => (val: string) => val.length >= len || `Mínimo ${len} caracteres`
const matchPassword = (val: string) => val === formData.value.password || 'Contraseñas no coinciden'

const handleSubmit = async () => {
  try {
    loading.value = true
    await store.dispatch('auth/register', formData.value)

    $q.notify({
      color: 'positive',
      message: '¡Cuenta creada exitosamente!',
    })

    await router.push('/') // Redirección a página principal
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{
      message?: string
      errors?: Record<string, string[]>
    }>

    let errorMessage = 'Error al crear cuenta'

    // Manejo mejorado de errores
    if (axiosError.response?.data?.errors) {
      errorMessage = Object.values(axiosError.response.data.errors).flat().join(', ')
    } else if (axiosError.response?.data?.message) {
      errorMessage = axiosError.response.data.message
    }

    $q.notify({
      color: 'negative',
      message: errorMessage,
      icon: 'report_problem', // Icono de Quasar
    })
  } finally {
    loading.value = false
  }
}
</script>
