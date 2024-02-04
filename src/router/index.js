import { createRouter, createWebHistory } from 'vue-router'

import InicioView from '@/views/InicioView.vue'
import GameView from '@/views/GameView.vue'
import RegistroView from '@/views/RegistroView.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/game',
    name: 'game',
    component: GameView
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegistroView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
