<script setup>
import axios from 'axios'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'userData',
])

const apiUrl = import.meta.env.VITE_API_BASE_URL
const refForm = ref()

// 👉 drawer close

const user =ref()
const organization =ref()
const roles =ref()
const isFormValid = ref(false)



import { onMounted, ref } from 'vue'

const provinceCity = ref([])

const UserList = ref([])
const OrganizationList = ref([])
const RolesList = ref([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const  provinceCity1 =  await axios.get(apiUrl +'province-city')

    provinceCity.value = provinceCity1.data.data

    const  User =  await axios.get(apiUrl +'createUser')

    UserList.value = User.data.user
    OrganizationList.value = User.data.organization
    RolesList.value = User.data.roles
    console.log( UserList)
    
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

const selectedProvince = computed(() => {
  return provinceCity.value.find(province => province.id === formCreateUser.value.id_local_province) || {}
})
  
const selectedDistrict = computed(() => {
  return selectedProvince.value.districts.find(district => district.id === formCreateUser.value.id_local_district) || {}
})
  
// Method to handle province change
const provinceChanged = () => {
  // Reset district and ward selections when province changes
  formCreateUser.value.id_local_district = null
  formCreateUser.value.id_local_ward = null
}
  
// Method to handle district change
const districtChanged = () => {
  // Reset ward selection when district changes
  formCreateUser.value.id_local_ward = null
}

const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const handleFileChange = event => {
  const file = event.target.files[0]
  if (file) {
    formCreateUser.value.avatar = file
  }
}

const formCreateUser=ref({
  
  'manager_id': '', //
  'organization_id': '', //
  'role_id': '', //
  'username': '', //
  'name': '', //
  'email': '', //
  'password': '', //
  'phone_number': '', //
  'identity_number': '',  //      
  'avatar': null,        //
  'id_local_province': '', //
  'id_local_district': '', //
  'id_local_ward': '',      //  
  'date_start_working': '', //
  'date_of_birth': '',  //
})

const onSubmit =async () => {

  // try {
  const formData = {}

  for (const key in formCreateUser.value) {
    formData[key] = formCreateUser.value[key]
  }

  // console.log(formCreateUser);
  // console.log(formCreateUserToSend);
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Token not found')

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const response = await axios.post(apiUrl +'user/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  console.log(response.data)
  console.log('Form submitted successfully')

  // } catch (error) {
  //   console.error('Error submitting form:', error);
  // }
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add Nhân Viên"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Full name -->
              <VCol cols="12">
                <AppTextField
                  v-model="formCreateUser.name"
                  :rules="[requiredValidator]"
                  label="Tên Nhân Viên"
                  placeholder="VD: Nguyễn Văn A"
                />
              </VCol>

              <!-- 👉 Username -->
              <VCol cols="12">
                <AppTextField
                  v-model="formCreateUser.username"
                  :rules="[requiredValidator]"
                  label="Code Staff"
                  placeholder="VD: DA0123456"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="formCreateUser.password"
                  :rules="[requiredValidator]"
                  label="Mật khẩu"
                  placeholder="************"
                />
              </VCol>
              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="formCreateUser.email"
                  :rules="[requiredValidator]" 
                  label="email"
                  placeholder="VD: A@gmail.com"
                />
              </VCol>
              <!-- emailValidator -->
              <VCol cols="12">
                <!--
                  <AppTextField
                  v-model="formCreateUser.manager_id"
                  :rules="[requiredValidator]"
                  label="Người đứng đầu"
                  placeholder="Người đứng đầu"
                  /> 
                -->
                <AppSelect
                  v-model="formCreateUser.manager_id"
                  :items="UserList"
                  item-title="name"
                  item-value="id" 
                  item-key="id"
                  label="Manager"
                  placeholder="chon nguoi duong dan"
                />
              </VCol>






              <VCol cols="12">
                <!--
                  <AppTextField
                  v-model="formCreateUser.organization_id"
                  :rules="[requiredValidator]"
                  label="nhóm"
                  placeholder="nhóm"
                  /> 
                -->
                <AppSelect
                  v-model="formCreateUser.organization_id"
                  :items="OrganizationList"
                  item-title="name"
                  item-value="id" 
                  item-key="id"
                  label="to chuc "
                  placeholder="chon to chuc"
                />
              </VCol>
              <VCol cols="12">
                <!--
                  <AppTextField
                  v-model="formCreateUser.role_id"
                  :rules="[requiredValidator]"
                  label="quyền "
                  placeholder="quyền"
                  /> 
                -->
                <AppSelect
                  v-model="formCreateUser.role_id"
                  :items="RolesList"
                  item-title="name"
                  item-value="id" 
                  item-key="id"
                  label="chon quyen "
                  placeholder="chon quyen"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="formCreateUser.phone_number"
                  :rules="[requiredValidator]"
                  label="sdt "
                  placeholder="sdt"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="formCreateUser.identity_number"
                  :rules="[requiredValidator]"
                  label="cccd "
                  placeholder="cccd"
                />
              </VCol>
              <VCol cols="12">
                <!--
                  <AppTextField
                  v-model="formCreateUser.avatar"
                  :rules="[requiredValidator]"
                  label="avatar "
                  placeholder="avatar"
                  /> 
                -->
                <!--
                  <VFileInput
                  v-model="formCreateUser.avatar"
                  label="Upload Image"
                  placeholder="Picture"
                  :rules="[requiredValidator]"
                  accept="image/*"
                  /> 
                -->
                <!--
                  <label for="images">Image:</label>
                  <input type="file" id="avatar" @change="handleFileChange"> 
                -->
        
                <VFileInput
                  id="avatar"
                  label="File input"
                  @change="handleFileChange"
                />
              </VCol>
              <VCol cols="12">
                <!--
                  <AppTextField
                  v-model="formCreateUser.id_local_province"
                  :rules="[requiredValidator]"
                  label="tinh "
                  placeholder="tinh"
                  /> 
                -->
                <!--
                  <div>
                  <label for="id_local_province">Local Province:</label>
                  <select id="id_local_province" v-model="formCreateUser.id_local_province" @change="provinceChanged">
                  <option value="" disabled>Select a province</option>
                  <option v-for="province in provinceCity" :key="province.id" :value="province.id">
                  {{ province.province_name }}
                  </option>
                  </select>
                  </div> 
                -->

                <AppSelect
                  v-model="formCreateUser.id_local_province"
                  :items="provinceCity"
                  item-title="province_name"
                  item-value="id"
                  item-key="id" 
                  label="Local Province"
                  placeholder="Select State"
                  @change="provinceChanged"
                />
              </VCol>
              <VCol cols="12">
                <!--
                  <AppTextField
                  v-model="formCreateUser.id_local_district"
                  :rules="[requiredValidator]"
                  label="huyen "
                  placeholder="huyen"
                  /> 
                -->
                <div v-if="formCreateUser.id_local_province">
                  <!--
                    <label for="id_local_district">Local District:</label>
                    <select id="id_local_district" v-model="formCreateUser.id_local_district" @change="districtChanged">
                    <option value="" disabled>Select a district</option>
                    <option v-for="district in selectedProvince.districts" :key="district.id" :value="district.id">
                    {{ district.district_name }}
                    </option>
                    </select> 
                  -->
                  <!-- {{ selectedProvince.districts }} -->
                  <AppSelect
                    id="id_local_district"
                    v-model="formCreateUser.id_local_district" 
                    :items="selectedProvince.districts"
                    item-title="district_name"
                    item-value="id" 
                    item-key="id"
                    label="Local District"
                    placeholder="Select State"
                    @change="districtChanged" 
                  />
                </div>
                <div v-else>
                  <!--
                    <label for="id_local_district">Local District:</label>
                    <select id="id_local_district">
                    <option value="" disabled>Select a district</option>
                    </select> 
                  -->
                  <AppSelect
                    id="id_local_district"
                    v-model="formCreateUser.id_local_district" 
                    :items="selectedProvince.districts"
                    item-title="district_name"
                    disabled
                    item-value="id" 
                    item-key="id"
                    label="Local District"
                    placeholder="Select State"
                  />
                </div>
              </VCol>
              <VCol cols="12">
                <!--
                  <AppTextField
                  v-model="formCreateUser.id_local_ward"
                  :rules="[requiredValidator]"
                  label="xa "
                  placeholder="xa"
                  /> 
                -->
                <div v-if="formCreateUser.id_local_district">
                  <!--
                    <label for="id_local_ward">Local Ward:</label>
                    <select id="id_local_ward" v-model="formCreateUser.id_local_ward">
                    <option value="" disabled>Select a ward</option>
                    <option v-for="ward in selectedDistrict.wards" :key="ward.id" :value="ward.id">
                    {{ ward.ward_name }}
                    </option>
                    </select> 
                  -->
                  <AppSelect
                    id="id_local_ward"
                    v-model="formCreateUser.id_local_ward" 
                    :items="selectedDistrict.wards"
                    item-title="ward_name" 
                    item-value="id" 
                    item-key="id"
                    label="Local Ward"
                    placeholder="Select State"
                  />
                </div>
                <div v-else>
                  <!--
                    <label for="id_local_district">Local Ward:</label>
                    <select id="id_local_district">
                    <option value="" disabled>Select a Ward</option>
                    </select>
                  -->
      
                  <AppSelect
  
                    disabled
    
                    label="Local Ward"
                    placeholder="Select State"
                  />
                </div>
              </VCol>
            
              <VCol cols="12">
                <VTextField
                  v-model="formCreateUser.date_start_working"
                  :rules="[requiredValidator]"
                  label="DateStart"
                  placeholder="ngay bat dau"
                  type="date"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="formCreateUser.date_of_birth"
                  :rules="[requiredValidator]"
                  label="date_of_birth"
                  placeholder="ngay sinh"
                  type="date"
                />
              </VCol>
          
              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
