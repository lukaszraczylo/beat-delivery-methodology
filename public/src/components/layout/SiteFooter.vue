<script setup>
import { RouterLink } from 'vue-router'
import { sections } from '@/router'
import { pagesInSection } from '@/router/sections'

const orderedSections = [...sections].sort((a, b) => a.order - b.order)
</script>

<template>
  <footer class="mt-16 border-t border-border bg-muted">
    <div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <nav aria-label="All pages">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="section in orderedSections" :key="section.id">
            <h2 class="text-title font-semibold text-large">{{ section.label }}</h2>
            <ul class="mt-2 space-y-1">
              <li v-for="page in pagesInSection(section.id)" :key="page.name">
                <RouterLink
                  :to="page.path"
                  class="rounded text-body-base text-body hover:text-foreground hover:underline"
                >
                  {{ page.meta.title }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <p class="mt-10 border-t border-border pt-6 text-body-base text-muted-foreground">
        BEAT manifesto by Lukasz Raczylo. Balanced, empowered, async teams.
      </p>
    </div>
  </footer>
</template>
