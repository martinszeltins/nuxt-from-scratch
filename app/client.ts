import { createSSRApp } from 'vue/dist/vue.esm-bundler.js'

const app = createSSRApp({
    data: () => ({ count: 0 }),
    template: `<h1>Hello, Vue</h1><button @click="count++">{{ count }}</button>`
})

app.mount('#app')
