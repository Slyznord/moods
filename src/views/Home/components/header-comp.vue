<template>
  <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
    <h2 class="tw-text-xl tw-font-semibold tw-text-ink/dark">Daily report</h2>

    <div
      class="md-button md-button_primary"
      @click="openCalendar"
    >
      <icon-base
        :icon="icons.calendar"
        :width="16"
        :height="16"
        :view-box-size="[16, 16]"
      />

      {{ targetDate }}
    </div>
  </div>
</template>

<script setup>
import CalendarModal from '@/modals/calendar-modal.vue'
import IconBase from '@/components/icon-base.vue'
import icons from '@/utils/icons'

import { useModal } from 'vue-final-modal'
import { useStore } from 'vuex'
import { computed } from 'vue'
import dayjs from 'dayjs'

const store = useStore()
const targetDate = computed(() => dayjs(store.state.dailyReport.targetDate).format('D MMM, ddd, YYYY'))
const { open: openCalendar } = useModal({
  component: CalendarModal
})
</script>
