import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '@/components/UserList.vue'
import RegisterUser from '@/components/Register_User.vue'
import Loginview from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      name:'UserList',
      component: UserList,
    },
    { 
      path: '/register', 
      name: 'Register', 
      component: RegisterUser, 
    },
    {
      path: '/login',
      name: 'Login',
      component: Loginview
    }
  ],
})

export default router
