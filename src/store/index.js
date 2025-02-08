import { createStore } from 'vuex'

// Modules
import DailyReportModule from './modules/daily-report.module'
import MedicationsModule from './modules/medications.module'

// Icons
import RuIcon from '@/assets/img/ru-icon.png'
import EngIcon from '@/assets/img/eng-icon.png'

// Utils and plugins
// import VuexPersistence from 'vuex-persist'
import i18n from '@/i18n'

// let plugins = []
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
//
// if (process.env.NODE_ENV === 'production') {
//   plugins = [...plugins, vuexLocal.plugin]
// }

export default createStore({
  state: {
    darkMode: false,
    locale: null
  },
  getters: {
    getLocales () {
      return {
        ru: {
          label: i18n.global.t('message.language_ru'),
          icon: RuIcon
        },
        en: {
          label: i18n.global.t('message.language_en'),
          icon: EngIcon
        }
      }
    }
  },
  mutations: {
    setColorMode (state, value) {
      state.darkMode = value
      document.querySelector('html').setAttribute('data-mode', value ? 'dark' : 'light')
    },
    setLanguage (state, lng) {
      state.locale = lng
      i18n.global.locale.value = lng
    }
  },
  modules: {
    dailyReport: DailyReportModule,
    medications: MedicationsModule
  }
})
