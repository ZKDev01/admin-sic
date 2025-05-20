<template>
  <q-select
    v-model="selectedRole"
    :options="roleOptions"
    label="Seleccionar Rol"
    emit-value
    map-options
    outlined
    option-value="value"
    option-label="label"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as () => string[],
    required: true,
  },
  label: {
    type: String,
    default: 'Rol',
  },
})

const emit = defineEmits(['update:modelValue'])

interface RoleOption {
  value: string
  label: string
}

const roleOptions = computed<RoleOption[]>(() =>
  props.options.map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1),
  })),
)

const selectedRole = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
