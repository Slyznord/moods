import i18n from '@/i18n'

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
          label: i18n.global.t('message.mg')
        },
        {
          prop: 'g',
          label: i18n.global.t('message.g')
        }
      ]
    }
  },
  mutations: {
    appendMedication (state) {
      /**
       * TODO: Подготовить класс фабрику для создания медикаментов
       */
      state.medications.push({
        name: '',
        dosage: '',
        unit: 'mg',
        notificationTime: ''
      })
    },
    removeMedication (state, index) {
      state.medications.splice(index, 1)
    },
    updateMedicationByProperty (state, { index, value, property }) {
      state.medications[index][property] = value
    }
  }
}
