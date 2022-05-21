import { createRouter, createWebHistory } from 'vue-router'
import auth from '../_helpers/auth'
import Login from '../components/Login.vue'
import HomeView from '../views/HomeView.vue'
import { Role } from '../_helpers/role'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },

    // requiredRoles: [Role.Admin] would restrict this path only to ADMIN role
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
      meta: {requiredRoles: []}
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Login,
      beforeEnter: (to, from, next) => {
        auth.logout();
        next({path: '/login'})
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const {requiredRoles} = to.meta;

  if (!requiredRoles) {
    return next();
  }

  if (auth.isAuthorized(requiredRoles)) {
    next();
  } else {
    if (auth.isAuthenticated()) {
      next({path: '/'});
    } else {
      next({path: '/login', query: {returnUrl: to.path}});
    }
  }
})

export default router
