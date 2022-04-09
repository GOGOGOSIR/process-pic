import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

createApp(App).use(FloatingVue).use(ElementPlus).use(router).mount('#app')
