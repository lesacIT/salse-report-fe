<script setup>
import RoleCards from '@/views/app/roles/RoleCards.vue'
import data from '@/views/demos/forms/tables/data-table/datatable'
import axios from 'axios'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const apiUrl = import.meta.env.VITE_API_BASE_URL
const roleList = ref([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'add-role')

    roleList.value = response.data.data

    console.log(roleList.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

















const editDialog = ref(false)
const deleteDialog = ref(false)

const defaultItem = ref({
  responsiveId: '',
  id: -1,
  avatar: '',
  fullName: '',
  post: '',
  email: '',
  city: '',
  startDate: '',
  salary: -1,
  age: '',
  experience: '',
  status: -1,
})

const editedItem = ref(defaultItem.value)
const editedIndex = ref(-1)
const userList = ref([])

// status options
const selectedOptions = [
  {
    text: 'Current',
    value: 1,
  },
  {
    text: 'Professional',
    value: 2,
  },
  {
    text: 'Rejected',
    value: 3,
  },
  {
    text: 'Resigned',
    value: 4,
  },
  {
    text: 'Applied',
    value: 5,
  },
]

// headers
const headers = [
  {
    title: 'Tên',
    key: 'name',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'avatar',
    key: 'avatar',
  },
  {
    title: 'Phân Quyền ',
    key: 'role_id',
  },
  {
    title: 'TUỔI ',
    key: 'age',
  },
  {
    title: 'TRẠNG THÁI',
    key: 'status',
  },
  {
    title: 'HOẠT ĐỘNG',
    key: 'actions',
  },
]

const resolveStatusVariant = status => {
  if (status === 1)
    return {
      color: 'primary',
      text: 'Current',
    }
  else if (status === 2)
    return {
      color: 'success',
      text: 'Professional',
    }
  else if (status === 3)
    return {
      color: 'error',
      text: 'Rejected',
    }
  else if (status === 4)
    return {
      color: 'warning',
      text: 'Resigned',
    }
  else
    return {
      color: 'info',
      text: 'Applied',
    }
}

const editItem = item => {
  editedIndex.value = userList.value.indexOf(item)
  editedItem.value = { ...item }
  editDialog.value = true
}

const deleteItem = item => {
  editedIndex.value = userList.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const close = () => {
  editDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

const closeDelete = () => {
  deleteDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

const save = () => {
  if (editedIndex.value > -1)
    Object.assign(userList.value[editedIndex.value], editedItem.value)
  else
    userList.value.push(editedItem.value)
  close()
}

const deleteItemConfirm = () => {
  userList.value.splice(editedIndex.value, 1)
  closeDelete()
}

onMounted(() => {
  userList.value = JSON.parse(JSON.stringify(data))
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4 mb-6">
        Roles List
      </h4>
      <p class="mb-0">
        Một vai trò cung cấp quyền truy cập vào các menu và tính năng được xác định trước để tùy thuộc vào vai trò được chỉ định, người quản trị có thể truy cập vào những gì mình cần
      </p>
    </VCol>

    <!-- 👉 Roles Cards -->
    <VCol cols="12">
      <RoleCards />
    </VCol>
    <!-- 👉 Datatable  -->
    <VDataTable
      :headers="headers"
      :items="roleList"
      :items-per-page="5"
    >
      <!-- full name -->
      <template #item.fullName="{ item }">
        <div class="d-flex align-center">
          <!-- avatar -->
          <VAvatar
            size="32"
            :color="item.avatar ? '' : 'primary'"
            :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
            :variant="!item.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="item.avatar"
              :src="item.avatar"
            />
            <span v-else>{{ avatarText(item.fullName) }}</span>
          </VAvatar>

          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
            <small>{{ item.post }}</small>
          </div>
        </div>
      </template>

      <!-- status -->
      <template #item.status="{ item }">
        <VChip
          :color="resolveStatusVariant(item.status).color"
          size="small"
        >
          {{ resolveStatusVariant(item.status).text }}
        </VChip>
      </template>

      <!-- Actions -->
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <IconBtn @click="editItem(item.raw)">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="deleteItem(item.raw)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </div>
      </template>
    </VDataTable>

    <!-- 👉 Edit Dialog  -->
    <VDialog
      v-model="editDialog"
      max-width="600px"
    >
      <VCard>
        <VCardTitle>
          <span class="headline">Cập Nhật Quyền</span>
        </VCardTitle>

        <VCardText>
          {{ editedItem?.fullName }}
          <VContainer>
            <VRow>
              <!-- fullName -->
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="editedItem.fullName"
                  label="User name"
                />
              </VCol>

              <!-- email -->
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="editedItem.email"
                  label="Email"
                />
              </VCol>

              <!-- salary -->
              <!--
                <VCol
                cols="12"
                sm="6"
                md="4"
                >
                <VTextField
                v-model="editedItem.salary"
                label="Salary"
                prefix="$"
                type="number"
                />
                </VCol> 
              -->

              <!-- age -->
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="editedItem.age"
                  label="Age"
                  type="number"
                />
              </VCol>

              <!-- start date -->
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="editedItem.startDate"
                  label="Date"
                />
              </VCol>

              <!-- status -->
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <AppSelect
                  v-model="editedItem.status"
                  :items="selectedOptions"
                  item-title="text"
                  item-value="value"
                  label="Standard"
                  variant="underlined"
                  readonly
                />
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>

        <VCardActions>
          <VSpacer />

          <VBtn
            color="error"
            variant="outlined"
            @click="close"
          >
            Cancel
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="save"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- 👉 Delete Dialog  -->
    <VDialog
      v-model="deleteDialog"
      max-width="500px"
    >
      <VCard>
        <VCardTitle>
          Bạn có chắc bạn muốn xóa mục này?
        </VCardTitle>

        <VCardActions>
          <VSpacer />

          <VBtn
            color="error"
            variant="outlined"
            @click="closeDelete"
          >
            Cancel
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="deleteItemConfirm"
          >
            OK
          </VBtn>

          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>
  </vrow>
</template>
