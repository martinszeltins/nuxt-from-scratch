import { createSSRApp } from 'vue'

const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `
        <h1>Hello, Vue!</h1>
        <button @click="count++">{{ count }}</button>
    `,
})

app.mount('#app')
