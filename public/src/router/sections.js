import router from '@/router'

// Pages of one section in reading order, for the site navigation.
export const pagesInSection = (sectionId) =>
  router.options.routes
    .filter((route) => route.name !== 'NotFound' && route.meta.section === sectionId)
    .sort((a, b) => a.meta.sectionOrder - b.meta.sectionOrder)
