<script setup>
defineProps({
  title: { type: String, required: true },
  summary: { type: String, default: '' },
  eyebrow: { type: String, default: '' }
})
</script>

<template>
  <header class="border-b border-border pb-6">
    <p v-if="eyebrow" class="text-title font-medium text-muted-foreground">{{ eyebrow }}</p>
    <h1 class="mt-1 text-display-sm font-semibold text-large">{{ title }}</h1>
    <p v-if="summary" class="mt-4 max-w-prose text-body-lg text-body">{{ summary }}</p>
  </header>
</template>
