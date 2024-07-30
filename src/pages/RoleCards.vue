<script setup>
import girlUsingMobile from '@images/pages/girl-using-mobile.png'
import axios from 'axios'
import { onMounted } from 'vue'
import AddRole from '../../../pages/AddRole.vue'
import EditRole from '../../../pages/EditRole.vue'
const apiUrl = import.meta.env.VITE_API_BASE_URL
const roleList = ref([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'role-user')

    roleList.value = response.data.roles

   // console.log(roleList.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})




const isRoleDialogVisible = ref(false)
const roleDetail = ref()
const isAddRoleDialogVisible = ref(false)

const editPermission = value => {
  isRoleDialogVisible.value = true
  roleDetail.value = value
}
</script>

<template>
  <VRow>
    <!-- 👉 Roles -->
    <VCol
      v-for="item in roleList"
      :key="item.id"
      cols="12"
      sm="6"
      lg="4"
    ><h2>{{ item.name }}</h2>
      <VCard>
        
        
        <VCardText class="d-flex align-center pb-1">
            
        <span>Total {{ item.users.length }} users</span>
      
          <VSpacer />

          <div class="v-avatar-group">
            <template v-for="user in item.users ">
              <div v-if="item.users.length < 4">
                <img 
                    width="36"
                    height="36"
                :src="'http://127.0.0.1:8000/storage/'+ user.avatar"
              />
              </div>
           
              <div  v-if="item.users.length === 4">
                <img
               
                  width="36"
                  height="36"
                  :src="'http://127.0.0.1:8000/storage/'+ user.avatar"
              />
              </div>
             
            </template>

            <div   v-if="item.users.length > 4">
            <img
              v-if="item.users.length > 4"
              :color="$vuetify.theme.current.dark ? '#4A5072' : '#f6f6f7'"
            >
              <span>+{{ item.users.length - 3 }}</span>
            </div>
          </div>
        </VCardText>

        <VCardText class="pb-5">
          <h4 class="text-h4">
            {{ item.role }}
          </h4>
          <div class="d-flex align-center">
            <a
              href="javascript:void(0)"
              @click="editPermission(item.details)"
            >
              Edit Role
            </a>

            <VSpacer />
            <VBtn
              icon
              color="disabled"
              variant="text"
              size="x-small"
            >
              <VIcon
                size="24"
                icon="tabler-copy"
              />
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Add New Role -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <VCard
        class="h-100"
        :ripple="false"
      >
        <VRow
          no-gutters
          class="h-100"
        >
          <VCol
            cols="5"
            class="d-flex flex-column justify-end align-center mt-5"
          >
            <img
              width="85"
              :src="girlUsingMobile"
            >
          </VCol>

          <VCol cols="7">
            <VCardText class="d-flex flex-column align-end justify-end gap-2 h-100">
              <VBtn @click="isAddRoleDialogVisible = true">
                Add Role
              </VBtn>
              <span class="text-end">Add role, if it doesn't exist.</span>
            </VCardText>
          </VCol>
        </VRow>
      </VCard>
      <AddRole v-model:is-dialog-visible="isAddRoleDialogVisible" />
    </VCol>
  </VRow>

  <EditRole
    v-model:is-dialog-visible="isRoleDialogVisible"
    v-model:role-permissions="roleDetail"
  />
</template>
