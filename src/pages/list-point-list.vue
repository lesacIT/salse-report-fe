<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const editDialog = ref(false)
const deleteDialog = ref(false)

const defaultItem = ref({
  'id': '',
  'date': '',
  'name_dlk': '',
  'name': '',
  'local_province_id': '',
  'local_ward_id': '',
  'local_district_id': '',
  'address_dlk': '',
  'list_of_types_dlk_id': '',
  'full_name_of_representative': '',
  'list_of_items_dlk_id': '',
  'images': null,
  'locate': '',
  'status_dlk': '',
  'advise_crc': '',
  'eligible_crc': '',
  'go_to_app_crc': '',
  'loan_crc': '',
})


const editedItem = ref(defaultItem.value)
const editedIndex = ref(-1)
const data = ref([])

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
    sortable: false,
    value: 'name',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'NGÀY BẮT ĐẦU',
    key: 'startDate',
  },
  {
    title: 'Phân Quyền ',
    key: 'salary',
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
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = { ...item }
  editDialog.value = true
}

const deleteItem = item => {
  editedIndex.value = data.value.indexOf(item)
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
    Object.assign(data.value[editedIndex.value], editedItem.value)
  else
    data.value.push(editedItem.value)
  close()
}

const deleteItemConfirm = () => {
  data.value.splice(editedIndex.value, 1)
  closeDelete()
}

const provinceCity = ref([])

const dlk = ref([])

const   listOfItemsDlk = ref([]) 

const   listOfTypesDlk = ref([])

const apiUrl = import.meta.env.VITE_API_BASE_URL

const fetchData = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'link_point_list')

    dlk.value = response.data // Assuming "data" is the array of objects as shown in your JSON

    const  provinceCity1 =  await axios.get(apiUrl +'province-city')

    provinceCity.value = provinceCity1.data.data

    const  listOfItemsDlk1 =  await axios.get(apiUrl +'list_of_items_dlk')

    listOfItemsDlk.value = listOfItemsDlk1.data.data

    const  listOfTypesDlk1 =  await axios.get(apiUrl +'list_of_types_dlk')

    listOfTypesDlk.value = listOfTypesDlk1.data.data
   

    // console.log( provinceCity)
    // console.log( listOfItemsDlk)
    // console.log( listOfTypesDlk)
    console.log( dlk.value.data[1].linkpoint.name_dlk)
    data.value = response.data
    alert('lấy dữ liệu thành công ')
  } catch (error) {
    console.error('Error fetching data:', error)
    alert('lấy dữ liệu thất bại ')
  }
}

onMounted(() => {
  fetchData()
})


// onMounted(() => {
//   data.value = JSON.parse(JSON.stringify(data))
// })
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4 mb-6">
        Danh Sách Điểm Liên Kết
      </h4>
    </VCol>

    
    <!-- 👉 Datatable  -->
    <VDataTable
      :headers="headers"
      :items="dlk.data"
      :items-per-page="5"
    >
      <!-- full name -->
      <template #item.user="{ item }">
        <div class="d-flex align-center">
          <!-- avatar -->
          <VAvatar
            size="32"
            :color="item.user.name ? '' : 'primary'"
            :class="item.user.name ? '' : 'v-avatar-light-bg primary--text'"
            :variant="!item.user.name? 'tonal' : undefined"
          >
            <VImg
              v-if="item.item.user.name"
              :src="item.avatar"
            />
            <span v-else>{{ avatarText(item.user.name) }}</span>
          </VAvatar>

          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.linkpoint.name_dlk }}</span>
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
          {{ resolveStatusVariant(data.name).text }}
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
          Are you sure you want to delete this item?
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
