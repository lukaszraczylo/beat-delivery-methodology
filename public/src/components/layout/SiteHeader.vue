<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { sections } from '@/router'
import { pagesInSection } from '@/router/sections'
import ThemeToggle from '@/components/theme/ThemeToggle.vue'

const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref(null)

// The current section comes from route meta, so a new page appears in the
// wayfinding as soon as the router lists it.
const currentSection = computed(() => route.meta.section ?? sections[0].id)
const currentSectionLabel = computed(
  () => sections.find((section) => section.id === currentSection.value)?.label ?? ''
)
const sectionPages = computed(() => pagesInSection(currentSection.value))
const orderedSections = computed(() => [...sections].sort((a, b) => a.order - b.order))

// A section link lands on the first page of that section. No section is empty,
// and pagesInSection sorts by meta.sectionOrder.
const sectionPath = (sectionId) => pagesInSection(sectionId)[0]?.path ?? '/'

const closeMenu = () => {
  menuOpen.value = false
}

const onKeydown = (event) => {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
    menuButton.value?.focus()
  }
}

watch(() => route.fullPath, closeMenu)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background">
    <div class="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div class="flex min-h-[3.5rem] items-center justify-between gap-2">
        <RouterLink
          to="/"
          class="rounded px-1 py-2 text-title font-semibold text-foreground"
          aria-label="BEAT manifesto, home"
        >
          BEAT
        </RouterLink>

        <div class="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref="menuButton"
            type="button"
            class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded px-2 text-body-base font-semibold text-foreground hover:bg-muted lg:hidden"
            :aria-expanded="menuOpen"
            aria-controls="site-menu"
            @click="menuOpen = !menuOpen"
          >
            <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'" aria-hidden="true"></i>
            {{ menuOpen ? 'Close' : 'Menu' }}
          </button>
        </div>
      </div>

      <!-- Desktop wayfinding: site navigation, then the pages of the current
           section. Both are built from the router config. -->
      <div class="hidden pb-3 lg:block">
        <nav aria-label="Sections">
          <ul class="flex flex-wrap items-center gap-x-1">
            <li v-for="section in orderedSections" :key="section.id">
              <RouterLink
                :to="sectionPath(section.id)"
                class="inline-block rounded px-2 py-1.5 text-body-base text-body hover:bg-muted hover:text-foreground"
                :class="{ 'font-semibold text-accent': section.id === currentSection }"
                :aria-current="section.id === currentSection ? 'true' : undefined"
              >
                {{ section.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
        <nav :aria-label="`${currentSectionLabel} pages`" class="mt-1">
          <ul class="flex flex-wrap items-center gap-x-1">
            <li v-for="page in sectionPages" :key="page.name">
              <RouterLink
                :to="page.path"
                class="inline-block rounded px-2 py-1.5 text-body-base text-muted-foreground hover:bg-muted hover:text-foreground"
                :class="{ 'font-semibold text-foreground underline underline-offset-4': page.name === route.name }"
                :aria-current="page.name === route.name ? 'page' : undefined"
              >
                {{ page.meta.title }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Small screens: both navigations collapse into one keyboard-operated
           menu. It is a real button above, so Enter and Space open it. -->
      <div v-if="menuOpen" id="site-menu" class="border-t border-border pb-4 lg:hidden">
        <nav aria-label="Sections" class="pt-3">
          <p class="px-2 text-body-base font-semibold text-muted-foreground">Sections</p>
          <ul class="mt-1">
            <li v-for="section in orderedSections" :key="section.id">
              <RouterLink
                :to="sectionPath(section.id)"
                class="block rounded px-2 py-2 text-body-base text-body hover:bg-muted hover:text-foreground"
                :class="{ 'font-semibold text-accent': section.id === currentSection }"
                :aria-current="section.id === currentSection ? 'true' : undefined"
                @click="closeMenu"
              >
                {{ section.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
        <nav :aria-label="`${currentSectionLabel} pages`" class="mt-4">
          <p class="px-2 text-body-base font-semibold text-muted-foreground">
            {{ currentSectionLabel }} pages
          </p>
          <ul class="mt-1">
            <li v-for="page in sectionPages" :key="page.name">
              <RouterLink
                :to="page.path"
                class="block rounded px-2 py-2 text-body-base text-body hover:bg-muted hover:text-foreground"
                :class="{ 'font-semibold text-foreground underline underline-offset-4': page.name === route.name }"
                :aria-current="page.name === route.name ? 'page' : undefined"
                @click="closeMenu"
              >
                {{ page.meta.title }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
