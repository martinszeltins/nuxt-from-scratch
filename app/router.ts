import Index from './pages/index.vue'
import About from './pages/about.vue'
import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

// TODO: Auto generate these routes from the file system
const routes = [
    {
        path: '/',
        component: Index,
    },

    {
        path: '/about',
        component: About,
    }
]

export function createRouter() {
    return _createRouter({
        history: (typeof window !== 'undefined') ? createWebHistory() : createMemoryHistory(),
        routes,
    })
}
