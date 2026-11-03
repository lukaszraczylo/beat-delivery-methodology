<script setup>
import { computed, reactive } from 'vue'
import {
  assessmentCategories,
  assessmentQuestions,
  beatRecommendations,
  overallAssessment
} from '@/data/assessment'
import PageHeader from '@/components/layout/PageHeader.vue'
import PageSection from '@/components/layout/PageSection.vue'

const answers = reactive({})

const questionsFor = (categoryId) => assessmentQuestions.filter((question) => question.category === categoryId)
const maxFor = (categoryId) => questionsFor(categoryId).length * overallAssessment.scoring.perQuestionMax
const scoreFor = (categoryId) =>
  questionsFor(categoryId).reduce((total, question) => total + (answers[question.id] ?? 0), 0)
const answeredIn = (categoryId) =>
  questionsFor(categoryId).filter((question) => answers[question.id] !== undefined).length

// The category rule is BEAT's own: below 40 percent of the category maximum is
// low, 40 to 70 percent is medium, above 70 percent is high.
const levelFor = (categoryId) => {
  const ratio = scoreFor(categoryId) / maxFor(categoryId)
  if (ratio < 0.4) return 'low'
  if (ratio <= 0.7) return 'medium'
  return 'high'
}

const totalScore = computed(() =>
  assessmentQuestions.reduce((total, question) => total + (answers[question.id] ?? 0), 0)
)
const answeredCount = computed(
  () => assessmentQuestions.filter((question) => answers[question.id] !== undefined).length
)
const complete = computed(() => answeredCount.value === assessmentQuestions.length)

// The overall bands are absolute score ranges out of 48, BEAT's own choice.
const bandFor = (score) => {
  const cut = overallAssessment.scoring.bandCuts.find(
    ([low, high]) => score >= low && score <= high
  )
  if (!cut) return null
  return (
    Object.values(overallAssessment).find(
      (band) => band && Array.isArray(band.range) && band.title === cut.title
    ) ?? null
  )
}

const overallBand = computed(() => (complete.value ? bandFor(totalScore.value) : null))

const reset = () => {
  for (const question of assessmentQuestions) delete answers[question.id]
}
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Applying BEAT"
      title="Team Assessment"
      summary="Answer a short set of questions about how your team works. Score what your team does now, not what it intends to do."
    />

    <PageSection
      title="Questions"
      :summary="`Answered so far: ${answeredCount}.`"
    >
      <div class="space-y-10">
        <div v-for="category in assessmentCategories" :key="category.id">
          <h3 class="flex items-center gap-2 text-heading font-semibold text-large">
            <i :class="category.icon" class="text-accent" aria-hidden="true"></i>
            {{ category.title }}
          </h3>

          <fieldset
            v-for="question in questionsFor(category.id)"
            :key="question.id"
            class="mt-5 border-t border-border pt-4"
          >
            <legend class="text-title font-semibold text-large">{{ question.question }}</legend>
            <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <label
                v-for="option in question.options"
                :key="option.value"
                class="flex cursor-pointer items-start gap-2 border border-border px-3 py-2 text-body-base text-body hover:bg-muted"
              >
                <input
                  v-model="answers[question.id]"
                  type="radio"
                  :name="`question-${question.id}`"
                  :value="option.value"
                  class="mt-1 h-4 w-4 accent-accent"
                />
                <span>
                  <span class="font-semibold text-large">{{ option.label }}</span>
                  <span class="block text-muted-foreground">{{ option.description }}</span>
                </span>
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    </PageSection>

    <PageSection title="Your result">
      <p v-if="!complete" class="text-body-base text-body">
        Some questions are still unanswered. Each category
        shows its recommendation once all of its questions are answered.
      </p>

      <div class="mt-6 space-y-8">
        <div v-for="category in assessmentCategories" :key="category.id">
          <template v-if="answeredIn(category.id) === questionsFor(category.id).length">
            <h3 class="flex items-center gap-2 text-heading font-semibold text-large">
              <i :class="category.icon" class="text-accent" aria-hidden="true"></i>
              {{ category.title }}
            </h3>
            <p class="mt-1 text-body-base text-body">
              {{ scoreFor(category.id) }} of {{ maxFor(category.id) }} points, level
              <strong class="text-large">{{ levelFor(category.id) }}</strong>.
            </p>
            <p class="mt-2 max-w-prose text-title font-semibold text-large">
              {{ beatRecommendations[category.id][levelFor(category.id)].title }}
            </p>
            <p class="mt-1 max-w-prose text-body-base text-body">
              {{ beatRecommendations[category.id][levelFor(category.id)].description }}
            </p>
            <ul class="mt-3 list-disc space-y-1 pl-5 text-body-base text-body">
              <li
                v-for="recommendation in beatRecommendations[category.id][levelFor(category.id)].recommendations"
                :key="recommendation"
              >
                {{ recommendation }}
              </li>
            </ul>
            <p class="mt-3 max-w-prose border-l-2 border-accent pl-3 text-body-base text-muted-foreground">
              {{ beatRecommendations[category.id][levelFor(category.id)].beatPrinciple }}
            </p>
          </template>
        </div>
      </div>

      <div v-if="overallBand" class="mt-10 border-t border-border pt-6">
        <h3 class="flex items-center gap-2 text-heading font-semibold text-large">
          <i :class="overallBand.icon" class="text-accent" aria-hidden="true"></i>
          Overall: {{ totalScore }} of {{ overallAssessment.scoring.maxScore }}
        </h3>
        <p class="mt-1 text-title font-semibold text-large">{{ overallBand.title }}</p>
        <p class="mt-1 max-w-prose text-body-base text-body">{{ overallBand.description }}</p>
        <p class="mt-2 max-w-prose text-body-base text-body">{{ overallBand.callToAction }}</p>
      </div>

      <button
        type="button"
        class="mt-8 inline-flex min-h-[44px] items-center border border-border px-4 py-2 text-body-base font-semibold text-large hover:bg-muted"
        @click="reset"
      >
        Clear answers
      </button>
    </PageSection>

    <PageSection title="How the score is calculated" :summary="overallAssessment.scoring.categoryThresholds">
      <p class="max-w-prose text-body-base text-body">{{ overallAssessment.scoring.derivation }}</p>
      <p class="mt-4 max-w-prose text-body-base text-body">{{ overallAssessment.validity.note }}</p>
    </PageSection>
  </div>
</template>
