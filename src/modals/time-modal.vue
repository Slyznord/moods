<template>
  <vue-final-modal
    class="md-modal-root"
    content-class="md-modal-content"
    overlay-class="md-modal-overlay"
    lock-scroll
    click-to-close
    swipe-to-close="down"
    content-transition="vfm-slide-down"
    @click-outside="$emit('update:model-value', false)"
    @closed="$emit('update:model-value', false)"
  >
    <template #default>
      <calendar
        inline
        time-only
        :pt="calendarPt"
        :model-value="date"
        @update:model-value="updateMedicationByProperty($event)"
      />

      <div class="md-modal-line" />
    </template>
  </vue-final-modal>
</template>

<script setup>
import Calendar from 'primevue/calendar'
import { VueFinalModal } from 'vue-final-modal'
import { useStore } from 'vuex'
import dayjs from 'dayjs'

const props = defineProps({
  medicationIndex: {
    type: Number,
    required: true
  }
})
const store = useStore()
const calendarPt = {
  root: {
    class: ['tw-flex tw-justify-center tw-w-full']
  },
  datepickermask: {
    class: ['tw-bg-ink/base/65']
  },
  timepicker: {
    class: ['tw-pt-4 tw-gap-3']
  },
  hourpicker: {
    class: ['tw-flex tw-flex-col tw-items-center tw-gap-3 tw-text-xl tw-font-regular tw-text-ink/base']
  },
  minutepicker: {
    class: ['tw-flex tw-flex-col tw-items-center tw-gap-3 tw-text-xl tw-font-regular tw-text-ink/base']
  },
  panel: {
    class: ['tw-bg-white tw-rounded-lg']
  }
}

// Дата с нужным временем для компонента Calendar
const medication = store.state.medications.medications[props.medicationIndex].notificationTime.split(':')
const [hour, minutes] = medication
const date = (new Date())

date.setHours(parseInt(hour))
date.setMinutes(parseInt(minutes))

function updateMedicationByProperty (value) {
  const formattedValue = dayjs(value).format('HH:mm')
  const payload = {
    index: props.medicationIndex,
    value: formattedValue,
    property: 'notificationTime',
    timestamp: store.state.dailyReport.targetDate
  }

  store.commit('dailyReport/updateMedications', payload)
  store.commit('medications/updateMedicationByProperty', payload)
}
</script>
