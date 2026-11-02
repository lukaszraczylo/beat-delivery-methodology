<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sections } from '@/router'
import { pagesInSection } from '@/router/sections'
import PageHeader from '@/components/layout/PageHeader.vue'

const route = useRoute()

// The requested path, as the reader typed it. The hash history keeps it in
// the fragment, and the catch-all route records it in `pathMatch`.
const requestedPath = computed(() => {
  const matched = route.params.pathMatch
  if (Array.isArray(matched) && matched.length > 0) return `/${matched.join('/')}`
  return route.fullPath
})

const startPages = pagesInSection(sections.find((section) => section.id === 'start')?.id ?? 'start')
</script>

<template>
  <div>
    <PageHeader
      title="Page not found"
      summary="The address below does not match a page on this site."
    />

    <p class="mt-6 text-body-lg text-large">
      <i class="fas fa-circle-question mr-2 text-muted-foreground" aria-hidden="true"></i>
      <span class="font-mono text-body-base break-all">{{ requestedPath }}</span>
    </p>

    <p class="mt-6 text-body-base text-body">
      <RouterLink to="/" class="font-semibold text-accent underline underline-offset-4">
        Go to the home page
      </RouterLink>
      or pick a page from the navigation above.
    </p>

    <nav aria-label="Start pages" class="mt-10 border-t border-border pt-6">
      <h2 class="text-title font-semibold text-large">Start</h2>
      <ul class="mt-2 space-y-1">
        <li v-for="page in startPages" :key="page.name">
          <RouterLink :to="page.path" class="text-body-base text-accent underline underline-offset-4">
            {{ page.meta.title }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
