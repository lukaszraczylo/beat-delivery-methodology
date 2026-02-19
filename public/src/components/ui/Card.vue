<script setup>
defineProps({
  hover: {
    type: Boolean,
    default: true
  },
  gradient: {
    type: String,
    default: null
  },
  glow: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div
    class="card"
    :class="{ 
      'hover:-translate-y-2': hover,
      [`shadow-glow-${glow}`]: glow 
    }"
  >
    <div v-if="gradient" class="flex items-start gap-5">
      <div
        class="icon-box w-14 h-14 rounded-2xl"
        :class="gradient"
      >
        <slot name="icon"></slot>
      </div>
      <div class="flex-1 min-w-0">
        <slot></slot>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>
