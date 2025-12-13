<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/values', label: 'Values' },
  { path: '/principles', label: 'Principles' },
  { path: '/framework', label: 'Framework' },
  { path: '/practices', label: 'Practices' },
  { path: '/onboarding', label: 'Onboarding' },
  { path: '/anti-patterns', label: 'Anti-Patterns' },
  { path: '/reference', label: 'Reference' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="fixed w-full glass shadow-modern z-50 transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between h-16 items-center">
        <RouterLink to="/" class="flex items-center hover:opacity-80 transition-opacity duration-300 gap-2">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span class="text-white font-bold text-lg">B</span>
          </div>
          <span class="text-xl font-bold gradient-text hidden sm:inline">BEAT</span>
        </RouterLink>

        <div class="hidden lg:flex space-x-4 xl:space-x-6">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link text-sm"
            :class="{ 'text-blue-600 dark:text-blue-400': route.path === item.path }"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="flex items-center space-x-2">
          <ThemeToggle />
          <a
            href="https://github.com/lukaszraczylo"
            target="_blank"
            class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-200"
            aria-label="View author on GitHub"
          >
            <i class="fab fa-github text-xl"></i>
          </a>
          <button
            @click="toggleMobileMenu"
            class="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <i v-if="!mobileMenuOpen" class="fas fa-bars text-xl"></i>
            <i v-else class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-200 dark:border-gray-700">
        <div class="px-4 py-3 space-y-1 bg-white dark:bg-gray-800">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="block px-3 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 rounded font-medium"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': route.path === item.path }"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </transition>
  </nav>
</template>
