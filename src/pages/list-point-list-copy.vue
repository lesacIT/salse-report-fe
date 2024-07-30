<template>
  <button @click="showFormCreate">
    create
  </button>
   
  <div>
    <table>
      <thead>
        <tr>
          <th>thuoc nhom</th>
          <th>Avatar</th>
          <th>Name dlk</th>
          <th>Name nguoi dai dien</th>
          <th>Name nguoi tao</th>
          
          <!-- Add more headers as needed -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in dlk"
          :key="index"
        >
          <img
            :src="getImageUrl('http://127.0.0.1:8000/storage/'+item.linkpoint.image)"
            alt="User Avatar"
            style="width: 50px; height: 50px;"
          >
          <td>{{ item.linkpoint.image }}</td>
          <td> {{ item.linkpoint.name_dlk }}</td>
          <td> {{ item.linkpoint.full_name_of_representative }}</td>
          <td> {{ item.linkpoint.belong.name }}</td>
           
          <td>
            <button @click="showForm(item)">
              Edit
            </button>
            <button @click="deleteForm(item)">
              xoa
            </button>
          </td>
          <!-- Add more <td> elements for additional properties -->
        </tr>
      </tbody>
    </table>
    <div
      v-if="isFormVisible"
      class="form-overlay"
    >
      <form @submit.prevent="submitForm">
        <div>
          <label for="date">Date:</label>
          <input
            id="date"
            v-model="formData.date"
            type="text"
          >
        </div>
        <div>
          <label for="name_dlk">Name DLK:</label>
          <input
            id="name_dlk"
            v-model="formData.name_dlk"
            type="text"
          >
        </div>
        <div>
          <label for="local_province_id">Local Province ID:</label>
          <input
            id="local_province_id"
            v-model="formData.local_province_id"
            type="number"
          >
        </div>
        <div>
          <label for="local_ward_id">Local Ward ID:</label>
          <input
            id="local_ward_id"
            v-model="formData.local_ward_id"
            type="number"
          >
        </div>
        <div>
          <label for="local_district_id">Local District ID:</label>
          <input
            id="local_district_id"
            v-model="formData.local_district_id"
            type="number"
          >
        </div>
        <div>
          <label for="address_dlk">Address DLK:</label>
          <input
            id="address_dlk"
            v-model="formData.address_dlk"
            type="text"
          >
        </div>
        <div>
          <label for="list_of_types_dlk_id">List of Types DLK ID:</label>
          <input
            id="list_of_types_dlk_id"
            v-model="formData.list_of_types_dlk_id"
            type="number"
          >
        </div>
        <div>
          <label for="full_name_of_representative">Full Name of Representative:</label>
          <input
            id="full_name_of_representative"
            v-model="formData.full_name_of_representative"
            type="text"
          >
        </div>
        <div>
          <label for="list_of_items_dlk_id">List of Items DLK ID:</label>
          <input
            id="list_of_items_dlk_id"
            v-model="formData.list_of_items_dlk_id"
            type="number"
          >
        </div>
        <div>
          <label for="images">Image:</label>
          <input
            id="images"
            type="file"
            @change="handleFileChange"
          >
        </div>
        <div>
          <label for="locate">Locate:</label>
          <input
            id="locate"
            v-model="formData.locate"
            type="text"
          >
        </div>
        <div>
          <label for="status_dlk">Status DLK:</label>
          <input
            id="status_dlk"
            v-model="formData.status_dlk"
            type="text"
          >
        </div>
        <div>
          <label for="advise_crc">Advise CRC:</label>
          <input
            id="advise_crc"
            v-model="formData.advise_crc"
            type="text"
          >
        </div>
        <div>
          <label for="eligible_crc">Eligible CRC:</label>
          <input
            id="eligible_crc"
            v-model="formData.eligible_crc"
            type="text"
          >
        </div>
        <div>
          <label for="go_to_app_crc">Go to App CRC:</label>
          <input
            id="go_to_app_crc"
            v-model="formData.go_to_app_crc"
            type="text"
          >
        </div>
        <div>
          <label for="loan_crc">Loan CRC:</label>
          <input
            id="loan_crc"
            v-model="formData.loan_crc"
            type="text"
          >
        </div>
        <!-- Add more form fields as needed -->
        <button
          :id="`submit-${formData.id}`"
          type="submit"
        >
          Submit
        </button>
        <button
          type="button"
          @click="hideForm"
        >
          Cancel
        </button>
      </form>
    </div>
    <div
      v-if="isFormCreateVisible"
      class="form-overlay"
    >
      <form @submit.prevent="submitFormCreate">
        <div>
          <label for="date">Date:</label>
          <input
            id="date"
            v-model="formData.date"
            type="text"
          >
        </div>
        <div>
          <label for="name_dlk">Name DLK:</label>
          <input
            id="name_dlk"
            v-model="formData.name_dlk"
            type="text"
          >
        </div>
        <div>
          <div>
            <label for="local_province_id">Local Province:</label>
            <select
              id="local_province_id"
              v-model="formData.local_province_id"
              @change="provinceChanged"
            >
              <option
                value=""
                disabled
              >
                Select a province
              </option>
              <option
                v-for="province in provinceCity"
                :key="province.id"
                :value="province.id"
              >
                {{ province.province_name }}
              </option>
            </select>
          </div>
          <div v-if="formData.local_province_id">
            <label for="local_district_id">Local District:</label>
            <select
              id="local_district_id"
              v-model="formData.local_district_id"
              @change="districtChanged"
            >
              <option
                value=""
                disabled
              >
                Select a district
              </option>
              <option
                v-for="district in selectedProvince.districts"
                :key="district.id"
                :value="district.id"
              >
                {{ district.district_name }}
              </option>
            </select>
          </div>
          <div v-else>
            <label for="local_district_id">Local District:</label>
            <select id="local_district_id">
              <option
                value=""
                disabled
              >
                Select a district
              </option>
            </select>
          </div>
          <div v-if="formData.local_district_id">
            <label for="local_ward_id">Local Ward:</label>
            <select
              id="local_ward_id"
              v-model="formData.local_ward_id"
            >
              <option
                value=""
                disabled
              >
                Select a ward
              </option>
              <option
                v-for="ward in selectedDistrict.wards"
                :key="ward.id"
                :value="ward.id"
              >
                {{ ward.ward_name }}
              </option>
            </select>
          </div>
          <div v-else>
            <label for="local_district_id">Local Ward:</label>
            <select id="local_district_id">
              <option
                value=""
                disabled
              >
                Select a Ward
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="address_dlk">Address DLK:</label>
          <input
            id="address_dlk"
            v-model="formData.address_dlk"
            type="text"
          >
        </div>
        <div>
          <label for="list_of_types_dlk_id">List of Types DLK ID:</label>
          <input
            id="list_of_types_dlk_id"
            v-model="formData.list_of_types_dlk_id"
            type="number"
          >
        </div>
        <div>
          <label for="full_name_of_representative">Full Name of Representative:</label>
          <input
            id="full_name_of_representative"
            v-model="formData.full_name_of_representative"
            type="text"
          >
        </div>
        <div>
          <label for="list_of_items_dlk_id">List of Items DLK ID:</label>
          <input
            id="list_of_items_dlk_id"
            v-model="formData.list_of_items_dlk_id"
            type="number"
          >
        </div>
        <div>
          <label for="images">Image:</label>
          <input
            id="images"
            type="file"
            @change="handleFileChange"
          >
        </div>
        <div>
          <label for="locate">Locate:</label>
          <input
            id="locate"
            v-model="formData.locate"
            type="text"
          >
        </div>
        <div>
          <label for="status_dlk">Status DLK:</label>
          <input
            id="status_dlk"
            v-model="formData.status_dlk"
            type="text"
          >
        </div>
        <div>
          <label for="advise_crc">Advise CRC:</label>
          <input
            id="advise_crc"
            v-model="formData.advise_crc"
            type="text"
          >
        </div>
        <div>
          <label for="eligible_crc">Eligible CRC:</label>
          <input
            id="eligible_crc"
            v-model="formData.eligible_crc"
            type="text"
          >
        </div>
        <div>
          <label for="go_to_app_crc">Go to App CRC:</label>
          <input
            id="go_to_app_crc"
            v-model="formData.go_to_app_crc"
            type="text"
          >
        </div>
        <div>
          <label for="loan_crc">Loan CRC:</label>
          <input
            id="loan_crc"
            v-model="formData.loan_crc"
            type="text"
          >
        </div>
        <!-- Add more form fields as needed -->
        <button
          :id="`submit-${formData.id}`"
          type="submit"
        >
          Submit
        </button>
        <button
          type="button"
          @click="hideFormCreate"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>
  
<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const provinceCity = ref([])
const dlk = ref([])
const   listOfItemsDlk = ref([])  
const   listOfTypesDlk = ref([])
 
const getImageUrl = imageUrl => {
  return imageUrl 
}

const handleFileChange = event => {
  formData.value.images = event.target.files[0] // Update the image field with the selected file
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get('http://127.0.0.1:8000/api/link_point_list')

    dlk.value = response.data.data // Assuming "data" is the array of objects as shown in your JSON

    const  provinceCity1 =  await axios.get('http://127.0.0.1:8000/api/province-city')

    provinceCity.value = provinceCity1.data.data

    const  listOfItemsDlk1 =  await axios.get('http://127.0.0.1:8000/api/list_of_items_dlk')

    listOfItemsDlk.value = listOfItemsDlk1.data.data

    const  listOfTypesDlk1 =  await axios.get('http://127.0.0.1:8000/api/list_of_types_dlk')

    listOfTypesDlk.value = listOfTypesDlk1.data.data


    console.log( provinceCity)
    console.log( listOfItemsDlk)
    console.log( listOfTypesDlk)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

const isFormCreateVisible = ref(false)

const showFormCreate = () => {
  formData.value = ({
    'id': '',
    'date': '',
    'name_dlk': '',
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
  isFormCreateVisible.value = true
}

const hideFormCreate = () => {
  isFormCreateVisible.value = false
}

const isFormVisible = ref(false)

const showForm = item => {
  formData.value.id=item.linkpoint.id
  formData.value.date=item.linkpoint.date
  formData.value.name_dlk=item.linkpoint.name_dlk
  formData.value.local_province_id=item.linkpoint.local_province_id
  formData.value.local_ward_id=item.linkpoint.local_ward_id
  formData.value.local_district_id=item.linkpoint.local_district_id
  formData.value.address_dlk=item.linkpoint.address_dlk
  formData.value.list_of_types_dlk_id=item.linkpoint.list_of_types_dlk_id
  formData.value.full_name_of_representative=item.linkpoint.full_name_of_representative
  formData.value.list_of_items_dlk_id=item.linkpoint.list_of_items_dlk_id
  formData.value.images=item.linkpoint.images
  formData.value.locate=item.linkpoint.locate
  formData.value.status_dlk=item.linkpoint.status_dlk
  formData.value.advise_crc=item.linkpoint.advise_crc
  formData.value.eligible_crc=item.linkpoint.eligible_crc
  formData.value.go_to_app_crc=item.linkpoint.go_to_app_crc
  formData.value.loan_crc=item.linkpoint.loan_crc
  console.log( item.linkpoint.id)
  isFormVisible.value = true
}

const formData = ref({
  'id': '',
  'date': '',
  'name_dlk': '',
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



const hideForm = () => {
  isFormVisible.value = false
}

const submitForm = async () => {
  console.log('Form submitted with ID:', formData.value.id)
  try {
    const formDataToSend = new FormData()

    for (const key in formData.value) {
      formDataToSend.append(key, formData.value[key])
    }
    
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
    console.log(formData.value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.post(`http://127.0.0.1:8000/api/link_point_list/${formData.value.id}?_method=PUT`, formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log(response.data)
    console.log('Form submitted successfully')
    hideForm()
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}



const submitFormCreate = async () => {
 
  try {
    const formDataToSend = new FormData()

    for (const key in formData.value) {
      formDataToSend.append(key, formData.value[key])
    }
    
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
    console.log(formData.value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.post(`http://127.0.0.1:8000/api/link_point_list/`, formData.value, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log(response.data)
    console.log('Form submitted successfully')
    hideForm()
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const deleteForm = async item => {
  const id = item.linkpoint.id

  console.log(id)
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    const response = await axios.delete(`http://127.0.0.1:8000/api/link_point_list/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    console.log(response.data)
    console.log('Form submitted successfully')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

const selectedProvince = computed(() => {
  return provinceCity.value.find(province => province.id === formData.value.local_province_id) || {}
})
  
const selectedDistrict = computed(() => {
  return selectedProvince.value.districts.find(district => district.id === formData.value.local_district_id) || {}
})
  
// Method to handle province change
const provinceChanged = () => {
  // Reset district and ward selections when province changes
  formData.value.local_district_id = null
  formData.value.local_ward_id = null
}
  
// Method to handle district change
const districtChanged = () => {
  // Reset ward selection when district changes
  formData.value.local_ward_id = null
}
</script>
  