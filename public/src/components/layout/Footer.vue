<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div class="sm:col-span-2 md:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span class="text-white font-bold text-lg">B</span>
            </div>
            <span class="text-xl font-bold gradient-text">BEAT</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            <strong>B</strong>alanced. <strong>E</strong>mpowered. <strong>A</strong>sync. <strong>T</strong>eams.
          </p>
          <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Built for how developers actually work.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Quick Links</h3>
          <ul class="grid grid-cols-2 sm:grid-cols-1 gap-2 text-sm">
            <li>
              <RouterLink to="/values" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 inline-block">
                Core Values
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/principles" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 inline-block">
                12 Principles
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/framework" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 inline-block">
                Framework
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/reference" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 inline-block">
                Quick Reference
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Created By</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
            The BEAT Manifesto was created by <strong>Lukasz Raczylo</strong>.
          </p>
          <div class="flex space-x-1">
            <a
              href="https://github.com/lukaszraczylo"
              target="_blank"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="GitHub"
            >
              <i class="fab fa-github text-xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/raczylo/"
              target="_blank"
              class="text-gray-500 hover:text-blue-600 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <p class="text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
            &copy; {{ currentYear }} BEAT Manifesto by Lukasz Raczylo. Open for use and adaptation.
          </p>
          <p class="text-gray-400 dark:text-gray-600 text-xs">
            Attribution appreciated. Improvement welcomed. Dogma discouraged.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
