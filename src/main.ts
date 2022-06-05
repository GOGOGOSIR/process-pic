import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import FloatingVue from 'floating-vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'floating-vue/dist/style.css'

createApp(App).use(FloatingVue).use(ElementPlus).use(router).mount('#app')
