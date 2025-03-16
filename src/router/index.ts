import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Store, useStore } from 'vuex';
//hidden:true 隐藏当前路由在侧边栏导航中
//hiddenAside:true 当前路由时，隐藏整个侧边栏导航
//hiddenHeader:true 当前路由时，隐藏整个头部导航

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录', mark: '登录', hiddenAside: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '404', mark: '404', icon: 'error' },
  },
]
export const dynamicRoutes = {
  admin: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requireArequiresAuth: true, roles: ['admin', 'shy'], title: '首页', mark: '', icon: 'home', },
    },
    {
      path: '/articles',
      name: 'articles',
      meta: { title: '文章管理', mark: '文章管理', icon: 'articles', roles: ['admin', 'shy'] },
      children: [
        {
          path: 'list',
          component: () => import('@/views/admin/articles/articlesList.vue'),
          meta: { title: '文章列表', mark: '文章管理/文章列表' },
        },
        {
          path: 'add',
          component: () => import('@/views/admin/articles/articleAdd.vue'),
          meta: { title: '文章添加', mark: '文章管理/文章添加' },
        },
        {
          path: 'edit',
          component: () => import('@/views/admin/articles/articleEdit.vue'),
          meta: { title: '文章编辑', mark: '文章管理/文章编辑' },
        },
        {
          path: 'audit',
          component: () => import('@/views/admin/articles/articleAudit.vue'),
          meta: { title: '文章审核', mark: '文章管理/文章审核', hidden: false },
          // children: [
          //   {
          //     path: 'detail',
          //     component: () => import('@/views/admin/articles/articleDetail.vue'),
          //     meta: { title: '文章详情', mark: '文章管理/文章审核/文章详情', hidden:true },
          //   }
          // ]
        }
      ],
    },
    {
      path: '/user',
      name: 'user',
      meta: { title: '用户管理', mark: '用户管理', icon: 'user' },
      children: [
        {
          path: 'add',
          component: () => import('@/views/admin/user/userAdd.vue'),
          meta: { title: '添加用户', mark: '用户管理/添加用户' },
        },
        {
          path: 'edit',
          component: () => import('@/views/admin/user/userEdit.vue'),
          meta: { title: '编辑用户', mark: '用户管理/编辑用户' },
        },
      ],
    },
  ],
  shy:[
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requireArequiresAuth: true, roles: ['admin', 'shy'], title: '首页', mark: '', icon: 'home' },
    },
    {
      path: '/articles',
      name: 'articles',
      meta: { title: '文章管理', mark: '文章管理', icon: 'articles', roles: ['admin', 'shy'] },
      children:[    {
        path: 'list',
        component: () => import('@/views/admin/articles/articlesList.vue'),
        meta: { title: '文章列表', mark: '文章管理/文章列表' },
      },]
  }
  ]
}

// export const constantRoutes: RouteRecordRaw[] = [
// ];


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_CONTEXT_PATH),
  routes: publicRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});
const store = useStore();
//导航守卫处理动态路由
router.beforeEach((to, from, next) => {
  const isLoggedIn = true;
  console.log(to.matched.length);  //http://localhost:5173

  //需要权限并且未匹配到路由（可能未加载）
  if (to.matched.length === 0 && isLoggedIn) {
    const userRole = 'admin';//store.state.user.role;
    const routersToAdd = dynamicRoutes[userRole] || [];

    routersToAdd.forEach(route => {
      router.addRoute(route);
    });
    console.log(router.currentRoute.value);
    
    return;
    //重新跳转以触发路由匹配
    next(to.fullPath);
    return;
  }
  //正常权限检查
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/login');
      return;
    } else {
      next();
    }
  } else {
    next();
  }
}
);


export default router
