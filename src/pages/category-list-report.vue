<script setup>
import ECommerceAddCategoryDrawer from '@/views/app/ecommerce/AddCategoryReport.vue'
import ECommerceEditCategoryDrawer from '@/views/app/ecommerce/EditCategoryReport.vue'
import product1 from '@images/ecommerce-images/product-1.png'
import product10 from '@images/ecommerce-images/product-10.png'
import product9 from '@images/ecommerce-images/product-9.png'
import { VDataTable } from 'vuetify/labs/VDataTable'

const categoryData = ref([
  {
    id: 1,
    categoryTitle: 'Danh Mục Báo Cáo 1',
    description: 'Nội dung báo cáo',
    image: product1,
  },
  {
    id: 2,
    categoryTitle: 'Danh Mục Báo Cáo 2',
    description: 'Nội dung báo cáo',
    
    image: product9,
  },
  {
    id: 3,
    categoryTitle: 'Danh Mục Báo Cáo 3',
    description: 'Nội dung báo cáo',
    image: product10,
  },
  
])

const headers = [
  {
    title: 'Danh Mục',
    key: 'categoryTitle',
  },
  {
    title: 'Hoạt Động',
    key: 'actions',
    sortable: false,
  },
]

const deleteCategory = id => {
  const categoryIndex = categoryData.value.findIndex(category => category.id === id)

  categoryData.value.splice(categoryIndex, 1)
}

const itemsPerPage = ref(10)
const page = ref(1)
const searchQuery = ref('')
const isAddProductDrawerOpen = ref(false)
const isEditProductDrawerOpen = ref(false)
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <div class="d-flex justify-sm-space-between flex-wrap gap-y-4 gap-x-6 justify-start">
          <VTextField
            v-model="searchQuery"
            placeholder="Tìm Kiếm"
            density="compact"
            style="max-inline-size: 200px; min-inline-size: 200px;"
          />

          <div class="d-flex align-center flex-wrap gap-4">
            <AppSelect
              v-model="itemsPerPage"
              :items="[5, 10, 15]"
            />
            <VBtn
              prepend-icon="tabler-plus"
              @click="isAddProductDrawerOpen = !isAddProductDrawerOpen"
            >
              Thêm Danh Mục Báo Cáo
            </VBtn>
          </div>
        </div>
      </VCardText>

      <VDivider />

      <div class="category-table ">
        <VDataTable
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :headers="headers"
          :items="categoryData"
          item-value="categoryTitle"
          :search="searchQuery"
          show-select
          class="text-no-wrap"
        >
          <template #item.actions="{ item }">
            <IconBtn>
              <VIcon
                icon="tabler-trash"
                @click="deleteCategory(item.id)"
              />
            </IconBtn>
            <IconBtn>
              <VIcon
                icon="tabler-edit"
                @click="isEditProductDrawerOpen = !isEditProductDrawerOpen"
              />
            </IconBtn>
          </template>
          <template #item.categoryTitle="{ item }">
            <div class="d-flex gap-x-3">
              <div>
                <h6 class="text-h6">
                  {{ item.categoryTitle }}
                </h6>
                <div class="text-sm text-disabled">
                  {{ item.description }}
                </div>
              </div>
            </div>
          </template>
          <template #bottom>
            <VDivider />
            <div class="d-flex align-center justify-space-between flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-medium-emphasis mb-0">
                showing {{ itemsPerPage * (page - 1) + 1 }} to
                {{ Math.min(itemsPerPage * page, categoryData.length) }} of {{ categoryData.length }} entries
              </p>
              <VPagination
                v-model="page"
                :length="Math.ceil(categoryData.length / itemsPerPage)"
                :total-visible="5"
              >
                <template #prev="slotProps">
                  <VBtn
                    variant="tonal"
                    color="default"
                    v-bind="slotProps"
                    :icon="false"
                  >
                    Previous
                  </VBtn>
                </template>
                <template #next="slotProps">
                  <VBtn
                    variant="tonal"
                    color="default"
                    v-bind="slotProps"
                    :icon="false"
                  >
                    Next
                  </VBtn>
                </template>
              </VPagination>
            </div>
          </template>
        </VDataTable>
      </div>
    </VCard>

    <ECommerceAddCategoryDrawer v-model:isDrawerOpen="isAddProductDrawerOpen" />
    <ECommerceEditCategoryDrawer v-model:isDrawerOpen="isEditProductDrawerOpen" />
  </div>
</template>

<style lang="scss">
.ProseMirror-focused{
  border: none;
}
</style>
