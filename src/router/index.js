import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Profile from '../views/ProfileView.vue'
import HomeView from '../views/HomeView.vue'
import { Role } from '../_helpers/role'
import store from '../stores/store-config'
import RegistrationView from "../views/RegistrationView.vue";
import UsersView from '../views/UsersView.vue'
import UserView from '../views/UserView.vue'
import CreateUserView from '../views/CreateUserView.vue'

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
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/logout',
      name: 'logout',
      component: Login,
      beforeEnter: (to, from, next) => {
        store.dispatch('authStore/logOut');
        store.dispatch('orderStore/logOut');
        store.dispatch('productStore/logOut');
        store.dispatch('userStore/logOut');
        store.dispatch('clientStore/logOut');
        next({path: '/'})
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView,
    },
    {
      path: '/admin/users',
      name: 'users',
      component: UsersView,
      meta: {requiredRoles: [Role.Admin]}
    },
    {
      path: '/admin/users/:id',
      name: 'user',
      component: UserView,
      meta: {requiredRoles: [Role.Admin]}
    },
    {
      path: '/admin/users/create',
      name: 'createUser',
      component: CreateUserView,
      meta: {requiredRoles: [Role.Admin]}
    },
    {
      path: '/cart/:orderID',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: {requiredRoles: []}
    }
  ]
})

router.beforeEach((to, from, next) => {
  const {requiredRoles} = to.meta;

  const isAuthenticated = store.getters['authStore/isAuthenticated'];
  const userRole = store.getters['authStore/getRole'];

  const isAuthorized = (requiredRoles) => {
    if (requiredRoles && isAuthenticated) {
        if (requiredRoles.length > 0) {
            if (requiredRoles.includes(userRole)) {
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
