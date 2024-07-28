import { defineNitroConfig } from 'nitropack/config'
import { createServer as createViteServer } from 'vite'

export default defineNitroConfig({
    handlers: [
        {
            route: '/**',
            handler: './app/server.ts'
        },
    ],

    devHandlers: [
        {
            route: '/__vite',
            handler: defineLazyEventHandler(async () => {
                const viteDevServer = await createViteServer({
                    appType: 'custom',
                    base: '/__vite',
                    server: {
                        middlewareMode: true
                    }
                }) 

                return defineEventHandler(fromNodeMiddleware(viteDevServer.middlewares))
            }),
        }
    ]
})
