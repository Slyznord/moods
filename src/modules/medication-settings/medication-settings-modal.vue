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
      <div class="tw-flex tw-flex-col tw-w-full tw-items-start tw-gap-7 tw-overflow-y-auto">
        <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
          <h2 class="tw-text-lg tw-font-semibold tw-text-ink/base dark:tw-text-sky/lighter">
            {{ $t('message.MEDICATION_HEADLINE') }}
          </h2>

          <div
            class="md-button md-button_primary"
            @click="appendMedication"
          >
            + {{ $t('message.GLOBAL_BUTTON_ADD') }}
          </div>
        </div>

        <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-8">
          <div
            v-for="(item, index) in medications"
            :key="index"
            class="tw-flex tw-flex-col tw-items-end tw-w-full tw-gap-3"
          >
            <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-3">
              <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
                <h3 class="tw-text-lg tw-font-medium tw-text-ink/base dark:tw-text-sky/white">
                  {{ item?.name || `${$t('message.MEDICATION_EMPTY_NAME')} ${index + 1}` }}
                </h3>

                <div
                  class="md-button md-button_outline"
                  @click="onRemoveMedication(index)"
                >
                  Удалить
                </div>
              </div>

              <input-comp
                :label="$t('message.MEDICATION_LABEL_NAME')"
                :placeholder="$t('message.MEDICATION_PLACEHOLDER_MEDICATION-NAME')"
                :model-value="item.name"
                @update:model-value="updateMedicationByProperty({ uuid: item.uuid, property: 'name', value: $event })"
              />

              <div class="tw-column-start tw-w-full tw-gap-3">
                <!-- Время приёма -->
                <div class="tw-flex tw-items-end tw-w-full tw-gap-2">
                  <input-comp
                    :label="$t('message.MEDICATION_LABEL_TIME')"
                    :placeholder="$t('message.MEDICATION_PLACEHOLDER_TIME')"
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

                <!-- Дозировка -->
                <div class="tw-flex tw-items-end tw-w-full tw-gap-1">
                  <input-comp
                    :label="$t('message.MEDICATION_LABEL_DOSAGE')"
                    :placeholder="$t('message.MEDICATION_PLACEHOLDER_DOSAGE')"
                    :model-value="item.dosage"
                    @update:model-value="updateMedicationByProperty({ uuid: item.uuid, property: 'dosage', value: $event })"
                  />

                  <select-comp
                    :disabled="true"
                    :model-value="item.unit"
                    :options="units"
                    option-label="label"
                    option-value="prop"
                    @click="openChooseUnitModal(item?.uuid)"
                  />
                </div>
              </div>
            </div>
          </div>

          <span
            v-if="!medications.length"
            class="tw-text-sm tw-font-medium tw-text-sky/base dark:tw-text-sky/base tw-mx-auto"
          >
            {{ $t('message.MEDICATION_EMPTY_TEXT') }}
          </span>
        </div>
      </div>

      <div class="md-modal-line" />
    </template>
  </vue-final-modal>
</template>

<script>
import ChooseOptionModal from '@/components/choose-option/choose-option-modal.vue'
import ChooseUnit from '@/modules/medication-settings/components/choose-unit.vue'
import IconBase from '@/components/icon-base.vue'
import InputComp from '@/components/input-comp.vue'
import SelectComp from '@/components/select-comp.vue'
import TimeModal from '@/modules/time/time-modal.vue'
import icons from '@/utils/icons.js'

import i18n from '@/i18n.js'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { VueFinalModal, useModal, useVfm } from 'vue-final-modal'

export default {
  name: 'medication-settings-modal',
  components: {
    IconBase,
    InputComp,
    SelectComp,
    VueFinalModal
  },
  emits: ['update:model-value'],
  setup () {
    const store = useStore()

    const medications = computed(() => store.state.medications.medications)
    const units = computed(() => store.getters['medications/getUnits'])

    const openChooseUnitModal = (uuid) => {
      const vfm = useVfm()
      const { open } = useModal({
        component: ChooseOptionModal,
        attrs: {
          headline: i18n.global.t('message.MEDICATION_BUTTON_CHOOSE-UNIT')
        },
        slots: {
          options: {
            component: ChooseUnit,
            attrs: {
              onSelect: (value) => {
                store.commit('medications/updateMedicationByProperty', {
                  uuid,
                  property: 'unit',
                  value
                })
                vfm.close('choose-option')
              }
            }
          }
        }
      })

      open()
    }

    const appendMedication = () => store.commit('medications/appendMedication')
    const openTimeModal = (index) => {
      const { open } = useModal({
        component: TimeModal,
        attrs: {
          medicationIndex: index
        }
      })

      open()
    }
    const onRemoveMedication = (index) => {
      store.commit('dailyReport/removeMedication', { index, timestamp: store.state.dailyReport.targetDate })
      store.commit('medications/removeMedication', index)
    }
    const updateMedicationByProperty = ({ uuid, property, value }) => {
      store.commit('medications/updateMedicationByProperty', {
        uuid,
        property,
        value
      })
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
