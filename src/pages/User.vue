<template>
  <div class="row justify-center q-mt-md">
    <div class="col-12 col-md-6">
      <q-card>
        <q-card-section class="row justify-center">
          <q-btn-toggle
            v-model="searchBy"
            class="my-custom-toggle"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="dark"
            text-color="primary"
            :options="[
              { label: 'Carnet', value: 'id' },
              { label: 'Email', value: 'email' },
            ]"
          />
        </q-card-section>
        <q-card-section class="row justify-center">
          <q-input
            v-model="userId"
            class="col"
            outlined
            :label="`Buscar un usuario por ${searchBy === 'id' ? 'carnet de identidad' : 'email'}:`"
          />
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn fill color="primary" size="lg" dense @click="onSearch" :loading="loadingSearch">
            Buscar
          </q-btn>
        </q-card-actions>
        <q-separator class="q-my-md q-mx-md" />
        <div v-if="errorMsg" class="row justify-center text-negative text-h6">
          {{ errorMsg }}
        </div>
        <div v-if="userData && !userData.inSystem" class="row justify-center text-h6">
          El usuario no está en el sistema
        </div>
        <div v-if="userData">
          <q-card-section class="q-mt-lg">
            <q-list>
              <q-item v-for="account in userData.accountsDetails" :key="account.email">
                <q-item-section>
                  <q-item-label>
                    <span class="text-bold">CI: </span>
                    {{ account.ci }}
                  </q-item-label>
                  <q-item-label>
                    <span class="text-bold">Email: </span>
                    {{ account.email }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    color="primary"
                    label="Modificar"
                    @click="goToEdit(account.ci)"
                    size="sm"
                    dense
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'UserPage',
  setup() {
    const searchBy = ref<'id' | 'email'>('id')
    const loadingSearch = ref(false)
    const userData: Ref<Record<string, unknown> | null> = ref(null)
    const userId = ref('')
    const errorMsg = ref('')

    const router = useRouter()

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

    // Computed para filtrar usuarios locales
    const filteredUsers = computed(() => {
      if (!userId.value.trim()) return []
      const key = searchBy.value === 'email' ? 'email' : 'ci'
      return predefinedUsers.filter((u) =>
        u[key].toLowerCase().includes(userId.value.trim().toLowerCase()),
      )
    })

    const onSearch = () => {
      errorMsg.value = '' // Limpia el mensaje antes de buscar
      userData.value = null

      if (!userId.value.trim()) {
        errorMsg.value = 'Debe ingresar un valor para la búsqueda.'
        return
      }

      // Busca en la lista local
      const key = searchBy.value === 'email' ? 'email' : 'ci'
      const localUser = predefinedUsers.find(
        (u) => u[key].toLowerCase() === userId.value.trim().toLowerCase(),
      )
      if (localUser) {
        userData.value = localUser
        return
      }
    }

    const goToEdit = (ci: string) => {
      void router.push({ name: 'user-edit', params: { id: ci } })
    }

    return {
      userId,
      userData,
      onSearch,
      loadingSearch,
      searchBy,
      filteredUsers,
      errorMsg,
      goToEdit,
    }
  },
})
</script>
