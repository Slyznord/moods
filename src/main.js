import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Utils for PWA
import './registerServiceWorker'

import PrimeVue from 'primevue/config'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import '@/styles/main.scss'

const app = createApp(App)
const vfm = createVfm()

app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(vfm)

app.mount('#app')
