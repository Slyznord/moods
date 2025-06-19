import i18n from '@/i18n.js'

import RuIcon from '@/assets/img/ru-icon.png'
import EngIcon from '@/assets/img/eng-icon.png'

export default {
  namespaced: true,
  state: {
    primeVueInstance: null
  },
  getters: {
    getCurrentLocale () {
      return i18n.global.locale.value
    },
    getCurrentMessages () {
      return i18n.global.messages.value[i18n.global.locale.value]
    },
    getLocales () {
      return {
        ru: {
          label: i18n.global.t('message.GLOBAL_TEXT_LANG-RU'),
          icon: RuIcon
        },
        en: {
          label: i18n.global.t('message.GLOBAL_TEXT_LANG-EN'),
          icon: EngIcon
        }
      }
    }
  },
  mutations: {
    setPrimeVueInstance (state, instance) {
      state.primeVueInstance = instance
    },
    updateI18nLocale (state, locale) {
      state.locale = locale
      i18n.global.locale.value = locale
    }
  },
  actions: {
    onChangeLanguage ({ commit, dispatch, getters }, locale) {
      commit('updateI18nLocale', locale)
      dispatch('updatePrimeVueLocalization', locale)
    },
    updatePrimeVueLocalization ({ state, getters }) {
      state.primeVueInstance.config.locale = { ...getters.getCurrentMessages?.primeVue }
    }
  }
}
