import App from './app.vue'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

export default defineEventHandler(async () => {
    const app = createSSRApp(App)

    const template = await useStorage().getItem('root:index.html') as string
    const html = await renderToString(app)

    return template.replace('<div id="app"></div>', `<div id="app">${html}</div>`)
})
