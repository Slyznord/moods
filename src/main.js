import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import '@/styles/main.scss'

import i18n from '@/i18n'

const app = createApp(App)
const vfm = createVfm()

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker зарегистрирован с областью: ', registration.scope)
      })
      .catch((error) => {
        console.log('Ошибка при регистрации Service Worker: ', error)
      })
  })
}

app.config.productionTip = false

// app.use(Vue3TouchEvents)
app.use(store)
app.use(i18n)
app.use(router)
app.use(PrimeVue, {
  locale: {
    ...i18n.global.messages.value[i18n.global.locale.value]?.primeVue
  }
})
app.use(vfm)

store.commit('localization/setPrimeVueInstance', app.config.globalProperties.$primevue)

app.mount('#app')
