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
        path: '/admin',
        component: layout,
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
            },
            // 结案查询
            {
                path: '/customer/endlist',
                component: () => import("@/views/admin/endList.vue")
            }
        ]
    },
    {
        path: '/users',
        component: layout,
        children: [
            {
                path: '/users/manager',
                component: () => import('@/views/admin/adminManage.vue')
            },
            {
                path: '/users/user',
                component: () => import('@/views/admin/userManage.vue')
            },
            {
                path: '/users/info',
                component: () => import('@/views/admin/userInfo.vue')
            },
            {
                path: '/users/password',
                component: () => import('@/views/admin/changePassword.vue')
            }
        ]
    },
    {
        path: '/sales',
        component: layout,
        children: [
            {
                path: '/sales/addcustomer',
                component: () => import('@/views/sales/addCustomer.vue')
            },
            {
                path: '/sales/customerlist',
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