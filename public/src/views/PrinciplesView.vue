<script setup>
import { principles, principleSections } from '@/data/manifesto'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'

const principleCount = Object.values(principles).reduce((total, group) => total + group.length, 0)
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Foundations"
      title="Principles"
      :summary="`${principleCount} principles in ${principleSections.length} groups. Each principle states the rule and the exception it allows.`"
    />

    <PageSection
      v-for="group in principleSections"
      :key="group.id"
      :title="group.title"
      :summary="`Principles ${group.number}`"
    >
      <ol class="space-y-6">
        <li v-for="principle in principles[group.key]" :key="principle.number">
          <h3 class="text-title font-semibold text-large">
            <span class="text-muted-foreground">{{ principle.number }}.</span>
            {{ principle.title }}
          </h3>
          <p class="mt-1 max-w-prose text-body-base text-body">{{ principle.description }}</p>
        </li>
      </ol>
    </PageSection>
  </div>
</template>
