import App from './app/app.vue'
import { createSSRApp } from 'vue'
import { getRequestPath } from 'h3'
import { createRouter } from './app/router'
import { renderToString } from 'vue/server-renderer'

export default defineEventHandler(async (event) => {
    const app = createSSRApp(App)
    const router = createRouter()

    app.use(router)

    router.push(getRequestPath(event))
    await router.isReady()

    const template = await useStorage().getItem('root:index.html') as string
    const html = await renderToString(app)

    return template.replace('<div id="app"></div>', `<div id="app">${html}</div>`)
})
