import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import '@/styles/main.scss'
import Vue3TouchEvents from 'vue3-touch-events'

import i18n from '@/i18n'
import './registerServiceWorker'

const app = createApp(App)
const vfm = createVfm()

app.config.productionTip = false

app.use(Vue3TouchEvents)
app.use(store)
app.use(i18n)
app.use(router)
app.use(PrimeVue)
app.use(vfm)

app.mount('#app')
