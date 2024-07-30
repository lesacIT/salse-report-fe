<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Guard Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="perm in roles"
          :key="perm.id"
        >
          <td>{{ perm.id }}</td>
          <td>{{ perm.name }}</td>
          <td>{{ perm.roles }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const roles = ref([])
  
console.log(roles)

const apiUrl = import.meta.env.VITE_API_BASE_URL
 
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'add-role')

    roles.value = response.data.data
    console.log(roles.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
