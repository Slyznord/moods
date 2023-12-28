<template>
  <div class="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-8">
    <header-comp />
    <sleep-hours />

    <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-4">
      <stages
        v-for="item in parameters"
        :key="item.label"
        :label="item.label"
        :start="item.start"
        :steps="item.steps"
        :model-value="store.getters['dailyReport/getTargetReport'][item.property]"
        :property="item.property"
        @update:model-value="store.commit('dailyReport/setDailyReportDataByProperty', { value: $event.value, property: $event.property, timestamp: targetTimestamp })"
      />

      <select-button
        :model-value="store.getters['dailyReport/getTargetReport'].therapy"
        :options="therapyOptions"
        label="Therapy today"
        @update:model-value="store.commit('dailyReport/setDailyReportDataByProperty', { value: $event, timestamp: targetTimestamp, property: 'therapy' })"
      />
    </div>

    <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-5">
      <div class="tw-flex tw-items-center tw-gap-2">
        <icon-base
          :icon="icons.settings_outline"
          :width="20"
          :height="20"
          :view-box-size="[24, 24]"
          @click="openMedicationSettings"
        />

        <span class="tw-text-base tw-font-semibold tw-text-ink/dark">Medications</span>
      </div>

      <div class="tw-flex tw-flex-wrap tw-gap-4">
        <select-button
          v-for="(item, index) in medications"
          :key="index"
          :options="['yes', 'no']"
          :model-value="item.value || ''"
          :label="`${item.name}: ${item.dosage}${item.unit}`"
          @update:model-value="store.commit('dailyReport/updateMedications', { index, value: $event, timestamp: targetTimestamp, property: 'value' })"
        />
      </div>

      <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-4">
        <h3 class="tw-text-base tw-font-semibold tw-text-ink/dark">Notes</h3>

        <Textarea
          :model-value="store.getters['dailyReport/getTargetReport'].notes"
          auto-resize
          placeholder="Your notes"
          class="tw-w-full tw-border tw-border-sky/base tw-rounded-lg tw-min-h-[96px] tw-outline-none tw-py-3 tw-px-3 tw-text-base tw-font-regular tw-text-ink/base tw-resize-none tw-placeholder:text-sky/dark focus:tw-border-primary/base"
          @update:model-value="store.commit('dailyReport/setDailyReportDataByProperty', { value: $event, timestamp: targetTimestamp, property: 'notes' })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderComp from './components/header-comp.vue'
import IconBase from '@/components/icon-base.vue'
import MedicationSettingsModal from '@/modals/medication-settings-modal.vue'
import SelectButton from '@/components/select-button.vue'
import SleepHours from './components/sleep-hours.vue'
import Stages from './components/stages.vue'
import Textarea from 'primevue/textarea'
import icons from '@/utils/icons'

import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useModal } from 'vue-final-modal'

const store = useStore()
const { open: openMedicationSettings } = useModal({
  component: MedicationSettingsModal
})

const medications = computed(() => store.getters['dailyReport/getTargetReport']?.medications || [])

// Данные для отрисовки шкал по параметрам
const parameters = computed(() => store.state.dailyReport.parameters)

// Данные для отрисовки select-button терапии
const therapyOptions = ref(['yes', 'no'])

const targetTimestamp = computed(() => store.state.dailyReport.targetDate)
</script>
