import App from './app.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'

const app = createSSRApp(App)
const router = createRouter()

app.use(router)

app.mount('#app')
