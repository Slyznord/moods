<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-gap-2">
    <h2 class="tw-text-lg tw-font-semibold tw-text-ink/base dark:tw-text-sky/lighter">
      {{ $t('message.HOME_TEXT_SLEEP-HOURS') }}: {{ hours }}{{ $t('message.GLOBAL_TEXT_HOUR') }}
    </h2>

    <div class="tw-flex tw-items-center tw-w-full tw-gap-3">
      <div
        class="md-button md-button_outline md-button_circle tw-min-w-10"
        @click="decreaseHours"
      >
        -
      </div>

      <Slider
        :model-value="hours"
        :min="1"
        :max="24"
        :step="1"
        :pt="pt"
        class="tw-w-full tw-h-2"
        @update:model-value="updateSleepHours($event)"
      />

      <div
        class="md-button md-button_outline md-button_circle tw-min-w-10"
        @click="increaseHours"
      >
        +
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'primevue/slider'

import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'sleep-hours',
  components: {
    Slider
  },
  setup () {
    const store = useStore()
    const hours = computed(() => store.getters['dailyReport/getTargetReport'].sleepHours)
    const pt = {
      root: {
        class: ['tw-bg-sky/light dark:tw-bg-ink/base tw-rounded-xl']
      },
      range: {
        class: ['tw-bg-primary/base tw-rounded-l-xl']
      },
      handle: {
        class: ['tw-w-4 tw-h-4 tw-rounded-full tw-bg-primary/base tw-top-0 tw-bottom-0 tw-my-auto tw-outline-none -tw-ml-1']
      }
    }

    function increaseHours () {
      if (hours.value < 24) {
        updateSleepHours(hours.value += 0.5)
      }
    }

    function decreaseHours () {
      if (hours.value > 0) {
        updateSleepHours(hours.value -= 0.5)
      }
    }

    function updateSleepHours (value) {
      store.commit('dailyReport/setDailyReportDataByProperty', {
        property: 'sleepHours',
        value,
        timestamp: store.state.dailyReport.targetDate
      })
    }

    return {
      decreaseHours,
      increaseHours,
      hours,
      pt,
      updateSleepHours
    }
  }
}
</script>
