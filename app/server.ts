import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

export default defineEventHandler(async () => {
    const app = createSSRApp({
        data: () => ({ count: 1 }),
        template: `
            <h1>Hello, Vue!</h1>
            <button @click="count++">{{ count }}</button>
        `,
    })

    const template = await useStorage().getItem('root:index.html') as string
    const html = await renderToString(app)

    return template.replace('<div id="app"></div>', `<div id="app">${html}</div>`)
})
