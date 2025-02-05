import './presentation/assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
import router from './presentation/router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
