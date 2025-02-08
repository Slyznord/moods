<template>
  <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
    <h2 class="tw-text-xl tw-font-semibold tw-text-ink/dark dark:tw-text-sky/lighter">{{ $t('message.daily_headline') }}</h2>

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

<script>
import CalendarModal from '@/modals/calendar/calendar-modal.vue'
import IconBase from '@/components/icon-base.vue'
import icons from '@/utils/icons'

import { useModal } from 'vue-final-modal'
import { useStore } from 'vuex'
import { computed } from 'vue'
import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

export default {
  name: 'header-comp',
  components: {
    IconBase
  },
  setup () {
    const store = useStore()
    const { locale } = useI18n()
    const targetDate = computed(() => dayjs(store.state.dailyReport.targetDate).locale(locale.value).format('D MMM, ddd, YYYY'))
    const { open: openCalendar } = useModal({
      component: CalendarModal
    })

    return {
      icons,
      openCalendar,
      targetDate
    }
  }
}
</script>
