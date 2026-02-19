<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { assessmentCategories, assessmentQuestions, beatRecommendations, overallAssessment } from '@/data/assessment'

const currentStep = ref(0)
const answers = ref({})
const showResults = ref(false)

const totalQuestions = assessmentQuestions.length
const currentQuestion = computed(() => assessmentQuestions[currentStep.value - 1])
const progress = computed(() => Math.round((Object.keys(answers.value).length / totalQuestions) * 100))

const startAssessment = () => {
  currentStep.value = 1
  answers.value = {}
  showResults.value = false
}

const selectAnswer = (questionId, value) => {
  answers.value[questionId] = value
  if (currentStep.value < totalQuestions) {
    setTimeout(() => {
      currentStep.value++
    }, 300)
  } else {
    setTimeout(() => {
      showResults.value = true
      currentStep.value = totalQuestions + 1
    }, 300)
  }
}

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const restartAssessment = () => {
  currentStep.value = 0
  answers.value = {}
  showResults.value = false
}

const categoryScores = computed(() => {
  const scores = {}
  assessmentCategories.forEach(cat => {
    const categoryQuestions = assessmentQuestions.filter(q => q.category === cat.id)
    const categoryAnswers = categoryQuestions.map(q => answers.value[q.id] || 0)
    const total = categoryAnswers.reduce((a, b) => a + b, 0)
    const max = categoryQuestions.length * 4
    scores[cat.id] = {
      score: total,
      max,
      percentage: Math.round((total / max) * 100),
      level: total <= max * 0.4 ? 'low' : total <= max * 0.7 ? 'medium' : 'high'
    }
  })
  return scores
})

const totalScore = computed(() => {
  return Object.values(answers.value).reduce((a, b) => a + b, 0)
})

const overallLevel = computed(() => {
  const score = totalScore.value
  if (score <= 24) return overallAssessment.struggling
  if (score <= 36) return overallAssessment.developing
  if (score <= 42) return overallAssessment.strong
  return overallAssessment.excellent
})

const getRecommendation = (categoryId) => {
  const level = categoryScores.value[categoryId]?.level || 'low'
  return beatRecommendations[categoryId][level]
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-500 to-blue-600',
    progress: 'bg-blue-500'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-600 dark:text-purple-400',
    gradient: 'from-purple-500 to-purple-600',
    progress: 'bg-purple-500'
  },
  green: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-600 dark:text-emerald-400',
    gradient: 'from-emerald-500 to-emerald-600',
    progress: 'bg-emerald-500'
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-600 dark:text-amber-400',
    gradient: 'from-amber-500 to-amber-600',
    progress: 'bg-amber-500'
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-600 dark:text-red-400',
    gradient: 'from-red-500 to-red-600',
    progress: 'bg-red-500'
  }
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-10 sm:pb-12 lg:pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950/20 dark:to-purple-950/20 transition-colors duration-300"></div>
      <div class="absolute top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-400/20 dark:bg-indigo-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div class="absolute top-40 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-purple-400/20 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-float animate-delay-2000"></div>

      <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-in-up">
          <i class="fas fa-clipboard-check"></i>
          Self-Assessment
        </div>
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-fade-in-up animate-delay-100">
          <i class="fas fa-clipboard-check text-white text-2xl sm:text-3xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-200">Team Assessment</h1>
        <p class="section-subtitle max-w-2xl lg:max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
          Discover how BEAT can help your team deliver better and faster.
        </p>
      </div>
    </section>

    <!-- Intro Screen -->
    <section v-if="currentStep === 0" class="py-8 sm:py-10 lg:py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="card p-6 sm:p-8 lg:p-10 text-center">
          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-glow-purple">
            <i class="fas fa-tasks text-white text-2xl sm:text-4xl"></i>
          </div>
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            How BEAT-Ready is Your Team?
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Answer 12 quick questions about your current practices. We'll analyze your responses and show you specifically how BEAT principles can help your team.
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div v-for="cat in assessmentCategories" :key="cat.id" class="p-3 sm:p-4 rounded-xl" :class="colorClasses[cat.color].bg">
              <div 
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center mx-auto mb-2 sm:mb-3"
                :class="cat.gradient"
              >
                <i :class="cat.icon" class="text-white text-base sm:text-xl"></i>
              </div>
              <div class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">{{ cat.title }}</div>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-6 sm:mb-8">
            <span class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100 dark:bg-gray-800">
              <i class="fas fa-clock"></i> 3-5 min
            </span>
            <span class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100 dark:bg-gray-800">
              <i class="fas fa-shield-alt"></i> Anonymous
            </span>
            <span class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100 dark:bg-gray-800">
              <i class="fas fa-chart-bar"></i> Instant results
            </span>
          </div>

          <button @click="startAssessment" class="btn-primary text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4">
            <i class="fas fa-play mr-2"></i>
            Start Assessment
          </button>
        </div>
      </div>
    </section>

    <!-- Question Screen -->
    <section v-else-if="!showResults" class="py-6 sm:py-8 lg:py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Progress Bar -->
        <div class="mb-5 sm:mb-6">
          <div class="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span class="font-medium">Question {{ currentStep }} of {{ totalQuestions }}</span>
            <span>{{ progress }}% complete</span>
          </div>
          <div class="h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Category Badge -->
        <div class="mb-4 sm:mb-6">
          <span
            class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
            :class="[colorClasses[assessmentCategories.find(c => c.id === currentQuestion.category)?.color || 'blue'].bg, colorClasses[assessmentCategories.find(c => c.id === currentQuestion.category)?.color || 'blue'].text]"
          >
            <i :class="assessmentCategories.find(c => c.id === currentQuestion.category)?.icon" class="text-xs"></i>
            {{ assessmentCategories.find(c => c.id === currentQuestion.category)?.title }}
          </span>
        </div>

        <!-- Question Card -->
        <div class="card p-5 sm:p-6 lg:p-8">
          <h2 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-5 sm:mb-6">
            {{ currentQuestion.question }}
          </h2>

          <div class="space-y-2.5 sm:space-y-3">
            <button
              v-for="option in currentQuestion.options"
              :key="option.value"
              @click="selectAnswer(currentQuestion.id, option.value)"
              class="w-full p-3 sm:p-4 lg:p-5 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md min-h-[64px] sm:min-h-[72px] group"
              :class="[
                answers[currentQuestion.id] === option.value
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              ]"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                  :class="[
                    answers[currentQuestion.id] === option.value
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'
                  ]"
                >
                  <i v-if="answers[currentQuestion.id] === option.value" class="fas fa-check text-white text-xs"></i>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-gray-100 mb-0.5 sm:mb-1 text-sm sm:text-base">{{ option.label }}</div>
                  <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-500">{{ option.description }}</div>
                </div>
              </div>
            </button>
          </div>

          <div class="flex items-center justify-between mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-200 dark:border-gray-700">
            <button
              v-if="currentStep > 1"
              @click="goBack"
              class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm sm:text-base"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Back
            </button>
            <div v-else></div>

            <div class="hidden sm:flex items-center gap-1.5">
              <div
                v-for="i in totalQuestions"
                :key="i"
                class="w-2 h-2 rounded-full transition-colors"
                :class="[
                  i === currentStep ? 'bg-indigo-500' :
                  answers[i] ? 'bg-indigo-300 dark:bg-indigo-700' :
                  'bg-gray-300 dark:bg-gray-600'
                ]"
              ></div>
            </div>
            <div class="sm:hidden text-xs sm:text-sm text-gray-500 dark:text-gray-500">
              {{ currentStep }}/{{ totalQuestions }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Results Screen -->
    <section v-else class="py-6 sm:py-8 lg:py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Overall Score -->
        <div class="card p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8 text-center">
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
            :class="colorClasses[overallLevel.color].bg"
          >
            <i :class="[overallLevel.icon, colorClasses[overallLevel.color].text]" class="text-2xl sm:text-3xl lg:text-4xl"></i>
          </div>
          <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {{ overallLevel.title }}
          </h2>
          <div class="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
            {{ totalScore }} / 48
          </div>
          <p class="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-3 sm:mb-4 text-sm sm:text-base">
            {{ overallLevel.description }}
          </p>
          <div
            class="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl"
            :class="[colorClasses[overallLevel.color].bg, colorClasses[overallLevel.color].border]"
          >
            <i class="fas fa-lightbulb" :class="colorClasses[overallLevel.color].text"></i>
            <span class="font-medium text-sm sm:text-base" :class="colorClasses[overallLevel.color].text">{{ overallLevel.callToAction }}</span>
          </div>
        </div>

        <!-- Category Breakdown -->
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3">
          <div class="w-0.5 sm:w-1 h-5 sm:h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
          Category Breakdown
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            v-for="cat in assessmentCategories"
            :key="cat.id"
            class="card p-4 sm:p-5"
          >
            <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center"
                :class="cat.gradient"
              >
                <i :class="cat.icon" class="text-white text-base sm:text-lg"></i>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">{{ cat.title }}</div>
                <div class="text-xs sm:text-sm" :class="colorClasses[cat.color].text">
                  {{ categoryScores[cat.id]?.percentage }}% ({{ categoryScores[cat.id]?.score }}/{{ categoryScores[cat.id]?.max }})
                </div>
              </div>
            </div>
            <div class="h-2 sm:h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000"
                :class="colorClasses[cat.color].progress"
                :style="{ width: `${categoryScores[cat.id]?.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Detailed Recommendations -->
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3">
          <div class="w-0.5 sm:w-1 h-5 sm:h-6 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></div>
          How BEAT Can Help
        </h3>
        <div class="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
          <div
            v-for="cat in assessmentCategories"
            :key="cat.id"
            class="card p-4 sm:p-5 lg:p-6"
          >
            <div class="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0"
                :class="cat.gradient"
              >
                <i :class="cat.icon" class="text-white text-base sm:text-lg"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base lg:text-lg">{{ getRecommendation(cat.id).title }}</h4>
                <p class="text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1 text-xs sm:text-sm">{{ getRecommendation(cat.id).description }}</p>
              </div>
            </div>

            <div class="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
              <div
                v-for="rec in getRecommendation(cat.id).recommendations"
                :key="rec"
                class="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg"
                :class="colorClasses[cat.color].bg"
              >
                <i class="fas fa-check-circle mt-0.5 text-xs sm:text-sm" :class="colorClasses[cat.color].text"></i>
                <span class="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{{ rec }}</span>
              </div>
            </div>

            <div class="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4" :class="colorClasses[cat.color].border">
              <i class="fas fa-quote-left text-gray-400 mt-0.5 text-xs sm:text-sm"></i>
              <p class="text-gray-600 dark:text-gray-400 italic text-xs sm:text-sm">{{ getRecommendation(cat.id).beatPrinciple }}</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-center">
          <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">Ready to Transform Your Team?</h3>
          <p class="text-white/80 mb-4 sm:mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Explore the full BEAT manifesto and start implementing these practices today.
          </p>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <RouterLink to="/values" class="bg-white text-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[48px] flex items-center justify-center text-sm sm:text-base">
              <i class="fas fa-book-open mr-2"></i>
              Read the Manifesto
            </RouterLink>
            <button @click="restartAssessment" class="bg-white/20 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors min-h-[48px] flex items-center justify-center text-sm sm:text-base">
              <i class="fas fa-redo mr-2"></i>
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
