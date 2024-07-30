<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const data = ref([])

const headers = [
  {
    title: 'ID',
    sortable: false,
    value: 'id',
  },
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'Code Nhân Viên',
    value: 'user_id',
  },

  {
    title: 'Area',
    key: 'area',
  },
  {
    title: 'Khung giờ ',
    value: 'time_slot_id',
  },
  {
    title: 'Hoạt Động  ',
    value: 'have.daily_activity_id',
  },
  {
    title: 'Nhóm Hoạt Động 1',
    key: 'activitygroup1',
  },
  {
    title: 'Địa điểm',
    value: 'place',
  },
  {
    title: 'Chi Tiết',
    value: 'detail',
  },
  {
    title: 'Trạng Thái',
    value: 'finished',
  },

  {
    title: 'Hoạt Động 2',
    key: 'activity2',
  },
  
  {
    title: 'Khung giờ 3',
    key: 'Timeframe3',
  },
  {
    title: 'Hoạt Động 2',
    key: 'activity3',
  },
  {
    title: 'Nhóm Hoạt Động 2',
    key: 'activitygroup3',
  },
  {
    title: 'Hoạt Động',
    key: 'city',
  },
]

const apiUrl = import.meta.env.VITE_API_BASE_URL

const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl +'operational-goal')

    data.value = response.data 

    alert('lấy dữ liệu thành công ') 
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const formatTimeSlot = timeSlotId => {
  
  return timeSlotId
}

const formatFinished = finished => {
  
  return finished === 'null' ? 'Not Finished' : 'Finished'
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    density="compact"
    :items-per-page="5"
  />
</template>



<style scoped>
.v-data-table {
  margin-top: 20px;
}
</style>
