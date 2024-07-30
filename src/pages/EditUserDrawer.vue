<script setup>
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

const isFormValid = ref(false)
const refForm = ref()
const fullName = ref('')
const userName = ref('')
const email = ref('')
const company = ref('')
const country = ref()
const contact = ref('')
const role = ref()
const plan = ref()
const status = ref()

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        id: 0,
        fullName: fullName.value,
        company: company.value,
        role: role.value,
        country: country.value,
        contact: contact.value,
        email: email.value,
        currentPlan: plan.value,
        status: status.value,
        avatar: '',
        billing: 'Auto Debit',
      })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
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
      title="Edit Nhân Viên"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Full name -->
              <VCol cols="12">
                <AppTextField
                  v-model="fullName"
                  :rules="[requiredValidator]"
                  label="Tên Nhân Viên"
                  placeholder="VD: Nguyễn Văn A"
                />
              </VCol>
              

              <!-- 👉 Username -->
              <VCol cols="12">
                <AppTextField
                  v-model="userName"
                  :rules="[requiredValidator]"
                  label="Code Staff"
                  placeholder="VD: DA0123456"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Name Staff"
                  placeholder="VD: Nguyễn Văn A"
                />
              </VCol>

              <!-- 👉 company -->
              <VCol cols="12">
                <AppTextField
                  v-model="Password"
                  :rules="[requiredValidator]"
                  label="Password"
                  placeholder="PixInvent"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="Date"
                  :rules="[requiredValidator]"
                  label="Date"
                  placeholder="Select Date"
                  type="date"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="Date"
                  :rules="[requiredValidator]"
                  label="Birth Day"
                  placeholder="Select Date"
                  type="date"
                />
              </VCol>

              <!-- 👉 Contact -->
              <VCol cols="12">
                <VTextField
                  v-model="contact"
                  type="tel"
                  :rules="[requiredValidator]"
                  label="Phone"
                  placeholder="VD:091234567"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  placeholder="VD: NguyenVanA@gmail.com"
                />
              </VCol>

              <!-- 👉 Province -->
              <VCol cols="12">
                <AppSelect
                  v-model="country"
                  label="Province"
                  placeholder="Province"
                  :rules="[requiredValidator]"
                  :items="['Tỉnh Hậu Giang', 'Tỉnh An Giang', 'Tỉnh Vĩnh Long', 'Thành Phố Cần Thơ']"
                />
              </VCol>
              <VCol cols="12">
                <AppSelect
                  v-model="country"
                  label="Distric"
                  placeholder="Distric"
                  :rules="[requiredValidator]"
                  :items="['Huyện Phụng Hiệp', 'Huyện Châu Thành ', 'Huyện Châu Thành A', 'Thành Phố Ngã Bảy']"
                />
              </VCol>
              <VCol cols="12">
                <VFileInput
                  v-model="image"
                  label="Upload Image"
                  placeholder="Picture"
                  :rules="[requiredValidator]"
                  accept="image/*"
                />
              </VCol>
              <!-- 👉 Status -->
              <VCol cols="12">
                <AppSelect
                  v-model="status"
                  label="Select Status"
                  placeholder="Select Status"
                  :rules="[requiredValidator]"
                  :items="[{ title: 'Active', value: 'active' }, { title: 'Inactive', value: 'inactive' }, { title: 'Pending', value: 'pending' }]"
                />
              </VCol>
              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Gửi
                </VBtn>
                <VBtn
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Hủy
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
