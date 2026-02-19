<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navItems = [
  { path: '/', label: 'Home', icon: 'fas fa-home' },
  { path: '/values', label: 'Values', icon: 'fas fa-heart' },
  { path: '/principles', label: 'Principles', icon: 'fas fa-compass' },
  { path: '/framework', label: 'Framework', icon: 'fas fa-sitemap' },
  { path: '/practices', label: 'Practices', icon: 'fas fa-cogs' },
  { path: '/onboarding', label: 'Onboarding', icon: 'fas fa-user-plus' },
  { path: '/anti-patterns', label: 'Anti-Patterns', icon: 'fas fa-exclamation-triangle' },
  { path: '/reference', label: 'Reference', icon: 'fas fa-book' },
  { path: '/assessment', label: 'Assessment', icon: 'fas fa-clipboard-check' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // Prevent body scroll when menu is open
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})

// Close mobile menu on escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleEscape)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})

import { watch } from 'vue'
</script>

<template>
  <nav 
    class="fixed w-full z-50 transition-all duration-500"
    :class="[
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-modern' 
        : 'bg-transparent'
    ]"
  >
    <!-- Top gradient line -->
    <div 
      class="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-500"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
    ></div>
    
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      <div class="flex justify-between h-14 sm:h-16 items-center">
        <!-- Logo -->
        <RouterLink 
          to="/" 
          class="flex items-center gap-2 sm:gap-3 group"
        >
          <div 
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow-blue"
          >
            <span class="text-white font-bold text-sm sm:text-lg">B</span>
          </div>
          <span 
            class="text-lg sm:text-xl font-bold gradient-text hidden sm:inline transition-all duration-300 group-hover:tracking-wide"
          >BEAT</span>
        </RouterLink>

        <!-- Desktop Navigation - hidden on mobile, shown on lg+ -->
        <div class="hidden lg:flex items-center space-x-1">
          <RouterLink
            v-for="(item, index) in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all duration-300"
            :class="[
              route.path === item.path
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
            ]"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            {{ item.label }}
            <!-- Active indicator -->
            <span 
              v-if="route.path === item.path"
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
            ></span>
          </RouterLink>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/lukaszraczylo"
            target="_blank"
            class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 sm:p-2.5 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:scale-110"
            aria-label="View author on GitHub"
          >
            <i class="fab fa-github text-lg sm:text-xl"></i>
          </a>
          
          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 sm:p-2.5 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
            aria-label="Toggle menu"
            aria-expanded="mobileMenuOpen"
            aria-controls="mobile-menu"
          >
            <transition name="rotate" mode="out-in">
              <i v-if="!mobileMenuOpen" key="menu" class="fas fa-bars text-lg sm:text-xl"></i>
              <i v-else key="close" class="fas fa-times text-lg sm:text-xl"></i>
            </transition>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="mobileMenuOpen" 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
        @click="closeMobileMenu"
        aria-hidden="true"
      ></div>
    </transition>

    <!-- Mobile Menu Panel -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="mobileMenuOpen" 
        id="mobile-menu"
        class="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-2xl max-h-[80vh] overflow-y-auto"
      >
        <div class="px-4 py-4 space-y-1 w-full max-w-7xl mx-auto">
          <RouterLink
            v-for="(item, index) in navItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300"
            :class="[
              route.path === item.path
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
            :style="{ animationDelay: `${index * 30}ms` }"
          >
            <div 
              class="w-10 h-10 rounded-lg flex items-center justify-center"
              :class="route.path === item.path ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'"
            >
              <i :class="item.icon" class="text-sm"></i>
            </div>
            <span class="flex-1">{{ item.label }}</span>
            <i 
              v-if="route.path === item.path" 
              class="fas fa-chevron-right text-xs text-blue-500"
            ></i>
          </RouterLink>
        </div>
        
        <!-- Mobile menu footer -->
        <div class="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-center text-gray-500 dark:text-gray-500">
            BEAT Manifesto v1.0
          </p>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.2s ease;
}

.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate(-90deg);
}
</style>
