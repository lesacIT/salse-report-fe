<template>
  <div>
    <button @click="showForm = !showForm">
      {{ showForm ? 'Hide Form' : 'Create Permission' }}
    </button>
    
    <div v-if="showForm">
      <form @submit.prevent="addPermission">
        <label for="name">Tên:</label>
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
          <th>Tên</th>
          <th>Guard Name</th>
          <th>roles</th>
          <th>Xóa</th>
          <th>Thêm quyền</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="role in roles"
          :key="role.id"
        >
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>{{ role.guard_name }}</td>
          <td>
            <ul>
              <li
                v-for="permission in role.permissions"
                :key="permission.id"
              >
                {{ permission.name }}
              </li>
            </ul>
          </td>
          <td>
            <button @click="deleteForm(role.id)">
              xóa
            </button>
          </td>
          <td>
            <button @click="toggleForm(role.id)">
              {{ showFormAdd ? 'Hide Form' : 'Create Permission' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showFormAdd">
      <form @submit.prevent="addPermission">
        <label for="permission">Permission:</label>
        <div
          v-for="permission in permissions"
          :key="permission.id"
        >
          <input
            :id="'permission-' + permission.id"
            v-model="selectedPermissions"
            type="checkbox"
            :value="permission.name"
          >
          <label :for="'permission-' + permission.id">{{ permission.name }}</label>
        </div>

        <button type="submit">
          Thêm
        </button>
      </form>
    </div>
  </div>
</template>
  
<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const newPermission = ref({
  name: '',
  guard_name: '',
})

const showFormAdd = ref(false)
const newRole = ref('')

const roleId = ref(null) 


const apiUrl = import.meta.env.VITE_API_BASE_URL

const messageadd = ref(null)
const showForm = ref(false)
const message = ref(null) // To store success or error message

const addPermission = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.post(apiUrl +'role', newPermission.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    console.log('Role added successfully', response.data)  
    message.value = { type: 'success', text: 'Permission added successfully' }
    newPermission.value = { id: '', name: '', guard_name: '' }
    showForm.value = false
  } catch (error) {
    console.error('Error adding permission:', error)

    // Display error message
    message.value = { type: 'error', text: 'Error adding permission. Please try again later.' }
  }
}

const deleteForm = async item => {
  const id = item

  console.log(id)
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    const response = await axios.delete(apiUrl +`role/${id}`)
    
    console.log(response.data)
    console.log('Form submitted successfully')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const roles = ref([])
const permissions = ref([])

console.log(roles)
  
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'role')
    const permissionResponse= await axios.get(apiUrl +'permission')

    roles.value = response.data.data
    permissions.value = permissionResponse.data.data
    console.log(roles.value)
    console.log(permissions.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
  