<script setup>
import {
  ceremonies,
  crossTeamDependencies,
  customerFeedback,
  definitionOfDone,
  incidentProtocol,
  measurement,
  onCall,
  practicePolicy,
  technicalPractices,
  timeZones
} from '@/data/manifesto'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'
import TableCard from '@/components/ui/TableCard.vue'

const ceremonyRows = ceremonies.map((ceremony) => [ceremony.name, ceremony.duration, ceremony.purpose])

const situations = [onCall, timeZones, crossTeamDependencies, measurement, customerFeedback]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="The Method"
      title="Practices"
      summary="Meetings, incidents, the definition of done, the optional technical practices, and the situations the method covers."
    />

    <PageSection title="Meetings" summary="The meeting budget applies to every scheduled meeting inside a working week.">
      <TableCard :headers="['Ceremony', 'Duration', 'Purpose']" :rows="ceremonyRows" />
    </PageSection>

    <PageSection title="Incident protocol" summary="An incident suspends the meeting budget and the sacred block until it is stable.">
      <ol class="space-y-4">
        <li v-for="step in incidentProtocol" :key="step.step">
          <h3 class="text-title font-semibold text-large">{{ step.step }}</h3>
          <p class="max-w-prose text-body-base text-body">{{ step.description }}</p>
        </li>
      </ol>
    </PageSection>

    <PageSection title="Definition of done" summary="The team owns the definition and records any change to it.">
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

    <PageSection title="Technical practices" :summary="practicePolicy.partialAdoption">
      <dl class="space-y-4">
        <div v-for="practice in technicalPractices" :key="practice.name">
          <dt class="text-title font-semibold text-large">{{ practice.name }}</dt>
          <dd class="max-w-prose text-body-base text-body">{{ practice.description }}</dd>
        </div>
      </dl>
      <p class="mt-4 max-w-prose text-body-base text-muted-foreground">
        {{ practicePolicy.scope }} {{ practicePolicy.decidedBy }}
      </p>
    </PageSection>

    <PageSection
      v-for="situation in situations"
      :key="situation.id"
      :title="situation.title"
      :summary="situation.summary"
    >
      <dl class="space-y-1 text-body-base text-body">
        <div>
          <dt class="font-semibold text-muted-foreground">Applies to</dt>
          <dd>{{ situation.appliesTo }}</dd>
        </div>
        <div>
          <dt class="font-semibold text-muted-foreground">Decided by</dt>
          <dd>{{ situation.decidedBy }}</dd>
        </div>
        <div>
          <dt class="font-semibold text-muted-foreground">If it does not fit</dt>
          <dd>{{ situation.ifItDoesNotFit }}</dd>
        </div>
      </dl>
      <dl class="mt-4 space-y-3">
        <div v-for="item in situation.items" :key="item.title">
          <dt class="text-title font-semibold text-large">{{ item.title }}</dt>
          <dd class="max-w-prose text-body-base text-body">{{ item.detail }}</dd>
        </div>
      </dl>
    </PageSection>
  </div>
</template>
