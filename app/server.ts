import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

export default defineEventHandler(async () => {
    const app = createSSRApp({
        data: () => ({ msg: 'Hello, Vue!' }),
        template: `<h1>{{ msg }}</h1>`
    })

    const html = await renderToString(app)
    const template = await useStorage().getItem('root:index.html')

    return template.replace('<div id="app"></div>', `<div id="app">${html}</div>`)
})
