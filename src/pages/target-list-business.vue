<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const data = ref([])
const deleteDialog=ref(false)
const itemToDelete=ref(null)

const headers = [
  {
    title: 'ID',
    sortable: false,
    value: 'id',
  },
  {
    title: 'Ngày',
    value: 'date',
  },
  {
    title: 'Code Nhân Viên',
    value: 'user_id',
  },
  {
    title: 'Username',
    value: 'belong.username',
  },
  {
    title: 'Name',
    value: 'belong.name',
  },
  {
    title: 'Email',
    value: 'belong.email',
  },
  {
    title: 'Phone',
    value: 'belong.phone_number',
  },

  // {
  //   title: 'Avatar',
  //   value: 'belong.belong.avatar',
  // },

  
  {
    title: 'CRC APP',
    value: 'crc_app',
  },
  {
    title: 'CRC LOAN ',
    value: 'crc_loan',
  },
  {
    title: 'PL/XS APP',
    value: 'plxs_app',
  },
  {
    title: 'PL/XS LOAN',
    value: 'plxs_loan',
  },
  {
    title: 'MỤC TIÊU AMOUNT PL/XS - 10.000.000',
    value: 'amount_plxs',
  },
  {
    title: 'MỤC TIÊN BANCA -400.000',
    value: 'amount_banca',
  },
  {
    title: 'LOAN CTBS',
    value: 'loan_ctbs',
  },
  {
    title: '%CONVERT BANCA',
    value: 'convert_banca',
  },
  {
    title: '%CTBS',
    value: 'convert_ctbs',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const apiUrl = import.meta.env.VITE_API_BASE_URL

const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl +'business-goals')

    data.value = response.data.data
    console.log(data.value)

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
    console.log('Deleting item with ID:', itemToDelete.value.id)
    await axios.delete(apiUrl +`business-goals/${itemToDelete.value.id}`)
    data.value = data.value.filter(d => d.id !== itemToDelete.value.id)
    alert('Item deleted successfully')
  } catch (error) {
    console.error('Error deleting item:', error)
  } finally {
    deleteDialog.value = false
  }
}

const editItem = item => {
  console.log('Edit item:', item)

  // Add your edit logic here
}

onMounted(() => {
  fetchData()
})
</script>


<template>
  <VCard title="DANH SÁCH MỤC TIÊU">
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
        bạn có chắc bạn muốn xóa  báo cáo này?
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
