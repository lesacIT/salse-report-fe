<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { VBtn, VCard, VCardItem, VCardText, VCardTitle, VDialog } from 'vuetify/components'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  rolePermissions: {
    type: Object,
    required: false,
    default: () => ({
      name: '',
      permissions: [],
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:rolePermissions',
])

const apiUrl = import.meta.env.VITE_API_BASE_URL

const onSubmit = async() => {
  console.log(Role)

  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }


  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  try {
    const response = await axios.post(apiUrl + 'role', Role.value )
    
    console.log('Role permission added successfully:', response.data)
  
  } catch (error) {
    console.error('Failed to add role permission:', error)
    throw new Error('Failed to add role permission. Please try again.')
  }
}

const Role = ref({
  name: '',
  guard_name: '',
})

const options = [
  { name: 'Web', value: 'web' },
  { name: 'API', value: 'api' },
]

const onReset = () => {
  emit('update:isDialogVisible', false)
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="onReset"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="onReset" />

    <VCard class="pa-sm-8 pa-5">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3">
          Add Role
        </VCardTitle>
        <p class="text-base mb-0">
          Set Role Permissions
        </p>
      </VCardItem>

      <VCardText class="mt-6">
        <VForm ref="refPermissionForm">
          <AppTextField
            v-model="Role.name"
            label="Role Name"
            placeholder="Select Role"
          />
          <br>
          <AppSelect
            v-model="Role.guard_name"
            :items="options"
            item-title="name"
            item-value="value"
            placeholder="Select Option"
          />
          <h6 class="text-h4 mt-8 mb-3">
            Role Permissions
          </h6>

        
          <div class="d-flex align-center justify-center gap-3 mt-6">
            <VBtn @click="onSubmit">
              Submit
            </VBtn>

            <VBtn
              color="secondary"
              variant="tonal"
              @click="onReset"
            >
              Cancel
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.permission-table {
  td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-block: 0.5rem;

    .v-checkbox {
      min-inline-size: 4.75rem;
    }

    &:not(:first-child) {
      padding-inline: 0.5rem;
    }

    .v-label {
      white-space: nowrap;
    }
  }
}
</style>
