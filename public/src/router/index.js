import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/values',
    name: 'Values',
    component: () => import('@/views/ValuesView.vue')
  },
  {
    path: '/principles',
    name: 'Principles',
    component: () => import('@/views/PrinciplesView.vue')
  },
  {
    path: '/framework',
    name: 'Framework',
    component: () => import('@/views/FrameworkView.vue')
  },
  {
    path: '/practices',
    name: 'Practices',
    component: () => import('@/views/PracticesView.vue')
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('@/views/OnboardingView.vue')
  },
  {
    path: '/anti-patterns',
    name: 'AntiPatterns',
    component: () => import('@/views/AntiPatternsView.vue')
  },
  {
    path: '/reference',
    name: 'Reference',
    component: () => import('@/views/ReferenceView.vue')
  },
  {
    path: '/assessment',
    name: 'Assessment',
    component: () => import('@/views/AssessmentView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
