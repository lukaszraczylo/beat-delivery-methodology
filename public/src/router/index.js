import { createRouter, createWebHashHistory } from 'vue-router'

// Section list for the header and section navigation. Order is reading order.
export const sections = [
  { id: 'start', label: 'Start', order: 1 },
  { id: 'foundations', label: 'Foundations', order: 2 },
  { id: 'method', label: 'The Method', order: 3 },
  { id: 'applying', label: 'Applying BEAT', order: 4 },
  { id: 'reference', label: 'Reference', order: 5 }
]

// Every old flat path from docs/pre-redesign-routes.md is kept as an alias of
// its new page, so the published URL still renders the intended content.
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home', section: 'start', sectionOrder: 1 }
  },
  {
    path: '/foundations/values',
    alias: ['/values'],
    name: 'Values',
    component: () => import('@/views/ValuesView.vue'),
    meta: { title: 'Values', section: 'foundations', sectionOrder: 1 }
  },
  {
    path: '/foundations/principles',
    alias: ['/principles'],
    name: 'Principles',
    component: () => import('@/views/PrinciplesView.vue'),
    meta: { title: 'Principles', section: 'foundations', sectionOrder: 2 }
  },
  {
    path: '/method/framework',
    alias: ['/framework'],
    name: 'Framework',
    component: () => import('@/views/FrameworkView.vue'),
    meta: { title: 'The Framework', section: 'method', sectionOrder: 1 }
  },
  {
    path: '/method/practices',
    alias: ['/practices'],
    name: 'Practices',
    component: () => import('@/views/PracticesView.vue'),
    meta: { title: 'Practices', section: 'method', sectionOrder: 2 }
  },
  {
    path: '/applying/onboarding',
    alias: ['/onboarding'],
    name: 'Onboarding',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { title: 'Onboarding', section: 'applying', sectionOrder: 1 }
  },
  {
    path: '/applying/anti-patterns',
    alias: ['/anti-patterns'],
    name: 'AntiPatterns',
    component: () => import('@/views/AntiPatternsView.vue'),
    meta: { title: 'Anti-Patterns', section: 'applying', sectionOrder: 2 }
  },
  {
    path: '/applying/assessment',
    alias: ['/assessment'],
    name: 'Assessment',
    component: () => import('@/views/AssessmentView.vue'),
    meta: { title: 'Team Assessment', section: 'applying', sectionOrder: 3 }
  },
  {
    path: '/reference',
    name: 'Reference',
    component: () => import('@/views/ReferenceView.vue'),
    meta: { title: 'Quick Reference', section: 'reference', sectionOrder: 1 }
  },
  {
    // Catch-all. No not-found view exists yet, so this renders the home view;
    // the intended view is @/views/NotFoundView.vue (card 075da6c7).
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Page not found', section: 'start', sectionOrder: 99 }
  }
]

// Pages of one section in reading order, for the section navigation.
export const pagesInSection = (sectionId) =>
  routes
    .filter((route) => route.name !== 'NotFound' && route.meta.section === sectionId)
    .sort((a, b) => a.meta.sectionOrder - b.meta.sectionOrder)

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
