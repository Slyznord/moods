<template>
  <div class="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-8">
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
        option-value="value"
        :options="selectButtonOptions"
        :label="$t('message.HOME_TEXT_THERAPY-TODAY')"
        @update:model-value="setDailyReportDataByProperty({ value: $event, property: 'therapy', timestamp: targetTimestamp })"
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

        <span class="tw-text-base tw-font-semibold tw-text-ink/dark dark:tw-text-sky/lighter">
          {{ $t('message.HOME_TEXT_MEDICATIONS') }}
        </span>
      </div>

      <div
        v-if="medications.length"
        class="tw-flex tw-flex-wrap tw-gap-4"
      >
        <option-button
          v-for="(item, index) in medications"
          :key="index"
          option-value="value"
          :options="selectButtonOptions"
          :model-value="getTargetReport.medications.includes(item.uuid)"
          :label="item?.name ? `${item.name}: ${item.dosage}${item.unit ?? ''}` : `${$t('message.MEDICATION_EMPTY_NAME')} ${ index + 1 }`"
          @update:model-value="updateMedicationRecord({ uuid: item.uuid, value: $event, timestamp: targetTimestamp })"
        />
      </div>

      <span
        v-else
        class="tw-text-sm tw-font-medium tw-text-ink/base dark:tw-text-sky/base tw-mx-auto"
      >
        {{ $t('message.MEDICATION_EMPTY_TEXT') }}
      </span>
    </div>

    <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-4">
      <h3 class="tw-text-base tw-font-semibold tw-text-ink/dark dark:tw-text-sky/lighter">
        {{ $t('message.GLOBAL_TEXT_NOTES') }}
      </h3>

      <textarea-prime
        :model-value="getTargetReport.notes"
        :placeholder="$t('message.GLOBAL_PLACEHOLDER_NOTES')"
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
import MedicationSettingsModal from '@/modules/medication-settings/medication-settings-modal.vue'
import OptionButton from '@/components/option-button.vue'
import SleepHours from './components/sleep-hours.vue'
import Stages from './components/stages.vue'
import TextareaPrime from 'primevue/textarea'

import icons from '@/utils/icons'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useModal } from 'vue-final-modal'
import { useI18n } from 'vue-i18n'

export default {
  name: 'home',
  components: {
    IconBase,
    HeaderComp,
    OptionButton,
    SleepHours,
    Stages,
    TextareaPrime
  },
  setup () {
    const { t } = useI18n()
    const store = useStore()

    const targetTimestamp = computed(() => store.state.dailyReport.targetDate)
    const getTargetReport = computed(() => store.getters['dailyReport/getTargetReport'])
    const setDailyReportDataByProperty = (payload) => store.commit('dailyReport/setDailyReportDataByProperty', payload)

    // Данные для отрисовки шкал по параметрам
    const parameters = computed(() => store.getters['dailyReport/getParametersForStages'])
    // Данные для отрисовки select-button терапии
    const selectButtonOptions = computed(() => [
      {
        label: t('message.GLOBAL_TEXT_YES'),
        value: true
      },
      {
        label: t('message.GLOBAL_TEXT_NO'),
        value: false
      }
    ])

    const { open: openMedicationSettings } = useModal({
      component: MedicationSettingsModal
    })
    const medications = computed(() => store.state.medications.medications || [])
    const updateMedicationRecord = ({ uuid, value, timestamp }) => {
      store.commit('dailyReport/updateMedicationRecord', {
        uuid,
        timestamp,
        value
      })
    }

    return {
      getTargetReport,
      icons,
      medications,
      openMedicationSettings,
      parameters,
      selectButtonOptions,
      setDailyReportDataByProperty,
      targetTimestamp,
      updateMedicationRecord
    }
  }
}
</script>
