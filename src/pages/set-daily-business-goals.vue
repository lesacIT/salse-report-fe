<script setup>
import * as demoCode from '@/views/demos/forms/form-wizard/form-wizard-icons/demoCodeFormWizardIcons'
import DemoFormWizardIconsModernBasic from '@/views/demos/forms/form-wizard/form-wizard-icons/Formsetdailygoals.vue'
</script>

<template>
  <VRow>
    <!-- 👉 Modern Basic -->
    <VCol
      cols="12"
      variant="outlined"
    >
      <AppCardCode
        variant="outlined"
        title="Lập mục tiêu ngày"
        :code="demoCode.modernBasic"
      >
        <div class="v-card-text d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
          <div
            class="d-flex h-0"
            data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:23:7"
          >
            <div
              class="v-avatar v-theme--light v-avatar--density-default v-avatar--rounded v-avatar--variant-flat user-profile-avatar mx-auto"
              style="width: 120px; height: 120px;"
            >
              <div
                class="v-responsive v-img"
                aria-label=""
              >
                <div
                  class="v-responsive__sizer"
                  style="padding-bottom: 100%;"
                /><img
                  class="v-img__img v-img__img--cover"
                  src="/src/assets/images/avatars/avatar-1.png"
                  alt=""
                  style=""
                ><!----><!----><!----><!----><!---->
              </div><!----><span class="v-avatar__underlay" />
            </div>
          </div><div
            class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0"
            data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:32:7"
          >
            <h5
              class="text-h5 text-center text-sm-start font-weight-medium mb-3"
              data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:33:9"
            >
              Nguyễn Văn A
            </h5><div
              class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4"
              data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:37:9"
            >
              <div
                class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-4"
                data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:38:11"
              >
                <span
                  class="d-flex"
                  data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:39:13"
                ><i
                  class="v-icon notranslate v-theme--light me-1 tabler-calendar  v-icon notranslate v-theme--light me-1"
                  aria-hidden="true"
                  style="font-size: 20px; height: 20px; width: 20px;"
                /><span
                  class="text-body-1"
                  data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:45:15"
                >DA014656</span></span><span
                  class="d-flex"
                  data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:50:13"
                ><i
                  class="v-icon notranslate v-theme--light me-1 tabler-color-swatch v-icon notranslate v-theme--light me-1"
                  aria-hidden="true"
                  style="font-size: 20px; height: 20px; width: 20px;"
                /><span
                  class="text-body-1"
                  data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:56:15"
                >SOUTHIII</span></span><span
                  class="d-flex"
                  data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:61:13"
                ><i
                  class="v-icon notranslate v-theme--light me-1 tabler-map-pin v-icon notranslate v-theme--light me-1"
                  aria-hidden="true"
                  style="font-size: 20px; height: 20px; width: 20px;"
                /><span
                  class="text-body-1"
                  data-v-inspector="src/views/pages/user-profile/UserProfileHeader.vue:67:15"
                >Hậu Giang</span></span>
              </div>
            </div>
          </div>
        </div>
        <DemoFormWizardIconsModernBasic />
      </AppCardCode>
    </VCol>
  </VRow>
</template>
