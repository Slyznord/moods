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
              class="tw-flex tw-flex-col tw-items-center tw-w-full tw-gap-1"
            >
              <template #default="{ isActive }">
                <icon-base
                  :icon="isActive ? item.icon.fill : item.icon.outline"
                />

                <span
                  :class="[
                    'tw-text-sm tw-font-medium tw-text-ink/base',
                    { 'tw-text-primary/base tw-font-semibold' : isActive }
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
            <span class="tw-text-sm tw-font-medium tw-text-ink/base">{{ item.name }}</span>
          </div>
        </div>
      </template>
    </bottom-menu>

    <modals-container />
  </div>
</template>

<script setup>
import BottomMenu from '@/components/bottom-menu.vue'
import IconBase from '@/components/icon-base.vue'
import { ModalsContainer } from 'vue-final-modal'

import icons from '@/utils/icons'

import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const menu = [
  {
    name: 'Daily',
    icon: {
      outline: icons.chart_outline,
      fill: icons.chart_fill
    },
    url: '/',
    onClick: () => {}
  },
  {
    name: 'Decartes',
    icon: {
      outline: icons.category_outline,
      fill: icons.category_fill
    },
    url: '/decartes',
    onClick: () => {}
  },
  {
    name: 'Analytics',
    icon: {
      outline: icons.graph_outline,
      fill: icons.graph_fill
    },
    url: '/analytics',
    onClick: () => {}
  },
  {
    name: 'Settings',
    icon: {
      outline: icons.settings_outline,
      fill: icons.graph_fill
    },
    url: null,
    onClick: () => {}
  }
]

onMounted(() => {
  store.dispatch('dailyReport/initDailyReport')

  setInterval(() => {
    store.dispatch('dailyReport/initDailyReport')
  }, 3600000)
})
</script>
