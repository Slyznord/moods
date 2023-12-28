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
      <div class="tw-flex tw-flex-col tw-w-full tw-items-start tw-gap-6 tw-overflow-y-auto">
        <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
          <h2 class="tw-text-lg tw-font-semibold tw-text-ink/base">Medication</h2>

          <div
            class="md-button md-button_primary"
            @click="appendMedication"
          >
            + Add
          </div>
        </div>

        <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-8">
          <div
            v-for="(item, index) in medications"
            :key="index"
            class="tw-flex tw-flex-col tw-items-end tw-w-full tw-gap-3"
          >
            <div class="tw-flex tw-flex-col tw-items-start tw-w-full tw-gap-3">
              <input-text
                label="Medication name"
                placeholder="medication name"
                :model-value="item.name"
                @update:model-value="updateMedicationByProperty(index, $event, 'name')"
              />

              <div class="tw-flex tw-items-center tw-w-full tw-gap-4">
                <div class="tw-flex tw-items-end tw-min-w-[64%] tw-gap-2">
                  <input-text
                    label="Time"
                    placeholder="notification time"
                    disabled
                    :model-value="item.notificationTime"
                    @update:model-value="updateMedicationByProperty(index, $event, 'notificationTime')"
                  />

                  <div
                    class="md-button md-button_primary tw-w-10"
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

                <div class="tw-flex tw-items-end tw-w-auto tw-gap-2">
                  <input-text
                    label="Dosage"
                    placeholder="dosage"
                    :model-value="item.dosage"
                    @update:model-value="updateMedicationByProperty(index, $event, 'dosage')"
                  />

                  <dropdown
                    :model-value="item.unit"
                    :options="store.state.medications.units"
                    @update:model-value="updateMedicationByProperty(index, $event, 'unit')"
                  />
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
              Remove
            </div>
          </div>
        </div>
      </div>

      <div class="md-modal-line" />
    </template>
  </vue-final-modal>
</template>

<script setup>
import Dropdown from '@/components/dropdown.vue'
import IconBase from '@/components/icon-base.vue'
import InputText from '@/components/input-text.vue'
import TimeModal from '@/modals/time-modal.vue'
import icons from '@/utils/icons'

import { useStore } from 'vuex'
import { computed } from 'vue'
import { useModal, VueFinalModal } from 'vue-final-modal'

const store = useStore()
const medications = computed(() => store.state.medications.medications)

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
</script>
