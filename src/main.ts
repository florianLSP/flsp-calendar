import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
