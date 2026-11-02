<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'

const route = useRoute()
const mainRef = ref(null)

// The hash history reads `#main-content` as a route path, so the skip link
// moves focus itself instead of letting the browser change the URL.
const skipToMain = () => {
  mainRef.value?.focus()
  mainRef.value?.scrollIntoView()
}

// The document title comes from the route meta, so every page has a unique
// title and the title cannot drift from the route list.
const applyTitle = () => {
  const title = route.meta.title
  document.title = title ? `${title} — BEAT Manifesto` : 'BEAT Manifesto'
}

watch(
  () => route.fullPath,
  async () => {
    applyTitle()
    // Where focus was before the page changed: on a cold load it is the body,
    // and the browser must keep its own starting focus.
    const hadFocus = document.activeElement !== null && document.activeElement !== document.body
    await nextTick()
    if (!hadFocus) return
    // Move focus to the main landmark on a page change, so a keyboard or
    // screen-reader user starts at the new page rather than at the header.
    mainRef.value?.focus()
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a class="skip-link" href="#main-content" @click.prevent="skipToMain">Skip to main content</a>
    <SiteHeader />
    <main
      id="main-content"
      ref="mainRef"
      tabindex="-1"
      class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12"
    >
      <router-view />
    </main>
    <SiteFooter />
  </div>
</template>
