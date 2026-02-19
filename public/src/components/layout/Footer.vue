<script setup>
const currentYear = new Date().getFullYear()

const quickLinks = [
  { path: '/values', label: 'Core Values' },
  { path: '/principles', label: '12 Principles' },
  { path: '/framework', label: 'Framework' },
  { path: '/reference', label: 'Quick Reference' },
]

const resources = [
  { path: '/assessment', label: 'Team Assessment' },
  { path: '/anti-patterns', label: 'Anti-Patterns' },
  { path: '/onboarding', label: 'Onboarding' },
  { path: '/practices', label: 'Practices' },
]
</script>

<template>
  <footer class="relative bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <!-- Top gradient line -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-12 lg:py-16">
      <!-- Main footer content - responsive grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <RouterLink to="/" class="flex items-center gap-3 group mb-4">
            <div 
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow-blue"
            >
              <span class="text-white font-bold text-lg sm:text-xl">B</span>
            </div>
            <div>
              <span class="text-lg sm:text-xl font-bold gradient-text block">BEAT</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">v1.0</span>
            </div>
          </RouterLink>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
            <strong>B</strong>alanced. <strong>E</strong>mpowered. <strong>A</strong>sync. <strong>T</strong>eams.
          </p>
          <p class="text-gray-500 dark:text-gray-500 text-sm">
            Built for how developers actually work.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 text-sm sm:text-base">
            <i class="fas fa-compass text-blue-500 text-sm"></i>
            Explore
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <RouterLink 
                :to="link.path" 
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-500 transition-colors"></span>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 text-sm sm:text-base">
            <i class="fas fa-book text-purple-500 text-sm"></i>
            Resources
          </h3>
          <ul class="space-y-2">
            <li v-for="link in resources" :key="link.path">
              <RouterLink 
                :to="link.path" 
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center gap-2 group"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-purple-500 transition-colors"></span>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Author -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 text-sm sm:text-base">
            <i class="fas fa-user text-cyan-500 text-sm"></i>
            Created By
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
            The BEAT Manifesto was created by <strong class="text-gray-900 dark:text-gray-100">Lukasz Raczylo</strong>.
          </p>
          <div class="flex gap-2">
            <a
              href="https://github.com/lukaszraczylo"
              target="_blank"
              class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <i class="fab fa-github text-lg"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/raczylo/"
              target="_blank"
              class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <p class="text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
            &copy; {{ currentYear }} BEAT Manifesto by Lukasz Raczylo
          </p>
          <p class="text-gray-400 dark:text-gray-600 text-xs italic">
            Attribution appreciated. Improvement welcomed. Dogma discouraged.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
