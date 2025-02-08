<template>
  <div
    class="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-8"
    v-touch:swipe.left="onSwipeHandler"
    v-touch:swipe.right="onSwipeHandler"
  >
    <header-comp />
    <sleep-hours />

    <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-5">
      <stages
        v-for="item in parameters"
        :key="item.label"
        :label="item.label"
        :start="item.start"
        :steps="item.steps"
        :model-value="getTargetReport[item.property]"
        :property="item.property"
        @update:model-value="setDailyReportDataByProperty({ value: $event.value, property: $event.property, timestamp: targetTimestamp })"
      />

      <option-button
        :model-value="getTargetReport.therapy"
        :options="selectButtonOptions"
        :label="$t('message.therapy_today')"
        @update:model-value="setDailyReportDataByProperty({ value: $event, timestamp: targetTimestamp, property: 'therapy' })"
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

        <span class="tw-text-base tw-font-semibold tw-text-ink/dark dark:tw-text-sky/lighter">{{ $t('message.medications') }}</span>
      </div>

      <div
        v-if="medications.length"
        class="tw-flex tw-flex-wrap tw-gap-4"
      >
        <option-button
          v-for="(item, index) in medications"
          :key="index"
          :options="selectButtonOptions"
          :model-value="item.value || ''"
          :label="`${item.name}: ${item.dosage}${item.unit.label}`"
          @update:model-value="updateMedications({ index, value: $event, timestamp: targetTimestamp, property: 'value' })"
        />
      </div>

      <span
        v-else
        class="tw-text-sm tw-font-medium tw-text-ink/base dark:tw-text-sky/base tw-mx-auto"
      >
        {{ $t('message.medication_empty') }}
      </span>
    </div>

    <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-4">
      <h3 class="tw-text-base tw-font-semibold tw-text-ink/dark dark:tw-text-sky/lighter">{{ $t('message.notes') }}</h3>

      <Textarea
        :model-value="getTargetReport.notes"
        :placeholder="$t('message.notes_placeholder')"
        auto-resize
        class="tw-w-full tw-border tw-border-sky/base dark:tw-border-ink/dark dark:tw-bg-ink/dark tw-rounded-lg tw-min-h-[96px] tw-outline-none tw-py-3 tw-px-3 tw-text-base tw-font-regular tw-text-ink/base dark:tw-text-sky/lighter tw-resize-none tw-placeholder:text-sky/dark focus:tw-border-primary/base"
        @update:model-value="setDailyReportDataByProperty({ value: $event, timestamp: targetTimestamp, property: 'notes' })"
      />
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/icon-base.vue'
import HeaderComp from './components/header-comp.vue'
import MedicationSettingsModal from '@/modals/medication-settings/medication-settings-modal.vue'
import OptionButton from '@/components/option-button.vue'
import SleepHours from './components/sleep-hours.vue'
import Stages from './components/stages.vue'
import Textarea from 'primevue/textarea'
import icons from '@/utils/icons'

import { computed } from 'vue'
import { useStore } from 'vuex'
import { useModal } from 'vue-final-modal'
import { useI18n } from 'vue-i18n'
import ReportFactory from '@/classes/Report.factory'

export default {
  name: 'home',
  components: {
    IconBase,
    HeaderComp,
    OptionButton,
    SleepHours,
    Stages,
    Textarea
  },
  setup () {
    const { t } = useI18n()
    const store = useStore()
    const { open: openMedicationSettings } = useModal({
      component: MedicationSettingsModal
    })

    const medications = computed(() => store.getters['dailyReport/getTargetReport']?.medications || [])

    // Данные для отрисовки шкал по параметрам
    const parameters = computed(() => store.getters['dailyReport/getParametersForStages'])

    // Данные для отрисовки select-button терапии
    const selectButtonOptions = computed(() => [t('message.yes'), t('message.no')])

    const targetTimestamp = computed(() => store.state.dailyReport.targetDate)

    function onSwipeHandler (direction) {
      const day = 86400000
      const targetDay = direction === 'left' ? targetTimestamp.value + day : targetTimestamp.value - day

      store.commit('dailyReport/setTargetDate', targetDay)

      const foundedReport = store.state.dailyReport.history.find(item => item.timestamp === targetDay)

      if (!foundedReport) {
        const reportFactory = new ReportFactory()
        const dailyReport = reportFactory.createDailyReport(targetDay)

        dailyReport.medications = JSON.parse(JSON.stringify(store.state.medications.medications))

        store.commit('dailyReport/appendReport', dailyReport.getReport())
      }
    }

    return {
      getTargetReport: computed(() => store.getters['dailyReport/getTargetReport']),
      icons,
      medications,
      onSwipeHandler,
      openMedicationSettings,
      parameters,
      selectButtonOptions,
      setDailyReportDataByProperty: (payload) => store.commit('dailyReport/setDailyReportDataByProperty', payload),
      targetTimestamp,
      updateMedications: (payload) => store.commit('dailyReport/updateMedications', payload)
    }
  }
}
</script>
