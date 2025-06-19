<template>
  <div class="tw-relative">
    <div class="tw-flex tw-flex-col tw-w-full tw-h-contentHeight tw-px-4 tw-pt-6 tw-overflow-y-auto">
      <router-view />
    </div>

    <bottom-menu>
      <template #default>
        <div
          v-for="(item, index) in menu"
          :key="index"
          class="tw-flex tw-flex-col tw-items-center tw-px-2"
        >
          <div v-if="item.url">
            <router-link
              :to="item.url"
              :class="[
                'tw-flex tw-flex-col tw-items-center tw-w-full tw-gap-1 tw-relative',
                { 'tw-pointer-events-none tw-opacity-55' : item.inDevelopment }
              ]"
            >
              <template #default="{ isActive }">
                <icon-base
                  :icon="isActive ? item.icon.fill : item.icon.outline"
                />

                <span
                  :class="[
                    'tw-text-sm tw-font-medium tw-text-ink/base dark:tw-text-sky/lighter',
                    { 'tw-text-primary/base dark:tw-text-primary/base tw-font-semibold' : isActive }
                  ]"
                >
                  {{ item.name }}
                </span>
              </template>
            </router-link>
          </div>

          <div
            v-else
            class="tw-flex tw-flex-col tw-items-center tw-w-full tw-gap-1"
            @click="item.onClick"
          >
            <icon-base :icon="item.icon.outline" />

            <span class="tw-text-sm tw-font-medium tw-text-ink/base dark:tw-text-sky/lighter">
              {{ item.name }}
            </span>
          </div>
        </div>
      </template>
    </bottom-menu>

    <modals-container />
  </div>
</template>

<script>
import BottomMenu from '@/modules/bottom-menu/bottom-menu.vue'
import IconBase from '@/components/icon-base.vue'
import SettingsModal from '@/modules/settings/settings-modal.vue'
import icons from '@/utils/icons'

import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { ModalsContainer, useModal } from 'vue-final-modal'
import { useI18n } from 'vue-i18n'

export default {
  name: 'app',
  components: {
    BottomMenu,
    IconBase,
    ModalsContainer
  },
  setup () {
    const store = useStore()
    const { t } = useI18n()

    const { open: openSettingsModal } = useModal({
      component: SettingsModal
    })

    const menu = computed(() => [
      {
        name: t('message.GLOBAL_MENU_DAILY'),
        icon: {
          outline: icons.chart_outline,
          fill: icons.chart_fill
        },
        inDevelopment: false,
        url: '/',
        onClick: () => {}
      },
      {
        name: t('message.GLOBAL_MENU_ANOTHER'),
        icon: {
          outline: icons.category_outline,
          fill: icons.category_fill
        },
        inDevelopment: true,
        url: '/decartes',
        onClick: () => {}
      },
      {
        name: t('message.GLOBAL_MENU_ANALYTICS'),
        icon: {
          outline: icons.graph_outline,
          fill: icons.graph_fill
        },
        inDevelopment: true,
        url: '/analytics',
        onClick: () => {}
      },
      {
        name: t('message.GLOBAL_MENU_SETTINGS'),
        icon: {
          outline: icons.settings_outline,
          fill: icons.graph_fill
        },
        inDevelopment: false,
        url: null,
        onClick: () => openSettingsModal()
      }
    ])

    onMounted(() => {
      store.dispatch('dailyReport/initDailyReport')

      if (store.state.darkMode) {
        document.querySelector('html').setAttribute('data-mode', 'dark')
      }

      setInterval(() => {
        store.dispatch('dailyReport/initDailyReport')
      }, 3600000)
    })

    return {
      menu
    }
  }
}
</script>
