<script setup>
import UserProfileHeader from '@/views/pages/user-profile/UserProfileHeader.vue'
import UserConnections from '@/views/pages/user-profile/connections/index.vue'
import UserProfile from '@/views/pages/user-profile/profile/index.vue'
import UserProjects from '@/views/pages/user-profile/projects/index.vue'
import UserTeam from '@/views/pages/user-profile/team/index.vue'

definePage({
  meta: {
    navActiveLink: 'pages-user-profile-tab',
    key: 'tab',
  },
})

const route = useRoute('pages-user-profile-tab')

const activeTab = computed({
  get: () => route.params.tab,
  set: () => route.params.tab,
})

// tabs
const tabs = [
  {
    title: 'Profile',
    icon: 'tabler-user-check',
    tab: 'profile',
  },
  {
    title: 'Team',
    icon: 'tabler-users',
    tab: 'teams',
  },
  {
    title: 'Projects',
    icon: 'tabler-layout-grid',
    tab: 'projects',
  },
  {
    title: 'Connections',
    icon: 'tabler-link',
    tab: 'connections',
  },
]
</script>

<template>
  <div>
    <UserProfileHeader class="mb-5" />
    
    <div class="v-col v-col-12">
      <div class="v-card v-theme--dark v-card--density-default v-card--variant-elevated">
        <!----><div class="v-card__loader">
          <div
            class="v-progress-linear v-progress-linear--rounded v-progress-linear--rounded-bar v-progress-linear--rounded v-theme--dark v-locale--is-ltr"
            role="progressbar"
            aria-hidden="true"
            aria-valuemin="0"
            aria-valuemax="100"
            style="top: 0px; height: 0px; --v-progress-linear-height: 2px; left: 50%; transform: translateX(-50%);"
          >
            <!----><div
              class="v-progress-linear__background bg-primary"
              style="width: 100%;"
            /><div class="v-progress-linear__indeterminate">
              <div class="v-progress-linear__indeterminate long bg-primary" /><div class="v-progress-linear__indeterminate short bg-primary" />
            </div><!---->
          </div>
        </div><!----><!----><div class="v-card-item">
          <div class="v-card-item__prepend">
            <i
              class="v-icon notranslate v-theme--dark v-icon--size-default tabler-timeline v-icon notranslate v-theme--dark v-icon--size-default"
              aria-hidden="true"
            />
          </div><div class="v-card-item__content">
            <!----><!----><div class="v-card-title">
              Activity Timeline
            </div>
          </div><div class="v-card-item__append">
            <div data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:15:9">
              <button
                type="button"
                class="v-btn v-btn--icon v-theme--dark text-disabled v-btn--density-compact v-btn--size-default v-btn--variant-text"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-owns="v-menu-93"
              >
                <span class="v-btn__overlay" /><span class="v-btn__underlay" /><!----><span
                  class="v-btn__content"
                  data-no-activator=""
                ><i
                  class="v-icon notranslate v-theme--dark tabler-dots-vertical v-icon notranslate v-theme--dark"
                  aria-hidden="true"
                  style="font-size: 22px; height: 22px; width: 22px;"
                /><!----><!----></span><!----><!---->
              </button>
            </div>
          </div>
        </div><div class="v-card-text">
          <div
            class="v-timeline v-timeline--vertical v-timeline--align-start v-timeline--justify-auto v-timeline--truncate-line-start v-timeline--truncate-line-end v-theme--dark v-timeline--density-compact v-timeline--side-end v-locale--is-ltr v-timeline-density-compact"
            style="--v-timeline-line-thickness: 1px;"
          >
            <div
              class="v-timeline-item"
              style="--v-timeline-dot-size: 18px; --v-timeline-line-inset: 0px;"
            >
              <div class="v-timeline-item__body">
                <div
                  class="d-flex justify-space-between align-center flex-wrap"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:38:11"
                >
                  <span
                    class="app-timeline-title"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:39:13"
                  > Client Meeting </span><span
                    class="app-timeline-meta"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:42:13"
                  >Today</span>
                </div><p
                  class="app-timeline-text mb-2"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:44:11"
                >
                  Project meeting with john @10:15am
                </p><div
                  class="d-flex align-center mt-3"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:48:11"
                >
                  <div
                    class="v-avatar v-theme--dark v-avatar--density-default v-avatar--variant-flat me-3"
                    style="width: 38px; height: 38px;"
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
                        src="/src/assets/images/avatars/avatar-2.png"
                        alt=""
                        style=""
                      ><!----><!----><!----><!----><!---->
                    </div><!----><span class="v-avatar__underlay" />
                  </div><div data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:54:13">
                    <h6
                      class="text-sm font-weight-medium mb-n1"
                      data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:55:15"
                    >
                      Lester McCarthy (Client)
                    </h6><span
                      class="app-timeline-meta"
                      data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:58:15"
                    > CEO of Infidel </span>
                  </div>
                </div>
              </div><div class="v-timeline-divider">
                <div class="v-timeline-divider__before" /><div class="v-timeline-divider__dot v-timeline-divider__dot--size-x-small">
                  <div class="v-timeline-divider__inner-dot bg-warning">
                    <i
                      class="v-icon notranslate v-theme--dark v-icon--size-x-small"
                      aria-hidden="true"
                    ><!----></i>
                  </div>
                </div><div class="v-timeline-divider__after" />
              </div><!---->
            </div><div
              class="v-timeline-item"
              style="--v-timeline-dot-size: 18px; --v-timeline-line-inset: 0px;"
            >
              <div class="v-timeline-item__body">
                <div
                  class="d-flex justify-space-between align-center flex-wrap"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:69:11"
                >
                  <span
                    class="app-timeline-title"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:70:13"
                  > Create a new project for client 😎 </span><span
                    class="app-timeline-meta"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:73:13"
                  >2 Day Ago</span>
                </div><p
                  class="app-timeline-text mb-1"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:76:11"
                >
                  Add files to new design folder
                </p>
              </div><div class="v-timeline-divider">
                <div class="v-timeline-divider__before" /><div class="v-timeline-divider__dot v-timeline-divider__dot--size-x-small">
                  <div class="v-timeline-divider__inner-dot bg-primary">
                    <i
                      class="v-icon notranslate v-theme--dark v-icon--size-x-small"
                      aria-hidden="true"
                    ><!----></i>
                  </div>
                </div><div class="v-timeline-divider__after" />
              </div><!---->
            </div><div
              class="v-timeline-item"
              style="--v-timeline-dot-size: 18px; --v-timeline-line-inset: 0px;"
            >
              <div class="v-timeline-item__body">
                <div
                  class="d-flex justify-space-between align-center flex-wrap"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:85:11"
                >
                  <span
                    class="app-timeline-title"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:86:13"
                  > Shared 2 New Project Files </span><span
                    class="app-timeline-meta"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:89:13"
                  >6 Day Ago</span>
                </div><p
                  class="app-timeline-text mb-0"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:91:11"
                >
                  Sent by Mollie Dixon
                </p><div
                  class="d-flex align-center mt-3"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:94:11"
                >
                  <i
                    class="v-icon notranslate v-theme--dark text-warning me-2 tabler-file-text v-icon notranslate v-theme--dark text-warning me-2"
                    aria-hidden="true"
                    style="font-size: 20px; height: 20px; width: 20px;"
                  /><h6
                    class="font-weight-medium text-xs me-3"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:101:13"
                  >
                    App Guidelines
                  </h6><i
                    class="v-icon notranslate v-theme--dark text-success me-2 tabler-table v-icon notranslate v-theme--dark text-success me-2"
                    aria-hidden="true"
                    style="font-size: 20px; height: 20px; width: 20px;"
                  /><h6
                    class="font-weight-medium text-xs"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:111:13"
                  >
                    Testing Results
                  </h6>
                </div>
              </div><div class="v-timeline-divider">
                <div class="v-timeline-divider__before" /><div class="v-timeline-divider__dot v-timeline-divider__dot--size-x-small">
                  <div class="v-timeline-divider__inner-dot bg-info">
                    <i
                      class="v-icon notranslate v-theme--dark v-icon--size-x-small"
                      aria-hidden="true"
                    ><!----></i>
                  </div>
                </div><div class="v-timeline-divider__after" />
              </div><!---->
            </div><div
              class="v-timeline-item"
              style="--v-timeline-dot-size: 18px; --v-timeline-line-inset: 0px;"
            >
              <div class="v-timeline-item__body">
                <div
                  class="d-flex justify-space-between align-center flex-wrap"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:121:11"
                >
                  <span
                    class="app-timeline-title"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:122:13"
                  > Project status updated </span><span
                    class="app-timeline-meta"
                    data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:125:13"
                  >10 Day Ago</span>
                </div><p
                  class="app-timeline-text mb-1"
                  data-v-inspector="src/views/pages/user-profile/profile/ActivityTimeline.vue:127:11"
                >
                  WooCommerce iOS App Completed
                </p>
              </div><div class="v-timeline-divider">
                <div class="v-timeline-divider__before" /><div class="v-timeline-divider__dot v-timeline-divider__dot--size-x-small">
                  <div class="v-timeline-divider__inner-dot bg-secondary">
                    <i
                      class="v-icon notranslate v-theme--dark v-icon--size-x-small"
                      aria-hidden="true"
                    ><!----></i>
                  </div>
                </div><div class="v-timeline-divider__after" />
              </div><!---->
            </div>
          </div>
        </div><!----><!----><span class="v-card__underlay" />
      </div>
    </div>
    <VTabs
      v-model="activeTab"
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'pages-user-profile-tab', params: { tab: item.tab } }"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <!-- Profile -->
      <VWindowItem value="profile">
        <UserProfile />
      </VWindowItem>
      
      <!-- Teams -->
      <VWindowItem value="teams">
        <UserTeam />
      </VWindowItem>

      <!-- Projects -->
      <VWindowItem value="projects">
        <UserProjects />
      </VWindowItem>

      <!-- Connections -->
      <VWindowItem value="connections">
        <UserConnections />
      </VWindowItem>
    </VWindow>
  </div>
</template>
