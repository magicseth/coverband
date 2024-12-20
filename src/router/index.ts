import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManageCards from '../views/ManageCards.vue'
import ViewCard from '../views/ViewCard.vue'
import TodayCard from '../views/TodayCard.vue'
import SetList from '@/views/SetList.vue'

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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/manageCards',
      name: 'manageCards',
      component: () => import('../views/ManageCards.vue')
    },
    {
      path: '/viewCard/:id',
      name: 'viewCard',
      component: () => import('../views/ViewCard.vue'),
      props: true
    },
    {
      path: '/today',
      name: 'TodayCard',
      component: TodayCard
    },
    {
      path: '/backcover',
      name: 'SetList',
      component: SetList
    },
    {
      path: '/traveltarotmushroom',
      name: 'TravelTarotMushroom',
      component: TodayCard
    }
  ]
})

export default router
