import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'
import '../distribution/tailwind/output.css'
import './assets/style.css'
import Vue3TouchEvents from "vue3-touch-events";


createApp(App).use(store).use(router).use(Vue3TouchEvents).mount('#app')