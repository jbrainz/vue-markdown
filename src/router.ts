import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Posts from './pages/Posts.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home,
    },
    {
      name: 'Newpost',
      path: '/post/new',
      component: Posts,
    },
  ],
})
