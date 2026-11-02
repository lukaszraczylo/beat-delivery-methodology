<script setup>
import {
  ceremonies,
  constraints,
  decisionRules,
  framework,
  priorityBuckets,
  roles
} from '@/data/manifesto'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'
import TableCard from '@/components/ui/TableCard.vue'

const ceremonyRows = ceremonies.map((ceremony) => [ceremony.name, ceremony.duration, ceremony.purpose])
const constraintRows = constraints.map((item) => [item.constraint, item.limit])
</script>

<template>
  <div>
    <PageHeader eyebrow="The Method" title="The Framework" :summary="framework.summary" />

    <PageSection title="Roles" summary="A role states what the person decides and what they do not decide.">
      <dl class="space-y-6">
        <div v-for="role in roles" :key="role.name">
          <dt class="flex items-center gap-2 text-title font-semibold text-large">
            <i :class="role.icon" class="text-accent" aria-hidden="true"></i>
            {{ role.name }}
          </dt>
          <dd class="mt-1 max-w-prose text-body-base text-body">{{ role.description }}</dd>
        </div>
      </dl>
    </PageSection>

    <PageSection title="Beats and ceremonies" summary="A beat is the planning cycle. These are the meetings inside it.">
      <TableCard :headers="['Ceremony', 'Duration', 'Purpose']" :rows="ceremonyRows" />
    </PageSection>

    <PageSection title="Priority buckets" summary="The board orders work in four buckets. The order is the Enabler's; the pull is the maker's.">
      <dl class="space-y-4">
        <div v-for="bucket in priorityBuckets" :key="bucket.name" class="border-l-2 border-accent pl-3">
          <dt class="text-title font-semibold text-large">{{ bucket.name }}</dt>
          <dd class="text-body-base text-body">{{ bucket.description }}</dd>
        </div>
      </dl>
    </PageSection>

    <PageSection title="Planning numbers" summary="Every limit below is a BEAT default, not a research finding.">
      <TableCard :headers="['Constraint', 'Limit']" :rows="constraintRows" />
    </PageSection>

    <PageSection title="Decision rules" summary="Every rule states what it applies to, who decides, and what to do when it does not fit.">
      <dl class="space-y-6">
        <div v-for="rule in decisionRules" :key="rule.rule">
          <dt class="text-title font-semibold text-large">{{ rule.rule }}</dt>
          <dd class="mt-1">
            <dl class="space-y-1 text-body-base text-body">
              <div>
                <dt class="font-semibold text-muted-foreground">Applies to</dt>
                <dd>{{ rule.appliesTo }}</dd>
              </div>
              <div>
                <dt class="font-semibold text-muted-foreground">Decided by</dt>
                <dd>{{ rule.decidedBy }}</dd>
              </div>
              <div>
                <dt class="font-semibold text-muted-foreground">If it does not fit</dt>
                <dd>{{ rule.ifItDoesNotFit }}</dd>
              </div>
            </dl>
          </dd>
        </div>
      </dl>
    </PageSection>
  </div>
</template>
