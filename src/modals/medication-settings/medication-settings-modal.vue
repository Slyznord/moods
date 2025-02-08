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
  >
    <template #default>
      <div class="tw-flex tw-flex-col tw-w-full tw-items-start tw-gap-6 tw-overflow-y-auto">
        <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
          <h2 class="tw-text-lg tw-font-semibold tw-text-ink/base dark:tw-text-sky/lighter">{{ $t('message.medications') }}</h2>

          <div
            class="md-button md-button_primary"
            @click="appendMedication"
          >
            + {{ $t('message.add') }}
          </div>
        </div>

        <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-8">
          <div
            v-for="(item, index) in medications"
            :key="index"
            class="tw-flex tw-flex-col tw-items-end tw-w-full tw-gap-3"
          >
            <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-3">
              <input-comp
                :label="$t('message.medication_name')"
                :placeholder="$t('message.medication_name')"
                :model-value="item.name"
                @update:model-value="updateMedicationByProperty(index, $event, 'name')"
              />

              <div class="tw-flex tw-items-center tw-w-full tw-gap-4">
                <div class="tw-flex tw-items-end tw-min-w-[64%] tw-gap-2">
                  <input-comp
                    :label="$t('message.medication_notification_time')"
                    :placeholder="$t('message.medication_notification_time')"
                    disabled
                    :model-value="item.notificationTime"
                    @update:model-value="updateMedicationByProperty(index, $event, 'notificationTime')"
                  />

                  <div
                    class="md-button md-button_primary tw-w-10 tw-pointer-events-none tw-opacity-35"
                    @click="openTimeModal(index)"
                  >
                    <icon-base
                      :icon="icons.clock"
                      :width="24"
                      :height="24"
                      :view-box-size="[24, 24]"
                      fill="#FFF"
                    />
                  </div>
                </div>

                <div class="tw-flex tw-items-end tw-w-auto tw-gap-1">
                  <input-comp
                    :label="$t('message.medication_dosage')"
                    :placeholder="$t('message.medication_dosage')"
                    :model-value="item.dosage"
                    @update:model-value="updateMedicationByProperty(index, $event, 'dosage')"
                  />

                  <select-comp
                    :disabled="true"
                    :model-value="item.unit"
                    :options="units"
                    option-label="label"
                    @update:model-value="updateMedicationByProperty(index, $event, 'unit')"
                    @click="openChooseUnitModal"
                  >
                    <template #value="{ value }">
                      {{ value.label }}
                    </template>
                  </select-comp>
                </div>
              </div>
            </div>

            <div
              class="md-button md-button_outline"
              @click="onRemoveMedication(index)"
            >
              <icon-base
                :icon="icons.trash"
                :width="16"
                :height="16"
                :view-box-size="[16, 16]"
                fill="#6C7072"
              />

              {{ $t('message.remove') }}
            </div>
          </div>

          <span
            v-if="!medications.length"
            class="tw-text-sm tw-font-medium tw-text-sky/base dark:tw-text-sky/base tw-mx-auto"
          >
            {{ $t('message.medications_empty') }}
          </span>
        </div>
      </div>

      <div class="md-modal-line" />
    </template>
  </vue-final-modal>
</template>

<script>
import ChooseOptionModal from '@/modals/choose-option/choose-option-modal.vue'
import ChooseUnit from '@/components/choose-unit.vue'
import IconBase from '@/components/icon-base.vue'
import InputComp from '@/components/input-comp.vue'
import SelectComp from '@/components/select-comp.vue'
import TimeModal from '@/modals/time/time-modal.vue'
import icons from '@/utils/icons.js'

import { useStore } from 'vuex'
import { computed } from 'vue'
import { useModal, VueFinalModal } from 'vue-final-modal'
import i18n from '@/i18n.js'

export default {
  name: 'medication-settings-modal',
  components: {
    IconBase,
    InputComp,
    SelectComp,
    VueFinalModal
  },
  setup () {
    const store = useStore()

    const medications = computed(() => store.state.medications.medications)
    const units = computed(() => store.getters['medications/getUnits'])

    const { open: openChooseUnitModal } = useModal({
      component: ChooseOptionModal,
      attrs: {
        headline: i18n.global.t('message.choose_unit')
      },
      slots: {
        options: ChooseUnit
      }
    })

    function openTimeModal (index) {
      const { open } = useModal({
        component: TimeModal,
        attrs: {
          medicationIndex: index
        }
      })

      open()
    }

    function appendMedication () {
      store.commit('dailyReport/appendMedication', store.state.dailyReport.targetDate)
      store.commit('medications/appendMedication')
    }

    function onRemoveMedication (index) {
      store.commit('dailyReport/removeMedication', { index, timestamp: store.state.dailyReport.targetDate })
      store.commit('medications/removeMedication', index)
    }

    function updateMedicationByProperty (index, value, property) {
      store.commit('dailyReport/updateMedications', { index, value, property, timestamp: store.state.dailyReport.targetDate })
      store.commit('medications/updateMedicationByProperty', { index, value, property })
    }

    return {
      appendMedication,
      icons,
      medications,
      openChooseUnitModal,
      onRemoveMedication,
      openTimeModal,
      units,
      updateMedicationByProperty
    }
  }
}
</script>
