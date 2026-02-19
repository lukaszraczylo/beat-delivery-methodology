<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Copy'
  },
  copiedLabel: {
    type: String,
    default: 'Copied!'
  }
})

const copied = ref(false)
const error = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    error.value = false
    
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    error.value = true
    setTimeout(() => {
      error.value = false
    }, 2000)
  }
}
</script>

<template>
  <button
    @click="copyToClipboard"
    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
    :class="[
      copied 
        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
        : error
          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    ]"
    :title="copied ? copiedLabel : label"
  >
    <transition name="scale" mode="out-in">
      <i v-if="copied" key="check" class="fas fa-check"></i>
      <i v-else-if="error" key="error" class="fas fa-exclamation-circle"></i>
      <i v-else key="copy" class="fas fa-copy"></i>
    </transition>
    <span v-if="copied">{{ copiedLabel }}</span>
    <span v-else-if="error">Failed</span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
