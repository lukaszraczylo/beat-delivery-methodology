<script setup>
import { onboarding } from '@/data/manifesto'

const weeks = [
  { ...onboarding.weekOne, icon: 'fas fa-eye', gradient: 'from-blue-500 to-cyan-500' },
  { ...onboarding.weekTwo, icon: 'fas fa-hand-pointer', gradient: 'from-purple-500 to-pink-500' },
  { ...onboarding.weekThree, icon: 'fas fa-rocket', gradient: 'from-green-500 to-emerald-500' }
]

const whatWeDont = [
  'Throw new members into complex work immediately',
  'Expect full productivity in week one',
  'Leave people to figure it out alone',
  'Assign mandatory onboarding buddies for months'
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/10 dark:to-orange-900/10 transition-colors duration-300"></div>
      <div class="absolute top-0 -left-4 w-72 h-72 bg-amber-300 dark:bg-amber-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-orange-300 dark:bg-orange-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-1000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <i class="fas fa-user-plus text-white text-2xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-100">Onboarding to BEAT</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          When someone new joins a BEAT team, here's how to get them up to speed.
        </p>
      </div>
    </section>

    <!-- Weekly Timeline -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="space-y-8">
          <div
            v-for="(week, index) in weeks"
            :key="week.title"
            class="glass p-6 sm:p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-start gap-6">
              <div
                class="w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0"
                :class="week.gradient"
              >
                <i :class="week.icon" class="text-white text-xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ week.title }}</h3>
                <ul class="space-y-3">
                  <li
                    v-for="item in week.items"
                    :key="item"
                    class="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <i class="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- First Month -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ onboarding.firstMonth.title }}</h2>
          <p class="text-gray-600 dark:text-gray-400">By the end of the first month, new members should:</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(item, index) in onboarding.firstMonth.items"
            :key="item"
            class="glass p-5 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <span class="text-white text-sm font-bold">{{ index + 1 }}</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300 text-sm">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Connector's Responsibility -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="glass p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <i class="fas fa-project-diagram text-white"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Connector's Responsibility</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              The Connector (or Enabler if no Connector) ensures:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <i class="fas fa-check text-cyan-500 mt-1"></i>
                Documentation is current and findable
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <i class="fas fa-check text-cyan-500 mt-1"></i>
                New member has a "buddy" for questions (informal, not mandatory pairing)
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <i class="fas fa-check text-cyan-500 mt-1"></i>
                First tasks are well-scoped and achievable
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <i class="fas fa-check text-cyan-500 mt-1"></i>
                Overwhelm is caught early
              </li>
            </ul>
          </div>

          <div class="glass p-6 rounded-xl border-l-4 border-red-500">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <i class="fas fa-times text-white"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">What We Don't Do</h3>
            </div>
            <ul class="space-y-3">
              <li
                v-for="item in whatWeDont"
                :key="item"
                class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <i class="fas fa-times text-red-500 mt-1"></i>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="py-16 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">The Goal</h2>
        <p class="text-white/90 text-lg">
          Onboarding should feel like a gradual ramp, not a firehose or an abandonment.
        </p>
      </div>
    </section>
  </div>
</template>
