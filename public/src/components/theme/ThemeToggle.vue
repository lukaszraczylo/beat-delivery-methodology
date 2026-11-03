<script setup>
import { ref } from 'vue'
import { isDarkTheme, toggleTheme } from './theme'

// The theme is already on the root element when the app mounts, so the
// initial state is read straight from it.
const isDark = ref(isDarkTheme())

const onToggle = () => {
  isDark.value = toggleTheme() === 'dark'
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors duration-200"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="onToggle"
  >
    <i v-if="isDark" class="fas fa-sun text-lg" aria-hidden="true"></i>
    <i v-else class="fas fa-moon text-lg" aria-hidden="true"></i>
  </button>
</template>
