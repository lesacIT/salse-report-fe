<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import { VDataTable } from 'vuetify/labs/VDataTable'

const organizationList = ref([])
const FreeList = ref([])
const UserList = ref([])
const apiUrl = import.meta.env.VITE_API_BASE_URL

onMounted(() => {
  fetchData()
  fetchData1()
  fetchData2(1)
})
  






const fetchData =async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'user-of-organization')
   
    organizationList.value = response.data.data 

    // console.log(organizationList)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchData1 =async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'free-organization')
   
    FreeList.value = response.data.data 

  //  console.log(FreeList)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}


const fetchData2 =async id => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'organization/user/'+id)
   
    UserList.value = response.data.data 

  //  console.log(UserList)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const clickID=id=>{
  fetchData2(id)
}

const headers = [
  {
    title: 'Tên',
    key: 'name',
  },
  {
    title: 'Code',
    key: 'username',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  
]
</script>

<template>
  <VRow>
    <VCol cols="3">
      <!--
        <div>
        <div v-for="node in FreeList" :key="node.id">
        <div @click="clickID(node.id)">{{ node.name }}</div>
        <ul v-if="node.children && node.children.length > 0">
        <li v-for="child in node.children" :key="child.id">
        <div  @click="clickID(child.id)">&ensp;&ensp;{{ child.name }}</div>
        <ul v-if="child.children && child.children.length > 0">
        <li v-for="subChild in child.children" :key="subChild.id">
        <div  @click="clickID(subChild.id)">&ensp;&ensp;&ensp;&ensp;{{ subChild.name }}</div>
        <ul v-if="subChild.children && subChild.children.length > 0">
        <li v-for="subChild1 in subChild.children" :key="subChild1.id">
        <div  @click="clickID(subChild1.id)">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{ subChild1.name }}</div>
        <ul v-if="subChild1.children && subChild1.children.length > 0">
        <li v-for="subChild2 in subChild1.children" :key="subChild2.id">
        <div  @click="clickID(subChild2.id)">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{ subChild2.name }}</div>
        </li>
        </ul>
        </li>
        </ul>
        </li>
        </ul>
        </li>
        </ul>
        </div>
        </div> 
      -->

 
 
   
      <VTreeview
        v-model:open="open"
        :items="FreeList"
        activatable
        item-key="id"
      />
    </VCol>
    <VCol cols="9">
      <VDataTable
        cols="9"
        :headers="headers"
        :items="UserList"
      >
        <template #item.name="{ item }">
          <div class="d-flex align-center">
            <div class="d-flex flex-column ms-3">
              <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.name }}</span>
            </div>
          </div>
        </template>
      </VDataTable>
    </VCol>
  </VRow>
</template>
