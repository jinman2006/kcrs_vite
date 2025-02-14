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
                component: () => import("@/views/admin/firstList.vue"),
                meta: {
                    title: '初报查询'
                }
            },
            // 续报查询
            {
                path: '/renewallist',
                component: () => import("@/views/admin/renewalList.vue"),
                meta: {
                    title: '续报查询'
                }
            },
            // 结案查询
            {
                path: '/endlist',
                component: () => import("@/views/admin/endList.vue"),
                meta: {
                    title: '结案查询'
                }
            }
        ]
    },
    {
        path: '/users',
        component: layout,
        children: [
            {
                path: '/adminmanage',
                component: () => import('@/views/admin/adminManage.vue'),
                meta: {
                    title: '管理员列表'
                }
            },
            {
                path: '/usermanage',
                component: () => import('@/views/admin/userManage.vue'),
                meta: {
                    title: '经销商列表'
                }
            },
            {
                path: '/roles',
                component: () => import('@/views/admin/roles.vue'),
                meta: {
                    title: '角色管理'
                }
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
                component: () => import('@/views/sales/addCustomer.vue'),
                meta: {
                    title: '客户报备'
                }
            },
            {
                path: '/customerlist',
                component: () => import('@/views/sales/customerList.vue'),
                meta: {
                    title: '客户列表'
                }
            },
        ]
    },
    {
        path: '/setting',
        component: layout,
        children: [
            {
                path: '/setting/notice',
                component: () => import('@/views/admin/notice.vue'),
                meta: {
                    title: '公告设置'
                }
            },
            {
                path: '/setting/email',
                component: () => import('@/views/admin/email.vue'),
                meta: {
                    title: '邮箱设置'
                }
            },
            {
                path: '/setting/other',
                component: () => import('@/views/admin/other.vue'),
                meta: {
                    title: '其它设置'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: [...publicRoutes, ...privateRoutes]
})

export default router