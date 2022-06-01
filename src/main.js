import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store-config'
import { createI18n } from 'vue-i18n'
import { messages } from '../messages'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
const i18n = createI18n({
    locale: "en",
    messages
})
app.use(router)
app.use(store)
app.use(i18n)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Datepicker', Datepicker);

app.mount('#app')
