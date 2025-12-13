<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: null
  }
})

const copied = ref(false)
const codeRef = ref(null)

const copyCode = async () => {
  if (codeRef.value) {
    const text = codeRef.value.innerText
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="rounded-xl overflow-hidden bg-gray-900 dark:bg-gray-950">
    <div v-if="title" class="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
      <span class="text-gray-400 text-xs sm:text-sm font-medium truncate mr-2">{{ title }}</span>
      <button
        @click="copyCode"
        class="text-gray-400 hover:text-white transition-colors p-2 min-w-[40px] min-h-[40px] flex items-center justify-center flex-shrink-0"
        aria-label="Copy code"
      >
        <i v-if="copied" class="fas fa-check text-green-400"></i>
        <i v-else class="fas fa-copy"></i>
      </button>
    </div>
    <pre class="p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm"><code ref="codeRef" class="text-gray-100 font-mono whitespace-pre-wrap break-words sm:whitespace-pre sm:break-normal"><slot></slot></code></pre>
  </div>
</template>
