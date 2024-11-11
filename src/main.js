import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import "@/styles/index.scss"


//Pinia
import { createPinia } from 'pinia' //导入Pinia的createPinia方法,用于创建Pinia实例(状态管理库)
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia() //创建一个Pinia实例, 用于在应用中集中管理状态(store)
pinia.use(piniaPluginPersistedstate) //将持久化存储插件添加到 pinia 实例上


const app = createApp(App)

// 导入所有el图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
