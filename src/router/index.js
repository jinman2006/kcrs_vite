import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/login',
        component: () => import('@/views/admin/login.vue')
    },
    {
        path: '/admin',
        component: () => import('@/views/admin/home.vue'),
        children: [
            // 初报查询
            {
                path: '/customer/firstlist',
                component: () => import("@/views/admin/firstList.vue")
            },
            // 续报查询
            {
                path: '/customer/renewallist',
                component: () => import("@/views/admin/renewalList.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router