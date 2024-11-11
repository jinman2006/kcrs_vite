import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/login',
        component: () => import('@/views/admin/login.vue')
    },
    {
        path: '/admin',
        component: () => import('@/views/admin/home.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router