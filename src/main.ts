import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createConvexVue } from '@convex-vue/core'

const app = createApp(App)

app.use(router)

const convexVue = createConvexVue({
  convexUrl: import.meta.env.VITE_CONVEX_URL
})

app.use(convexVue)
app.mount('#app')
