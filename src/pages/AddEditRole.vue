<script setup>
import { VForm } from 'vuetify/components/VForm';


const permissionList = ref([])
import axios from 'axios';
const roleList = ref([])
const apiUrl = import.meta.env.VITE_API_BASE_URL
onMounted(() => {
  fetchData();
});
const fetchData =async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'permission')
    const response1 = await axios.get(apiUrl +'role')
    permissionList.value = response.data.data //role
    roleList.value = response1.data.data
    console.log(roleList)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const formData = ref([
 
])

const addRolePermission = async (roleId, permissionId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }

  // Set authorization token in Axios headers
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const response = await axios.post(apiUrl + 'add-permission', {
      role_id: roleId,
      permission_id: permissionId,
    });
    
    console.log('Role permission added successfully:', response.data);
   
  } catch (error) {
    console.error('Failed to add role permission:', error);
    throw new Error('Failed to add role permission. Please try again.');
  }
};

const onSubmit = () => {
  const selectedPermissions = permissionList.value.filter(p => p.selected).map(p => p.id);

  if (selectedRoleId.value && selectedPermissions.length > 0) {
    // Call addRolePermission for each selected permission
    selectedPermissions.forEach(permissionId => {
      addRolePermission(selectedRoleId.value, permissionId);
    });
  } else {
    alert('Please select both a Role and at least one Permission.');
  }
};

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
const isSelectAll = ref(false)

const refPermissionForm = ref()

// const checkedCount = computed(() => {
//   let counter = 0
//   permissions.value.forEach(permission => {
//     Object.entries(permission).forEach(([key, value]) => {
//       if (key !== 'name' && value)
//         counter++
//     })
//   })
  
//   return counter
// })

const selectedRoleId = ref(null);




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
          {{ props.rolePermissions.name ? 'Edit' : 'Add New' }} Role
        </VCardTitle>
        <p class="text-base mb-0">
          Set Role Permissions
        </p>
      </VCardItem>

      <VCardText class="mt-6">
        <!-- 👉 Form -->
        <VForm ref="refPermissionForm">
          <!-- 👉 Role name -->
          <!-- <AppTextField
            v-model="roleList"
            label="Role Name"
            placeholder="Enter Role Name"
          /> -->
          <AppSelect
      v-model="selectedRoleId"
      :items="roleList"
      item-title="name"
      item-value="id"
      placeholder="Select Role"
    />
          <h6 class="text-h4 mt-8 mb-3">
            Role Permissions
          </h6>

          <!-- 👉 Role Permissions -->

          <VTable class="permission-table text-no-wrap">
            <!-- 👉 Admin  -->
            <tr>
              <td>
                Administrator Access
              </td>
              <td colspan="3">
                <div class="d-flex justify-end">
                  <VCheckbox
                    v-model="Formdata"
                    v-model:indeterminate="isIndeterminate"
                    label="Select All"
                  />
                </div>
              </td>
            </tr>

            <!-- 👉 Other permission loop -->
            <template
              v-for="permission in permissionList"
              :key="permission.id"
            >
              <tr>
                <td>{{ permission.name }}</td>
          <td>
            <div class="d-flex justify-end">
              <VCheckbox
                v-model="permission.selected"

              />
            </div>
          </td>
              </tr>
            </template>
          </VTable>

          <!-- 👉 Actions button -->
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
