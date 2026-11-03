<script setup>
defineProps({
  title: { type: String, required: true },
  summary: { type: String, default: '' }
})
</script>

<template>
  <section class="mt-12">
    <h2 class="text-heading font-semibold text-large">{{ title }}</h2>
    <p v-if="summary" class="mt-3 max-w-prose text-body-base text-body">{{ summary }}</p>
    <div class="mt-5">
      <slot />
    </div>
  </section>
</template>
