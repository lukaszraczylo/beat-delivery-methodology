<script setup>
import { RouterLink } from 'vue-router'
import { sections } from '@/router'
import { pagesInSection } from '@/router/sections'
import { coreValues, principles, researchStats } from '@/data/manifesto'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'

const principleCount = Object.values(principles).reduce((total, group) => total + group.length, 0)
const orderedSections = [...sections].sort((a, b) => a.order - b.order)
const sectionPath = (sectionId) => pagesInSection(sectionId)[0]?.path ?? '/'

// The five commitments of README "The BEAT Commitment". public/src/data has no
// commitments key and is owned by another card, so the list lives here; the
// weak-point record (WP-49) names this file as the place that carries all five.
const commitments = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Protecting focus',
    description: 'We will not interrupt sacred time. We will wait. The one exception is a declared incident, and the incident lead decides when the block resumes.'
  },
  {
    icon: 'fas fa-pen',
    title: 'Defaulting to async',
    description: 'We will write first, meet only when writing fails.'
  },
  {
    icon: 'fas fa-handshake',
    title: 'Trusting makers',
    description: 'We will provide goals, not instructions. Constraints, not control.'
  },
  {
    icon: 'fas fa-heart',
    title: 'Sustaining pace',
    description: 'We will cut scope before we cut rest. We will plan for humans, not machines.'
  },
  {
    icon: 'fas fa-arrows-rotate',
    title: 'Improving always',
    description: 'We will reflect each beat. We will adjust. We will find better ways.'
  }
]

// The data carries the citation id in brackets at the end of the description;
// the page renders it once, as a link to the reference entry.
const withoutCitation = (description) => description.replace(/\s*\[[^\]]+\]\s*$/, '')
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Start"
      title="The BEAT Manifesto"
      :summary="`The method states ${coreValues.length} core values and ${principleCount} principles. This site reads it in ${orderedSections.length} sections, in reading order.`"
    />

    <PageSection
      title="What we value more"
      summary="Each value names what it prefers over what it gives up."
    >
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <li v-for="value in coreValues" :key="value.valueMore" class="flex gap-3 border-l-2 border-accent pl-3">
          <i :class="value.icon" class="mt-1 text-accent" aria-hidden="true"></i>
          <p class="text-body-base text-body">
            <span class="font-semibold text-large">{{ value.valueMore }}</span> over {{ value.over }}
          </p>
        </li>
      </ul>
    </PageSection>

    <PageSection
      title="What the research says"
      summary="Each figure carries the id of the work it comes from. The full entries are on the Quick Reference page."
    >
      <dl class="space-y-4">
        <div v-for="item in researchStats" :key="item.citation + item.stat" class="border-l-2 border-border pl-3">
          <dt class="text-heading font-semibold text-large">{{ item.stat }}</dt>
          <dd class="text-body-base text-body">
            {{ withoutCitation(item.description) }}
            <RouterLink
              to="/reference"
              class="font-mono text-body-base text-accent underline underline-offset-4"
            >
              {{ item.citation }}
            </RouterLink>
          </dd>
        </div>
      </dl>
    </PageSection>

    <PageSection title="The BEAT Commitment" summary="By adopting BEAT, the team commits to these five things.">
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <li v-for="item in commitments" :key="item.title" class="flex gap-3">
          <i :class="item.icon" class="mt-1 text-accent" aria-hidden="true"></i>
          <div>
            <h3 class="text-title font-semibold text-large">{{ item.title }}</h3>
            <p class="mt-1 max-w-prose text-body-base text-body">{{ item.description }}</p>
          </div>
        </li>
      </ul>
    </PageSection>

    <PageSection title="Where to go next" summary="Sections are the reading order of the manifesto.">
      <ol class="space-y-4">
        <li v-for="section in orderedSections" :key="section.id">
          <RouterLink
            :to="sectionPath(section.id)"
            class="text-heading font-semibold text-accent underline underline-offset-4"
          >
            {{ section.label }}
          </RouterLink>
          <ul class="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <li v-for="page in pagesInSection(section.id)" :key="page.name">
              <RouterLink :to="page.path" class="text-body-base text-body hover:text-foreground hover:underline">
                {{ page.meta.title }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ol>
    </PageSection>
  </div>
</template>
