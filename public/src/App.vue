<script setup>
import { onMounted } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import ReadingProgress from '@/components/layout/ReadingProgress.vue'

onMounted(() => {
  document.documentElement.style.scrollBehavior = 'smooth'
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
    <ReadingProgress />
    <NavBar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition 
          name="page" 
          mode="out-in"
          appear
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Ensure content is visible during transition */
.page-enter-active > *,
.page-leave-active > * {
  will-change: opacity, transform;
}

/* Improved focus visible styles for accessibility */
:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.dark :focus-visible {
  outline-color: #60a5fa;
}

/* Remove focus outline for mouse users, keep for keyboard */
:focus:not(:focus-visible) {
  outline: none;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
