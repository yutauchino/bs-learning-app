import { createRouter, createWebHashHistory } from 'vue-router'
import ModeSelectView from './views/ModeSelectView.vue'
import QuizView from './views/QuizView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ModeSelectView,
    },
    {
      path: '/quiz/:mode',
      name: 'quiz',
      component: QuizView,
    },
  ],
})

export default router
