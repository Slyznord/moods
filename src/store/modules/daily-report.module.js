import ReportFactory from '@/classes/Report.factory'

export default {
  namespaced: true,
  state: {
    history: [],
    parameters: [
      {
        property: 'vivacity',
        steps: 6,
        start: 0,
        label: 'Vivacity',
        value: null
      },
      {
        property: 'mood',
        steps: 7,
        start: -3,
        label: 'Mood',
        value: null
      },
      {
        property: 'irritability',
        steps: 6,
        start: 0,
        label: 'Irritability',
        value: null
      },
      {
        property: 'anxiety',
        steps: 6,
        start: 0,
        label: 'Anxiety',
        value: null
      }
    ],
    targetDate: null
  },
  getters: {
    getTargetReport (state) {
      return state.history.find(item => item.timestamp === state.targetDate)
    }
  },
  mutations: {
    appendMedication (state, timestamp) {
      /**
       * TODO: Подготовить класс фабрику для создания медикаментов
       */
      const report = state.history.find(item => item.timestamp === timestamp)
      report.medications.push({
        name: '',
        dosage: '',
        unit: 'mg',
        notificationTime: ''
      })
    },
    appendReport (state, report) {
      state.history.push(report)
    },
    setDailyReportDataByProperty (state, { property, value, timestamp }) {
      const report = state.history.find(item => item.timestamp === timestamp)
      report[property] = value
    },
    setTargetDate (state, timestamp) {
      state.targetDate = timestamp
    },
    removeMedication (state, { timestamp, index }) {
      const report = state.history.find(item => item.timestamp === timestamp)
      report.medications.splice(index, 1)
    },
    updateMedications (state, { index, value, timestamp, property }) {
      const report = state.history.find(item => item.timestamp === timestamp)
      report.medications[index][property] = value
    }
  },
  actions: {
    initDailyReport ({ state, commit, rootState }) {
      /**
       * Создаем экземпляр класса ежедневного отчета
       * @type {DailyReport}
       */
      const reportInstance = (new ReportFactory()).createDailyReport()
      /**
       * Пытаемся найти уже существующий отчет
       */
      const foundedReport = state.history.find(item => item.timestamp === reportInstance.getTimestamp())

      /**
       * Если отчета на текущую дату нету, то добавляем новый в историю отчетов
       */
      if (!foundedReport) {
        const newReport = reportInstance.getReport()

        newReport.medications = JSON.parse(JSON.stringify(rootState.medications.medications))
        commit('appendReport', newReport)
      }

      commit('setTargetDate', reportInstance.getTimestamp())
    }
  }
}
