<script setup>
import { antiPatterns, whereItFits } from '@/data/manifesto'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'
import TableCard from '@/components/ui/TableCard.vue'

const groups = [
  { key: 'process', title: 'Process anti-patterns' },
  { key: 'people', title: 'People anti-patterns' },
  { key: 'organizational', title: 'Organisational anti-patterns' }
]

const rowsFor = (key) =>
  antiPatterns[key].map((item) => [item.pattern, item.looksLike, item.fix])
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Applying BEAT"
      title="Anti-Patterns"
      summary="What a BEAT team looks like when the method has drifted, and where the method fits at all."
    />

    <PageSection
      v-for="group in groups"
      :key="group.key"
      :title="group.title"
      summary="The pattern, how to recognise it, and what the team does about it."
    >
      <TableCard :headers="['Pattern', 'Looks like', 'Fix']" :rows="rowsFor(group.key)" />
    </PageSection>

    <PageSection title="Where BEAT fits" :summary="whereItFits.note">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <h3 class="text-title font-semibold text-large">Works for</h3>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-body-base text-body">
            <li v-for="item in whereItFits.worksFor" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div>
          <h3 class="text-title font-semibold text-large">Fits poorly</h3>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-body-base text-body">
            <li v-for="item in whereItFits.fitsPoorly" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div>
          <h3 class="text-title font-semibold text-large">Can adapt</h3>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-body-base text-body">
            <li v-for="item in whereItFits.canAdapt" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </PageSection>
  </div>
</template>
