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
    <div v-if="title" class="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
      <span class="text-gray-400 text-sm font-medium">{{ title }}</span>
      <button
        @click="copyCode"
        class="text-gray-400 hover:text-white transition-colors p-1"
        aria-label="Copy code"
      >
        <i v-if="copied" class="fas fa-check text-green-400"></i>
        <i v-else class="fas fa-copy"></i>
      </button>
    </div>
    <pre class="p-4 overflow-x-auto"><code ref="codeRef" class="text-sm text-gray-100 font-mono"><slot></slot></code></pre>
  </div>
</template>
