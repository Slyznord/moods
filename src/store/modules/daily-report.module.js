import ReportFactory from '@/classes/Report.factory'
import i18n from '@/i18n'

export default {
  namespaced: true,
  state: {
    history: [],
    targetDate: null
  },
  getters: {
    getTargetReport (state) {
      return state.history.find(item => item.timestamp === state.targetDate)
    },
    getParametersForStages () {
      return [
        {
          property: 'vivacity',
          steps: 6,
          start: 0,
          label: i18n.global.t('message.HOME_STAGE_VIVACITY'),
          value: null
        },
        {
          property: 'mood',
          steps: 7,
          start: -3,
          label: i18n.global.t('message.HOME_STAGE_MOOD'),
          value: null
        },
        {
          property: 'irritability',
          steps: 6,
          start: 0,
          label: i18n.global.t('message.HOME_STAGE_IRRITABILITY'),
          value: null
        },
        {
          property: 'anxiety',
          steps: 6,
          start: 0,
          label: i18n.global.t('message.HOME_STAGE_ANXIETY'),
          value: null
        }
      ]
    }
  },
  mutations: {
    appendMedication (state, timestamp) {
      const report = state.history.find(item => item.timestamp === timestamp)
      report.medications.push({
        name: null,
        dosage: null,
        units: 'mg',
        notificationTime: null
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
    updateMedicationRecord (state, { uuid, value, timestamp }) {
      const report = state.history.find(item => item.timestamp === timestamp)
      const medicationIndex = report.medications.findIndex(medicationUUID => medicationUUID === uuid)

      if (value && medicationIndex === -1) {
        report.medications.push(uuid)
      } else {
        report.medications.splice(medicationIndex, 1)
      }
    }
  },
  actions: {
    initDailyReport ({ state, commit, rootState }) {
      /**
       * Создаем экземпляр класса ежедневного отчета
       * @type { DailyReport }
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
