<template>
  <vue-final-modal
    class="md-modal-root"
    content-class="md-modal-content md-modal-content_calendar"
    overlay-class="md-modal-overlay"
    lock-scroll
    click-to-close
    swipe-to-close="down"
    content-transition="vfm-slide-down"
    @click-outside="$emit('update:model-value', false)"
  >
    <template #default>
      <Calendar
        inline
        :pt="ptOptions"
        :model-value="formattedTargetDate"
        :select-other-months="true"
        @update:model-value="changeDate($event)"
      >
        <template #date="{ date }">
          <div
            :class="[
              'md-calendar-day',
              isCompletedReport(date) ? 'md-calendar-day_completed' : (isFutureDay(date) ? '' : 'md-calendar-day_uncompleted'),
              { 'md-calendar-day_selected' : isSelectedDate(date) }
            ]"
          >
            {{ date.day }}
          </div>
        </template>
      </Calendar>
      <div class="md-modal-line" />
    </template>
  </vue-final-modal>
</template>

<script>
import Calendar from 'primevue/calendar'

import ReportFactory from '@/classes/Report.factory.js'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

export default {
  name: 'calendar-modal',
  components: {
    Calendar,
    VueFinalModal
  },
  setup (props, { emit }) {
    const store = useStore()

    const ptOptions = {
      root: {
        class: 'tw-w-full'
      },
      panel: {
        class: 'tw-bg-transparent'
      },
      header: {
        class: 'tw-bg-transparent tw-mb-5'
      },
      container: {
        class: 'tw-bg-transparent'
      },
      title: {
        class: 'tw-flex tw-items-center tw-gap-2'
      },
      monthtitle: {
        class: 'tw-text-2xl tw-font-semibold tw-text-ink/base dark:tw-text-sky/lighter'
      },
      yeartitle: {
        class: 'tw-text-2xl tw-font-semibold tw-text-ink/base dark:tw-text-sky/lighter'
      },
      weekday: {
        class: 'tw-text-sm tw-font-bold tw-text-ink/base dark:tw-text-sky/lighter'
      },
      day: {
        class: 'tw-py-1'
      },
      daylabel: {
        class: 'tw-flex tw-mx-auto tw-w-10 tw-h-10'
      },
      previousbutton: {
        class: 'tw-w-10 tw-h-10'
      },
      nextbutton: {
        class: 'tw-w-10 tw-h-10'
      },
      monthpicker: {
        class: 'tw-grid tw-grid-cols-3 tw-gap-4'
      },
      month: {
        class: 'tw-flex tw-justify-center tw-items-center tw-w-full tw-text-base dark:tw-text-sky/light tw-text-ink/base tw-font-medium'
      },
      decadetitle: {
        class: 'tw-text-2xl tw-font-semibold tw-text-ink/dark dark:tw-text-sky/light'
      },
      yearpicker: {
        class: 'tw-grid tw-grid-cols-2 tw-gap-4'
      },
      year: {
        class: 'tw-flex tw-justify-center tw-items-center tw-w-full tw-text-base dark:tw-text-sky/light tw-text-ink/base tw-font-medium'
      }
    }
    const targetDateTimestamp = computed(() => store.state.dailyReport.targetDate)
    const formattedTargetDate = computed(() => new Date(targetDateTimestamp.value))

    // Замена слеша на точку, запятую, дефис и т.д. приведет к тому,
    // что дата в ios будет возвращаться неправильная, а именно Null.
    // Особенность движка Safari :/
    const getDateTimestamp = ({ day, month, year }) => dayjs(`${year}/${month + 1}/${day}`).valueOf()

    function isCompletedReport (date) {
      const report = store.state.dailyReport.history.find(item => item.timestamp === getDateTimestamp(date))

      if (!report) {
        return false
      }

      return Object.values(report).every(value => {
        if (Array.isArray(value)) {
          return value.every(item => Object.hasOwn(item, 'value'))
        }

        return value !== undefined && value !== null
      })
    }

    function isFutureDay (date) {
      return getDateTimestamp(date) > Date.now()
    }

    function isSelectedDate (date) {
      return getDateTimestamp(date) === targetDateTimestamp.value
    }

    function changeDate (value) {
      const timestamp = dayjs(value).valueOf()

      if (timestamp > dayjs().valueOf()) return

      store.commit('dailyReport/setTargetDate', timestamp)

      const foundedReport = store.state.dailyReport.history.find(item => item.timestamp === timestamp)

      if (!foundedReport) {
        const reportFactory = new ReportFactory()
        const dailyReport = reportFactory.createDailyReport(timestamp)

        dailyReport.medications = JSON.parse(JSON.stringify(store.state.medications.medications))

        store.commit('dailyReport/appendReport', dailyReport.getReport())
      }

      emit('update:model-value', false)
    }

    return {
      changeDate,
      formattedTargetDate,
      isCompletedReport,
      isFutureDay,
      isSelectedDate,
      ptOptions
    }
  }
}
</script>
