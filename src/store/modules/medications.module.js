export default {
  namespaced: true,
  state: {
    medications: [
      {
        name: 'Cvetiapine',
        dosage: '25',
        unit: 'mg',
        notificationTime: '12:20'
      },
      {
        name: 'Venlafaxin',
        dosage: '75',
        unit: 'mg',
        notificationTime: '13:00'
      }
    ],
    units: [
      'mg',
      'g'
    ]
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
