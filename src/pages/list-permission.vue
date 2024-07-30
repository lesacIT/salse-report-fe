<template>
  <div>
    <button @click="showForm = !showForm">
      {{ showForm ? 'Hide Form' : 'Create Permission' }}
    </button>
    
    <div v-if="showForm">
      <form @submit.prevent="addPermission">
        <label for="name">Name:</label>
        <input
          id="name"
          v-model="newPermission.name"
          placeholder="Name"
          required
        >
        <label for="guard_name">Guard Name:</label>
        <input
          id="guard_name"
          v-model="newPermission.guard_name"
          placeholder="Guard Name"
          required
        >
        <button type="submit">
          Thêm
        </button>
      </form>
    </div>
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
          v-for="perm in permissions"
          :key="perm.id"
        >
          <td>{{ perm.id }}</td>
          <td>{{ perm.name }}</td>
          <td>{{ perm.guard_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const newPermission = ref({
  name: '',
  guardname: '',
})

const apiUrl = import.meta.env.VITE_API_BASE_URL
const showForm = ref(false)
const message = ref(null) // To store success or error message

const addPermission = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.post(apiUrl +'permission', newPermission.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    console.log('Permission added successfully', response.data)
    
    // Display success message
    message.value = { type: 'success', text: 'Permission added successfully' }

    // Reset the form
    newPermission.value = { id: '', name: '', guardname: '' }

    // Optionally hide the form after successful submission
    showForm.value = false
  } catch (error) {
    console.error('Error adding permission:', error)

    // Display error message
    message.value = { type: 'error', text: 'Error adding permission. Please try again later.' }
  }
}

const permissions = ref([])
  
console.log(permissions)
  
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'permission')

    permissions.value = response.data.data
    console.log(permissions.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
  