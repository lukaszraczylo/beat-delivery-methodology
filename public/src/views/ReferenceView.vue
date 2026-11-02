<script setup>
import {
  ceremonies,
  constraints,
  coreValues,
  definitionOfDone,
  incidentProtocol,
  priorityBuckets,
  roles
} from '@/data/manifesto'
import { references } from '@/data/references'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'
import TableCard from '@/components/ui/TableCard.vue'

const valueRows = coreValues.map((value) => [value.valueMore, value.over])
const constraintRows = constraints.map((item) => [item.constraint, item.limit])
const bucketRows = priorityBuckets.map((bucket) => [bucket.name, bucket.description])
const roleRows = roles.map((role) => [role.name, role.description])
const ceremonyRows = ceremonies.map((ceremony) => [ceremony.name, ceremony.duration, ceremony.purpose])
const incidentRows = incidentProtocol.map((step) => [step.step, step.description])
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Reference"
      title="Quick Reference"
      summary="The numbers, roles and templates of the method in one place, with the sources of every figure."
    />

    <PageSection title="Core values">
      <TableCard :headers="['We value more', 'Over']" :rows="valueRows" />
    </PageSection>

    <PageSection title="Constraints" summary="Every limit is a BEAT default, not a research finding.">
      <TableCard :headers="['Constraint', 'Limit']" :rows="constraintRows" />
    </PageSection>

    <PageSection title="Priority buckets">
      <TableCard :headers="['Bucket', 'What it holds']" :rows="bucketRows" />
    </PageSection>

    <PageSection title="Roles">
      <TableCard :headers="['Role', 'What the role does']" :rows="roleRows" />
    </PageSection>

    <PageSection title="Ceremonies">
      <TableCard :headers="['Ceremony', 'Duration', 'Purpose']" :rows="ceremonyRows" />
    </PageSection>

    <PageSection title="Definition of done">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 class="text-title font-semibold text-large">Code work</h3>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-body-base text-body">
            <li v-for="item in definitionOfDone.code" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div>
          <h3 class="text-title font-semibold text-large">Non-code work</h3>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-body-base text-body">
            <li v-for="item in definitionOfDone.nonCode" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </PageSection>

    <PageSection title="Incident protocol">
      <TableCard :headers="['Step', 'What happens']" :rows="incidentRows" />
    </PageSection>

    <PageSection title="References" summary="Each inline citation id in the prose resolves to one entry below.">
      <ol class="space-y-6">
        <li v-for="reference in references" :key="reference.id">
          <p class="font-mono text-body-base text-accent">{{ reference.id }}</p>
          <p class="mt-1 max-w-prose text-body-base text-body">{{ reference.label }}</p>
          <p v-if="reference.url" class="mt-1">
            <a
              :href="reference.url"
              class="break-all text-body-base text-accent underline underline-offset-4"
              rel="noreferrer noopener"
            >
              {{ reference.url }}
            </a>
          </p>
          <p v-else-if="reference.doi" class="mt-1 break-all text-body-base text-body">
            DOI {{ reference.doi }}
          </p>
          <p class="mt-1 max-w-prose text-body-base text-muted-foreground">{{ reference.note }}</p>
        </li>
      </ol>
    </PageSection>
  </div>
</template>
