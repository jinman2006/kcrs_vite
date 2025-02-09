import { createRouter, createWebHistory } from "vue-router"
import layout from '@/layout/index.vue'

const publicRoutes = [

    {
        path: '/login',
        component: () => import('@/views/public/login.vue')
    },
    {
        path: '/404',
        component: () => import('@/views/public/404.vue')
    },
    {
        path: '/401',
        component: () => import('@/views/public/401.vue')
    }
]

const privateRoutes = [
    {
        path: '/',
        component: layout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import('@/views/public/index.vue')
            }
        ]
    },
    {
        path: '/',
        component: layout,
        children: [
            // 初报查询
            {
                path: '/firstlist',
                component: () => import("@/views/admin/firstList.vue")
            },
            // 续报查询
            {
                path: '/renewallist',
                component: () => import("@/views/admin/renewalList.vue")
            },
            // 结案查询
            {
                path: '/endlist',
                component: () => import("@/views/admin/endList.vue")
            }
        ]
    },
    {
        path: '/users',
        component: layout,
        children: [
            {
                path: '/adminmanage',
                component: () => import('@/views/admin/adminManage.vue')
            },
            {
                path: '/usermanage',
                component: () => import('@/views/admin/userManage.vue')
            },
            {
                path: '/userinfo',
                component: () => import('@/views/admin/userInfo.vue')
            },
            {
                path: '/userpassword',
                component: () => import('@/views/admin/changePassword.vue')
            }
        ]
    },
    {
        path: '/',
        component: layout,
        children: [
            {
                path: '/addcustomer',
                component: () => import('@/views/sales/addCustomer.vue')
            },
            {
                path: '/customerlist',
                component: () => import('@/views/sales/customerList.vue')
            },
        ]
    },
    {
        path: '/setting',
        component: layout,
        children: [
            {
                path: '/setting/notice',
                component: () => import('@/views/admin/notice.vue')
            },
            {
                path: '/setting/email',
                component: () => import('@/views/admin/email.vue')
            },
            {
                path: '/setting/other',
                component: () => import('@/views/admin/other.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: [...publicRoutes, ...privateRoutes]
})

export default router