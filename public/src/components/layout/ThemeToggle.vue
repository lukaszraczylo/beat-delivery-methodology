<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-200"
    aria-label="Toggle theme"
  >
    <i v-if="isDark" class="fas fa-sun text-xl"></i>
    <i v-else class="fas fa-moon text-xl"></i>
  </button>
</template>
