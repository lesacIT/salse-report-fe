<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
import AddEditPermission from './AddEditPermission.vue';
import { paginationMeta } from '@api-utils/paginationMeta'
const apiUrl = import.meta.env.VITE_API_BASE_URL
const roleList = ref([])
onMounted(( ) => {
  fetchData(10, 1);
});
const fetchData =async (perPage , page ) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'user-permission', {
      params: {
        per_page: perPage,
        page: page
      }
    })

    roleList.value = response.data.data   
    perPage2.value=response.data.data.per_page
    page2.value=response.data.data.current_page
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const perPage2=ref([])
const page2=ref([])
const fetchData2 =async (perPage , page ) => {
 
  console.log(perPage, page);
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found')
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const response = await axios.get(apiUrl +'user-permission?perPage='+perPage +'&page='+ page )

    roleList.value = response.data.data   
    perPage2.value=response.data.data.per_page
    page2.value=response.data.data.current_page
    console.log(roleList);
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
const updatePage = (options) => {
console.log(1)
  fetchData2( perPage2.value,options); 

};
const updatePerPage = (options) => {

  fetchData2(options ,page2.value); 

};



// 👉 headers
const headers = [
  {
    title: 'Tên',
    key: 'name',
  },
  {
    title: 'Phân Quyền ',
    key: 'roles',
    sortable: false,
  },
  {
    title: 'Ngày Tạo ',
    key: 'createdDate',
    sortable: false,
  },
  {
    title: 'Hoạt động',
    key: 'actions',
    sortable: false,
  },
]

const totalVisiblePages = computed(() => {
  return window.innerWidth <= 600 ? 1 : Math.min(Math.ceil(roleList.value.total / roleList.value.per_page), 5);
});

const isPermissionDialogVisible = ref(false)
const isAddPermissionDialogVisible = ref(false)
const permissionName = ref('')

const colors = {
  'support': {
    color: 'info',
    text: 'Support',
  },
  'users': {
    color: 'success',
    text: 'Users',
  },
  'manager': {
    color: 'warning',
    text: 'Manager',
  },
  'administrator': {
    color: 'primary',
    text: 'Administrator',
  },
  'restricted-user': {
    color: 'error',
    text: 'Restricted User',
  },
}


const editPermission = name => {
  isPermissionDialogVisible.value = true
  permissionName.value = name
}
const perPage3=[
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' },
        { value: 100, title: '100' },
        { value: -1, title: 'All' },
      ]

      const updateOptions = options => {
  
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h5 class="text-h4 mb-6">
        Danh sách nhóm người dùng
      </h5>
      <!--
        <p class="mb-0">
        Each category (Basic, Professional, and Business) includes the four predefined roles shown below. {{ totalPermissions }}
        </p> 
      -->
    </VCol>

    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex align-center justify-space-between flex-wrap gap-4">
          <AppSelect
      :model-value="perPage2"
      :items=perPage3
      item-title="title"
      item-value="value"
      style="inline-size: 5rem;"
      @update:model-value="updatePerPage"
    />

          <div class="d-flex align-center gap-4 flex-wrap">
            <AppTextField
              v-model="search"
              placeholder="Search"
              density="compact"
              style="inline-size: 12.5rem;"
            />
            <VBtn
              density="default"
              @click="isAddPermissionDialogVisible = true"
            >
              Thêm quyền
            </VBtn>
          </div>
        </VCardText>

        <VDivider />

        <VDataTableServer
        :items-per-page="perPage2"
   
      :page="Page2"
      :total="roleList.total"
      :headers="headers"
      :items="roleList.data"
     
      :items-per-page-options="[
            { value: 5, title: '5' },
            { value: 10, title: '10' },
            { value: 20, title: '20' },
            { value: 40, title: '40' },
            { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
          ]"
           @update:options="updateOptions"
    >
          <!-- Assigned To -->
          <template #item.roles="{ item }">
            <div class="d-flex gap-2">
              <div  v-for="text in item.roles">
              <VChip
                v-for="text1 in text.permissions"
              >
                {{ text1.name }}
              </VChip>
            </div>
            </div>
          </template>

          <template #bottom>
            <VDivider />

            <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-medium-emphasis mb-0">
                {{ paginationMeta({ page: roleList.from , itemsPerPage: roleList.to }, roleList.total) }}

              </p>
              <VPagination
      v-model:page="page2"
      :length="Math.ceil(roleList.total / roleList.per_page)"
      :total-visible="totalVisiblePages"
      @update:page="updatePage"     
    >
    
      <template #prev="{ props }">
        <VBtn
          v-bind="props"
          @click="updatePage(roleList.current_page - 1)"
          variant="tonal"
          color="default"
        >
          Previous
        </VBtn>
      </template>

    
      <template #next="{ props }">
        <VBtn
          v-bind="props"
          @click="updatePage(roleList.current_page + 1)"
          variant="tonal"
          color="default"
        >
          Next
        </VBtn>
      </template>
    </VPagination>

             
            </div>
          </template>

          <template #item.createdDate="{ item }">
            <span>{{ item.createdDate }}</span>
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <VBtn
              icon
              size="small"
              color="medium-emphasis"
              variant="text"
              @click="editPermission(item.name)"
            >
              <VIcon
                size="22"
                icon="tabler-edit"
              />
            </VBtn>
            <VBtn
              icon
              size="small"
              variant="text"
              color="medium-emphasis"
            >
              <VIcon
                size="22"
                icon="tabler-trash"
              />
            </VBtn>
          </template>
        </VDataTableServer>
      </VCard>

      <AddEditPermission
        v-model:isDialogVisible="isPermissionDialogVisible"
        v-model:permission-name="permissionName"
      />
      <AddEditPermission v-model:isDialogVisible="isAddPermissionDialogVisible" />
    </VCol>
  </VRow>
</template>
