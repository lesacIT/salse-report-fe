<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import AddNewUserDrawer from './AddNewUserDrawer.vue'
import EditUserDrawer from './EditUserDrawer.vue'

const userList = ref([])
const PerPage= ref([])
const currentPage= ref([])
const apiUrl = import.meta.env.VITE_API_BASE_URL
const Url = import.meta.env.VITE_BASE_URL

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'user')

    userList.value = response.data.data.data

    console.log(userList)
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

const isAddNewUserDrawerVisible = ref(false)
const isEditUserDrawerVisible = ref(false)

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
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Mã Nhân Viên',
    key: 'username',
  },
  {
    title: 'SDT',
    key: 'phone_number',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'Trạng Thái',
    key: 'status',
  },
  {
    title: 'Hoạt Động',
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

const editStatus = async item => {
  
  try {
    const data=item

    console.log(data)

    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.post(apiUrl +'active/user/'+ data)

    console.log(response.data)
    console.log('change status successfully')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const deleteItem = async item => {
 
 
  try {
    const data=item

    console.log(data)

    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.delete(apiUrl +'user/'+ data)

    console.log(response.data)
    console.log('delete successfully')
  } catch (error) {
    console.error('Error submitting form:', error)
  }

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

const getImageUrl = path => {
  return path
}

const deleteItemConfirm = () => {
  userList.value.splice(editedIndex.value, 1)
  closeDelete()
}
</script>

<template>
  <VCard title="DANH SÁCH NHÂN VIÊN">
    <!-- <VCardText>Le Sac</VCardText> -->
    <!-- <VDivider /> -->
    <VCardText class="d-flex flex-wrap py-4 gap-4">
      <div class="me-3 d-flex gap-3">
        <AppSelect
          :model-value="PerPage"
          :items="[
            { value: 10, title: '10' },
            { value: 25, title: '25' },
            { value: 50, title: '50' },
            { value: 100, title: '100' },
            { value: -1, title: 'All' },
          ]"
          style="inline-size: 6.25rem;"
          @update:model-value="currentPage"
        />
      </div>
      <VSpacer />
      <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
        <!-- 👉 Search  -->
        <div style="inline-size: 10rem;">
          <AppTextField
            v-model="searchQuery"
            placeholder="Search"
            density="compact"
          />
        </div>

        <!-- 👉 Export button -->
        <VBtn
          variant="tonal"
          color="secondary"
          prepend-icon="tabler-screen-share"
        >
          Export
        </VBtn>

        <!-- 👉 Add user button -->
        <VBtn
          prepend-icon="tabler-plus"
          @click="isAddNewUserDrawerVisible = true"
        >
          Thêm Nhân Viên
        </VBtn>
      </div>
    </VCardText>
    <VDivider />
    <!-- 👉 Datatable  -->
    <VDataTable
      :headers="headers"
      :items="userList"
      :items-per-page="PerPage"
    >
      <!-- full name -->
      <template #item.name="{ item }">
        <div class="d-flex align-center">
          <!-- avatar -->
          <VAvatar
            size="32"
            :color="item.name ? '' : 'primary'"
            :class="item.name ? '' : 'v-avatar-light-bg primary--text'"
            :variant="!item.name ? 'tonal' : undefined"
          >
            <VImg :src="getImageUrl(Url+'storage/'+ item.avatar)" />
          </VAvatar>

          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.name }}</span>
            <small>{{ item.name }}</small>
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
          <IconBtn @click="isEditUserDrawerVisible = true">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="deleteItem(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
          <IconBtn @click="editStatus(item.id)">
            <VIcon icon="tabler-lock" />
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
          <span class="headline">Edit Item</span>
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
            Hủy
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="save"
          >
            Lưu
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
            Hủy
          </VBtn>

          <VBtn
            color="success"
            variant="elevated"
            @click="deleteItemConfirm"
          >
            Đồng Ý
          </VBtn>

          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>
  </vcard>
  <!-- 👉 Add New User -->
  <AddNewUserDrawer
    v-model:isDrawerOpen="isAddNewUserDrawerVisible"
    
    @user-data="addNewUser"
  />
  <EditUserDrawer
    v-model:isDrawerOpen="isEditUserDrawerVisible"
    @user-data="EditUserDrawer"
  />
</template>
