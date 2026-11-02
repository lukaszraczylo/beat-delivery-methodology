<script setup>
import { onboarding } from '@/data/manifesto'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'

const ramp = Object.entries(onboarding)
  .filter(([key]) => key !== 'id')
  .map(([, value]) => value)
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Applying BEAT"
      title="Onboarding"
      :summary="`The ramp runs in three weeks and settles in the first month. ${ramp.length} steps below, in the order a new maker meets them.`"
    />

    <PageSection v-for="step in ramp" :key="step.title" :title="step.title">
      <ul class="list-disc space-y-1 pl-5 text-body-base text-body">
        <li v-for="item in step.items" :key="item">{{ item }}</li>
      </ul>
    </PageSection>
  </div>
</template>
