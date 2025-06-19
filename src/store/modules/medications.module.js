import i18n from '@/i18n'
import { v4 as uuidv4 } from 'uuid'

export default {
  namespaced: true,
  state: {
    medications: []
  },
  getters: {
    getUnits () {
      return [
        {
          prop: 'mg',
          label: i18n.global.t('message.GLOBAL_UNIT_MG')
        },
        {
          prop: 'g',
          label: i18n.global.t('message.GLOBAL_UNIT_G')
        }
      ]
    }
  },
  mutations: {
    appendMedication (state) {
      state.medications.push({
        uuid: uuidv4(),
        name: null,
        dosage: 0,
        unit: 'mg',
        notificationTime: null
      })
    },
    removeMedication (state, index) {
      state.medications.splice(index, 1)
    },
    updateMedicationByProperty (state, { uuid, property, value }) {
      const targetMedication = state.medications.find(medication => medication.uuid === uuid)
      targetMedication[property] = value
    }
  }
}
