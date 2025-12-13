<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  gradient: {
    type: String,
    default: 'from-blue-500 to-blue-600'
  }
})
</script>

<template>
  <div class="glass p-5 rounded-xl group hover:shadow-lg transition-all duration-300">
    <div class="flex items-start gap-4">
      <div
        class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
        :class="gradient"
      >
        <i :class="icon" class="text-white"></i>
      </div>
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">{{ title }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
