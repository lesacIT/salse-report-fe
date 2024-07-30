<script setup>
import axios from 'axios'
import { ref } from 'vue'

const token = localStorage.getItem('token')

// Thiết lập Axios với Bearer token
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const iconsSteps = [
  // {
  //   title: 'Thông Tin',
  //   icon: 'custom-address',
  // },
  // {
  //   title: 'Lập mục tiêu ngày',
  //   icon: 'custom-wizard-personal',
  // },
  {
    title: 'Mục tiêu kinh doanh',
    icon: 'custom-wizard-address',
  },

  // {
  //   title: 'Chỉ Tiêu Kinh Doanh',
  //   icon: 'custom-wizard-social-link',
  // },
  {
    title: 'Xem Lại & Gửi',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  "date": "",
  "crc_app": "",
  "crc_loan": "",
  "plxs_app": "",
  "plxs_loan": "",
  "amount_plxs": "",
  "amount_banca": "",
  "loan_ctbs": "",
  "convert_banca": "",
  "convert_ctbs": "",
})

const onSubmit = async () => {
  // if (!validateFormData()) {
  //   console.error('Validation failed: Some fields are empty or invalid.')
    
  //   return
  // }



  try {
    const response = await axios.post('http://127.0.0.1:8000/api/business-goals', formData.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    alert('biểu mẫu được gửi thành công ') 
    console.log('Form submitted successfully:', response.data)
  } catch (error) {
    console.error('Error submitting form:', error.response ? error.response.data : error.message)
  }
}

const selectedItem = ref('Programming')
const items = ['Sáng', 'Chiêu']
</script>

<template>
  <!-- 👉 Stepper -->
  <div class="mb-6">
    <AppStepper
      v-model:current-step="currentStep"
      :items="iconsSteps"
    />
  </div>

  <VCard>
    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Lập mục tiêu ngày
                </h6>
              </VCol>
          
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  v-model="formData.date"
                  label=" Ngày và giờ"
                  placeholder="Chọn ngày và giờ"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d' }"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppAutocomplete
                  label="Buổi Báo Cáo"
                  :items="items"
                  placeholder="Select State"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.crc_app"
                  placeholder="1"
                  label="CRC APP*"
                  type="number"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.crc_loan"
                  placeholder="1"
                  label="CRC LOAN*"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.plxs_app"
                  placeholder="1"
                  label="PL/XS APP*"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.plxs_loan"
                  placeholder="1"
                  label="PL/XS LOAN*"
                  type="number"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.amount_plxs"
                  placeholder="10000000"
                  label="MỤC TIÊU AMOUNT PL/XS - 10.000.000*"
                  type="number"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.amount_banca"
                  placeholder="400000"
                  label="MỤC TIÊU BANCA - 400.000"
                  type="number"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.loan_ctbs"
                  placeholder="1"
                  label="LOAN CTBS*"
                  type="number"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.convert_banca"
                  placeholder="1"
                  label="%CONVERT BANCA"
                  type="number"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.convert_ctbs"
                  placeholder="1"
                  label="%CTBS"
                  type="number"
                />
              </VCol>
            </VRow>
          </VWindowItem>

        
          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Thông Tin
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Hoạt Động
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Mục Tiêu Kinh Doanh
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
