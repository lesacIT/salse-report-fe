<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

// import { VBtn, VCard, VCardText, VDivider, VIcon } from 'vuetify/lib'


const data = ref([])
const deleteDialog=ref(false)
const itemToDelete=ref(null)
const isEditUserDrawerVisible = ref(false)
const editDialog = ref(false)
const editedItem = ref(null)

const headers = [
  {
    title: 'ID',
    sortable: false,
    value: 'id',
  },
  {
    title: 'Ngày Lập',
    sortable: false,
    value: 'date',
  },
  {
    title: 'Period Time',
    value: 'period_time',
  },
  {
    title: 'Code Nhân Viên',
    value: 'belong.name',
  },

  // {
  //   title: 'Area',
  //   key: 'area',
  // },
  {
    title: 'CRC APP',
    value: 'app_crc',
  },
  {
    title: 'CRC LOAN ',
    value: 'loan_crc',
  },
  {
    title: 'PL/XS APP',
    value: 'app_plxs',
  },
  {
    title: 'PL/XS LOAN',
    value: 'loan_plxs',
  },
  {
    title: 'MỤC TIÊU AMOUNT PL/XS',
    value: 'amount_plxs',
  },
  {
    title: 'MỤC TIÊN BANCA ',
    value: 'amount_banca',
  },
  {
    title: 'LOAN CTBS',
    value: 'loan_ctbs',
  },
  {
    title: '%CONVERT BANCA',
    value: 'conver_banca',
  },

  {
    title: '%CONVERT CTBS',
    value: 'conver_ctbs',
  },

  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const apiUrl = import.meta.env.VITE_API_BASE_URL

// const isEditUserDrawerVisible = ref(false)

const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl +'day-report')

    data.value = response.data

    // alert('lấy dữ liệu thành công ')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const deleteItem = item => {
  itemToDelete.value = item
  deleteDialog.value = true
}

const deleteItemConfirm = async () => {
  try {
    console.log(`Deleting item with ID: ${itemToDelete.value.id}`)
    await axios.delete(apiUrl +`day-report/${itemToDelete.value.id}`)
    console.log('Delete successful')
    data.value = data.value.filter(d => d.id !== itemToDelete.value.id)
    alert('Item deleted successfully')
  } catch (error) {
    console.error('Error deleting item:', error)
  } finally {
    deleteDialog.value = false
  }
}


const closeDelete = () => {
  deleteDialog.value = false
}

const editItem = item => {
  editedItem.value = { ...item }
  editDialog.value = true
}



const save = async () => {
  try {
    await axios.put(apiUrl +`day-report/${editedItem.value.id}`, editedItem.value)

    const index = data.value.findIndex(report => report.id === editedItem.value.id)
    if (index !== -1) {
      data.value[index] = { ...editedItem.value }
    }
    editDialog.value = false
    alert('Cập nhật dữ liệu thành công')
  } catch (error) {
    console.error('Error updating data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <VCard title="DANH SÁCH BÁO CÁO">
    <VDataTable
      :headers="headers"
      :items="data"
      density="compact"
      :items-per-page="5"
    >
      <template #item.actions="{ item }">
        <div class="d-flex gap-1">
          <IconBtn @click="editItem(item)">
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="deleteItem(item)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </div>
      </template>
    </VDataTable>
  </VCard>
  <VDialog
    v-model="deleteDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>
        bạn có chắc bạn muốn xóa báo cáo này?
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
  <!-- 👉 Edit Dialog  -->
  <VDialog
    v-model="editDialog"
    max-width="600px"
  >
    <VCard>
      <VCardTitle>
        <span class="headline">Cập Nhật Báo Cáo</span>
      </VCardTitle>

      <VCardText>
        {{ editedItem?.fullName }}
        <VContainer>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.id"
                label="Name"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.date"
                label="Name"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.user_id"
                label="Code nhân viên"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.app_crc"
                label="CRC APP"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.loan_crc"
                label="CRC LOAN"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.app_plxs"
                label="PL/XS APP"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.loan_plxs"
                label="PL/XS LOAN"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.amount_plxs"
                label="MỤC TIÊU AMOUNT PL/XS"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.amount_banca"
                label="MỤC TIÊN BANCA"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.loan_ctbs"
                label="LOAN CTBS"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.conver_banca"
                label="%CONVERT BANCA"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.conver_ctbs"
                label="%CONVERT CTBS"
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
</template>

<style scoped>
.v-dacentable {
  margin-top: 20px;
  text-align: center;

}
.v-data-table__td {
  white-space: nowrap;
}
.v-data-header th{
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
