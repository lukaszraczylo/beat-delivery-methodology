<script setup>
import { coreValues, teamValues } from '@/data/manifesto'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Foundations"
      title="Values"
      :summary="`${coreValues.length} core values state what the team prefers. ${teamValues.length} team values state how the team behaves while doing it.`"
    />

    <PageSection title="Core values" summary="A core value names the thing it prefers over the thing it gives up.">
      <dl class="space-y-5">
        <div v-for="value in coreValues" :key="value.valueMore" class="flex gap-3 border-l-2 border-accent pl-3">
          <i :class="value.icon" class="mt-1 text-accent" aria-hidden="true"></i>
          <div>
            <dt class="text-title font-semibold text-large">{{ value.valueMore }}</dt>
            <dd class="text-body-base text-body">We choose this over {{ value.over }}.</dd>
          </div>
        </div>
      </dl>
    </PageSection>

    <PageSection title="Team values" summary="Each team value states the behaviour it requires, not an intention.">
      <dl class="space-y-6">
        <div v-for="value in teamValues" :key="value.name">
          <dt class="flex items-center gap-2 text-title font-semibold text-large">
            <i :class="value.icon" class="text-accent" aria-hidden="true"></i>
            {{ value.name }}
          </dt>
          <dd class="mt-1 max-w-prose text-body-base text-body">{{ value.description }}</dd>
        </div>
      </dl>
    </PageSection>
  </div>
</template>
