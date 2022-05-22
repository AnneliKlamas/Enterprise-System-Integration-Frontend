import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import HomeView from '../views/HomeView.vue'
import { Role } from '../_helpers/role'
import store from '../stores/store-config'
import RegistrationView from "../views/RegistrationView.vue";

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
        store.dispatch('authStore/logOut');
        next({path: '/'})
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView,
    },
    {
      path: '/cart/:orderID',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: {requiredRoles: []}
    },
  ]
})

router.beforeEach((to, from, next) => {
  const {requiredRoles} = to.meta;

  const isAuthenticated = store.getters['authStore/isAuthenticated'];
  const userRoles = store.getters['authStore/getRoles'];

  const isAuthorized = (requiredRoles) => {
    if (requiredRoles && isAuthenticated) {
        if (requiredRoles.length > 0) {
            if (requiredRoles.includes(userRoles)) {
                return true;
            } else {
                return false;
            }
        }

        return true;
    }
  }

  if (!requiredRoles) {
    return next();
  }

  if (isAuthorized(requiredRoles)) {
    next();
  } else {
    if (isAuthenticated) {
      next({path: '/'});
    } else {
      next({path: '/login', query: {returnUrl: to.path}});
    }
  }
})

export default router;
