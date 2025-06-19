import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

// Modules
import DailyReport from './modules/daily-report.module'
import Medications from './modules/medications.module'
import Localization from './modules/localization.module.js'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {
    darkMode: false
  },
  mutations: {
    setColorMode (state, value) {
      state.darkMode = value
      document.querySelector('html').setAttribute('data-mode', value ? 'dark' : 'light')
    }
  },
  modules: {
    dailyReport: DailyReport,
    medications: Medications,
    localization: Localization
  },
  plugins: [vuexLocal.plugin]
})
