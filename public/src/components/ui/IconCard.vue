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
  },
  href: {
    type: String,
    default: null
  }
})
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    class="group card p-6 cursor-pointer"
    :class="{ 'hover:-translate-y-2': href }"
  >
    <div class="flex items-start gap-5">
      <div
        class="w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        :class="gradient"
      >
        <i :class="icon" class="text-white text-xl"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
          {{ title }}
          <i 
            v-if="href" 
            class="fas fa-arrow-right text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-500"
          ></i>
        </h3>
        <p v-if="description" class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ description }}</p>
        <slot></slot>
      </div>
    </div>
  </component>
</template>
