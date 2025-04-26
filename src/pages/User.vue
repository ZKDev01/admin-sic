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
              </q-item>
            </q-list>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'
import { UserService } from 'src/services/user.service'

export default defineComponent({
  name: 'UserPage',
  setup() {
    const searchBy = ref<'id' | 'email'>('id')
    const loadingSearch = ref(false)
    const userData: Ref<Record<string, unknown> | null> = ref(null)
    const userId = ref('')

    const onSearch = async () => {
      if (!userId.value.trim()) {
        console.warn('Debe ingresar un valor para la búsqueda.')
        return
      }

      try {
        loadingSearch.value = true
        const key = searchBy.value === 'email' ? 'uid' : 'ci'
        userData.value = await UserService.getUserInfo(key, userId.value)
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
      } finally {
        loadingSearch.value = false
      }
    }

    return {
      userId,
      userData,
      onSearch,
      loadingSearch,
      searchBy,
    }
  },
})
</script>
