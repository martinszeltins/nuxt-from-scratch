import mri from 'mri'
import { resolve } from 'node:path'
import { createServer } from 'vite'
import { build, createDevServer, createNitro, prepare } from 'nitropack'
import { defineEventHandler, defineLazyEventHandler, fromNodeMiddleware } from 'h3'

async function main() {
    const args = mri(process.argv.slice(2))
    const command = args._[0]
    const rootDir = resolve(args._[1] || '.')

    const nitroConfig = {
        handlers: [
            {
                route: '/**',
                handler: './app/server.ts',
            },
        ],

        devHandlers: [
            {
                route: '/__vite',
                handler: defineLazyEventHandler(async () => {
                    const devViteServer = await createServer({
                        appType: 'custom',
                        base: '/__vite',
                        server: {
                            middlewareMode: true,
                        },
                        resolve: {
                            alias: {
                                vue: 'vue/dist/vue.esm-bundler.js',
                            },
                        },
                    })

                    return defineEventHandler(fromNodeMiddleware(devViteServer.middlewares))
                }),
            },
        ],
    }

    if (command === 'dev') {
        const nitro = await createNitro({
            rootDir,
            dev: true,
            preset: 'nitro-dev',
            ...nitroConfig,
        })

        const server = createDevServer(nitro)
        await server.listen({})
        
        await prepare(nitro)
        await build(nitro)
    }
}

main()