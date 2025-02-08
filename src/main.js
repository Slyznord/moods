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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker зарегистрирован с областью: ', registration.scope)
      })
      .catch((error) => {
        console.log('Ошибка при регистрации Service Worker: ', error);
      })
  })
}

app.config.productionTip = false

// app.use(Vue3TouchEvents)
app.use(store)
app.use(i18n)
app.use(router)
app.use(PrimeVue)
app.use(vfm)

app.mount('#app')
