

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
            <!--
              <div>
              <h3>test đổ hoạt động</h3>
              <ul>
              <li
              v-for="group in Groups"
              :key="group.id"
              >
              {{ group.title }}
              </li>
              </ul>
              </div> 
            -->
              
            <!--
              <div>
              <h3>test đổ tên</h3>
              <ul>
              <li
              v-for="auth in Auth"
              :key="auth.id"
              >
              {{ auth.username
              }}
              </li>
              </ul>
              </div>  
            -->
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Lập mục tiêu hoạt động ngày 
                </h6>
              </VCol>
              <VCol
                cols="12"
                md="12"
              >
                <AppDateTimePicker
                  v-model="formData.date"
                  label=" Ngày và giờ"
                  placeholder="Chọn ngày và giờ"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d' }"
                />
              </VCol>
              
              
              
              <!--
                <VCol
                cols="12"
                md="3"
                >
                <AppSelect
                v-model="formData.time_slot_id"
                label="Khung giờ 1"
                placeholder="Chọn khung giờ"
                :items="timeSlots.map(slot =>`${slot.time_slot} (${slot.period})`)"
                />
                <div>Khung giờ  {{ formData.time_slot_id }}</div> 
                </VCol>    
              -->
             
              
              <!--
                <VCol
                cols="12"
                md="3"
                >
                <AppSelect
                v-model="formData.timeSlotId"
                label="Khung giờ 1"
                placeholder="Chọn khung giờ"
                :items="timeSlots"
                item-text="time_slot"
                item-value="id"
                />
                
                <div>Khung giờ id: {{ formData.timeSlotId }}</div>
                </VCol> 
              -->
              
              
              <!--
                <VCol
                cols="12"
                md="3"
                >
                <AppSelect
                v-model="formData.timeSlotId"
                label="Khung giờ 1"
                placeholder="Chọn khung giờ"
                :items="timeSlots.map(slot => `${slot.time_slot} (${slot.period})`)"
                />  
               
            
                <div class="form-group mt-2">
                <label for="timeSlotSelect1">Khung giờ 1</label>
                <select
                id="timeSlotSelect1"
                v-model="formData.time_slot_id"
                class="custom-select"
                >
                <option
                v-for="slot in timeSlots"
                :key="slot.id"
                :value="slot.id"
                >
                {{ slot.time_slot }} ({{ slot.period }})
                </option>
                </select>
                </div>
                <div>Khung giờ id: {{ formData.time_slot_id }}</div>
                </VCol>  
              -->
              <!--
                <VCol
                cols="12"
                md="3"
                >
                <AppSelect
                v-model="daily_activity_id"
                label="Hoạt Động 1"
                placeholder="Chọn Hoạt Động"
                :items="Groups.map(group => `${group.title}`)"
                @change="handleDailyActivityChange"
                />
                </VCol> 
              -->
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formData.time_slot_id"
                  label="Khung giờ 1"
                  placeholder="Chọn khung giờ"
                  :items="timeSlots.map(slot => ({ text: `${slot.id} (${slot.period})`, value: slot.id }))"
                  
                  
                  required
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formData.daily_activity_id"
                  label="Hoạt Động 2"
                  placeholder="Chọn Hoạt Động"
                  :items="formattedTimeSlots"
                />
              </VCol>
              
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="formData.place"
                  label="Địa Điểm"
                  placeholder="Cần Thơ"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="formData.detail"
                  label="Mục Tiêu"
                  placeholder="********"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formData.time_slot_id2"
                  label="Khung giờ 2"
                  placeholder="Chọn khung giờ"
                  :items="timeSlots.map(slot => ({ text: `${slot.id} (${slot.period})`, value: slot.id }))"
                />
              </VCol>
              <!--
                <VCol
                cols="12"
                md="3"
                >
                <AppAutocomplete
                label="States"
                :items="items2"
                placeholder="Select State"
                />
                </VCol> 
              -->
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formData.daily_activity_id2"
                  label="Hoạt Động 2"
                  placeholder="Chọn Hoạt Động"
                  :items="Groups.map(group => `${group.title}`)"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="formData.place2"
                  label="Địa Điểm"
                  placeholder="Cần Thơ"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="formData.detail2"
                  label="Mục Tiêu"
                  placeholder="********"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formData.time_slot_id3"
                  label="Khung giờ 3"
                  placeholder="Chọn khung giờ"
                  :items="timeSlots.map(slot => `${slot.time_slot} (${slot.period})`)"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formData.daily_activity_id3"
                  label="Hoạt Động 3"
                  placeholder="Chọn Hoạt Động"
                  :items="Groups.map(group => `${group.title}`)"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="formData.place3"
                  label="Địa Điểm"
                  placeholder="Cần Thơ"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="formData.detail3"
                  label="Mục Tiêu"
                  placeholder="********"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formData.time_slot_id4"
                  label="Khung giờ 4"
                  placeholder="Chọn khung giờ"
                  :items="timeSlots.map(slot => `${slot.time_slot} (${slot.period})`)"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formData.daily_activity_id4"
                  label="Hoạt Động 4"
                  placeholder="Chọn Hoạt Động"
                  :items="Groups.map(group => `${group.title}`)"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="formData.place4"
                  label="Địa Điểm"
                  placeholder="Cần Thơ"
                />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
                <AppTextField
                  v-model="formData.detail4"
                  label="Mục Tiêu"
                  placeholder="********"
                />
              </VCol>
            </vrow>
          </VWindowItem>

        
          <!--
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
          -->
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

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'


const token = localStorage.getItem('token')

// Thiết lập Axios với Bearer token
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const timeSlots = ref([])
const Groups = ref([])

// const Auth = ref([])

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
    title: 'Mục tiêu hoạt động ngày',
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

  "date": "2024-06-07",
  "time_slot_id": null,
  "daily_activity_id": '',
  "place": "",
  "detail": "",
  "time_slot_id2": null,
  "daily_activity_id2": '',
  "place2": "",
  "detail2": "",
  "time_slot_id3": '',
  "daily_activity_id3": '',
  "place3": "",
  "detail3": "",
  "time_slot_id4": '',
  "daily_activity_id4": '',
  "place4": "",
  "detail4": "",
})



// console.log('gchgcghchgchgchg', validateFormData())




const selectedItem = ref('Programming')
const items = ['Sáng', 'Chiêu']

// const validateFormData = () => {
//   return formData.value.date && formData.value.time_slot_id && formData.value.daily_activity_id &&
//     formData.value.place && formData.value.detail &&
//     formData.value.time_slot_id2 && formData.value.daily_activity_id2 &&
//     formData.value.place2 && formData.value.detail2 &&
//     formData.value.time_slot_id3 && formData.value.daily_activity_id3 &&
//     formData.value.place3 && formData.value.detail3 &&
//     formData.value.time_slot_id4 && formData.value.daily_activity_id4 &&
//     formData.value.place4 && formData.value.detail4
// }

const fetchTimeSlots = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/operational-goal/create', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    console.log(response.data)

    timeSlots.value = response.data.timeslot
    
    formData.value.timeslotid = response.data.timeslot
    Groups.value=response.data.groups

    // formData.value.timeSlotId = response.data.time_slot_id

    // Auth.value=response.data.auth

  } catch (error) {
    console.error('Error fetching time slots:', error)
  }
}



console.log('gchgcghchgchgchg2', formData)



console.log('123', formData.value)

console.log('mon test', formData.value.timeSlots)

// console.log(Groups)

onMounted(() => {
  fetchTimeSlots()
})

const formattedTimeSlots = computed(() => {
  return timeSlots.value.map(slot => ({
    text: `${slot.time_slot} (${slot.period})`,
    value: slot.id,
  }))
})



const handleDailyActivityChange = selectedValue => {
  // Tìm group tương ứng với giá trị được chọn
  const selectedGroup = Groups.value.find(group => group.title === selectedValue)

  // Nếu tìm thấy group, cập nhật giá trị formData.dailyactivityid
  if (selectedGroup) { 
    formData.value.dailyactivityid = selectedGroup.id
  } 
}

const onSubmit = async () => {
  // if (!validateFormData()) {
  //   console.error('Validation failed: Some fields are empty or invalid.')
    
  //   return
  // }



  try {
    const response = await axios.post('http://127.0.0.1:8000/api/operational-goal', formData.value, {
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

// const formData = ref({
//   time_slot_id: '',
// })
</script>
