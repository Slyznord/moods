import { createStore } from 'vuex'

// Modules
import DailyReportModule from './modules/daily-report.module'
import MedicationsModule from './modules/medications.module'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  modules: {
    dailyReport: DailyReportModule,
    medications: MedicationsModule
  },
  plugins: [vuexLocal.plugin]
})
