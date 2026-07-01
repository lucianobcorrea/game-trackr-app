import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/community',
      name: 'community-home',
      component: () => import('../views/CommunityHub.vue'),
    },
    {
      path: '/community/:slug',
      name: 'community-page',
      component: () => import('../views/CommunityPage.vue'),
    },
    {
      path: '/posts/create',
      name: 'create-post',
      component: () => import('../views/CreatePostView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayoutView.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'callback',
          name: 'callback',
          component: () => import('../views/CallbackView.vue'),
        }
      ],
    },
  ],
})

export default router
