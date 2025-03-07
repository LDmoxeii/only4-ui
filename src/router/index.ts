import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页', mark: '' },
  },
  {
    path: '/articles',
    name: 'articles',
    meta: { title: '文章管理', mark: '文章管理' },
    children: [
      {
        path: '/articles/moren',
        component: () => import('@/views/admin/articles/articlesList.vue'),
        meta: { title: '文章列表', mark: '文章管理/文章列表' },
      },
      {
        path: '/articles/add',
        component: () => import('@/views/admin/articles/articleAdd.vue'),
        meta: { title: '文章添加', mark: '文章管理/文章添加' },
      },
      {
        path: '/articles/edit',
        component: () => import('@/views/admin/articles/articleEdit.vue'),
        meta: { title: '文章编辑', mark: '文章管理/文章编辑' },
      },
      {
        path: '/articles/audit',
        component: () => import('@/views/admin/articles/acticleAudit.vue'),
        meta: { title: '文章审核', mark: '文章管理/文章审核' },
      }
    ],
  },
  {
    path: '/user',
    name: 'user',
    meta: { title: '用户管理', mark: '用户管理' },
    children: [
      {
        path: '/user/add',
        component: () => import('@/views/admin/user/userAdd.vue'),
        meta: { title: '添加用户', mark: '用户管理/添加用户' },
      },
      {
        path: '/user/edit',
        component: () => import('@/views/admin/user/userEdit.vue'),
        meta: { title: '编辑用户', mark: '用户管理/编辑用户' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', mark: '登录' ,hidden: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于', mark: '关于' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_CONTEXT_PATH),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

export default router
