import { createI18n } from 'vue-i18n'
import messages from '@/locales/index'

const vuex = JSON.parse(localStorage.getItem('vuex'))
const i18n = createI18n({
  legacy: false,
  locale: vuex?.localization.locale || 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
