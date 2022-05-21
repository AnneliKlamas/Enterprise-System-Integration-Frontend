import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store-config'
import { createI18n } from 'vue-i18n'
import { messages } from '../messages'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)
const i18n = createI18n({
    locale: "en",
    messages
})
app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')
