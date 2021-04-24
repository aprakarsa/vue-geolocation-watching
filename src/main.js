import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/tailwind.css'

// Vue cookies
// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)

createApp(App).use(router).mount('#app')
