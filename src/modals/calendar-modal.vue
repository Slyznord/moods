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
    @closed="$emit('update:model-value', false)"
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

<script setup>
import Calendar from 'primevue/calendar'

import ReportFactory from '@/classes/Report.factory'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

const store = useStore()

const emits = defineEmits(['update:model-value', 'hide'])

const ptOptions = {
  root: {
    class: ['tw-w-full']
  },
  header: {
    class: ['tw-mb-5']
  },
  title: {
    class: ['tw-flex tw-items-center tw-gap-2']
  },
  monthtitle: {
    class: ['tw-text-2xl tw-font-semibold tw-text-ink/base']
  },
  yeartitle: {
    class: ['tw-text-2xl tw-font-semibold tw-text-ink/base']
  },
  weekday: {
    class: ['tw-text-sm tw-font-bold tw-text-ink/base']
  },
  day: {
    class: ['tw-py-1']
  }
}
const targetDateTimestamp = computed(() => store.state.dailyReport.targetDate)
const formattedTargetDate = computed(() => new Date(targetDateTimestamp.value))

const getDateTimestamp = ({ day, month, year }) => dayjs(`${year},${month + 1},${day}`).valueOf()

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

  emits('update:model-value', false)
}
</script>
