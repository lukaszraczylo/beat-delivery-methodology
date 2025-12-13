<script setup>
defineProps({
  hover: {
    type: Boolean,
    default: true
  },
  gradient: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div
    class="glass p-6 rounded-xl transition-all duration-300"
    :class="{ 'hover:shadow-lg hover:-translate-y-1': hover }"
  >
    <div v-if="gradient" class="flex items-start gap-4">
      <div
        class="icon-box"
        :class="gradient"
      >
        <slot name="icon"></slot>
      </div>
      <div class="flex-1">
        <slot></slot>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>
