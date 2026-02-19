<script setup>
import { onboarding } from '@/data/manifesto'

const weeks = [
  { ...onboarding.weekOne, icon: 'fas fa-eye', gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
  { ...onboarding.weekTwo, icon: 'fas fa-hand-pointer', gradient: 'from-purple-500 to-pink-500', color: 'purple' },
  { ...onboarding.weekThree, icon: 'fas fa-rocket', gradient: 'from-emerald-500 to-teal-500', color: 'emerald' }
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
    <section class="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-950/20 dark:to-orange-950/20 transition-colors duration-300"></div>
      <div class="absolute top-20 -left-20 w-96 h-96 bg-amber-400/20 dark:bg-amber-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div class="absolute top-40 -right-20 w-80 h-80 bg-orange-400/20 dark:bg-orange-500/20 rounded-full filter blur-3xl animate-float animate-delay-2000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-6 animate-fade-in-up">
          <i class="fas fa-user-plus"></i>
          Getting Started
        </div>
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-8 animate-fade-in-up animate-delay-100">
          <i class="fas fa-user-plus text-white text-3xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-200">Onboarding to BEAT</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
          When someone new joins a BEAT team, here's how to get them up to speed.
        </p>
      </div>
    </section>

    <!-- Weekly Timeline -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="space-y-6">
          <div
            v-for="(week, index) in weeks"
            :key="week.title"
            class="card p-8"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <div class="flex flex-col sm:flex-row sm:items-start gap-6">
              <div
                class="w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg"
                :class="week.gradient"
              >
                <i :class="week.icon" class="text-white text-2xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5">{{ week.title }}</h3>
                <ul class="grid sm:grid-cols-2 gap-3">
                  <li
                    v-for="item in week.items"
                    :key="item"
                    class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                  >
                    <i class="fas fa-check-circle text-emerald-500 mt-1"></i>
                    <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- First Month -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ onboarding.firstMonth.title }}</h2>
          <p class="text-gray-600 dark:text-gray-400">By the end of the first month, new members should:</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(item, index) in onboarding.firstMonth.items"
            :key="item"
            class="card p-6 group"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <span class="text-white text-lg font-bold">{{ index + 1 }}</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300 pt-2">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Connector's Responsibility & What We Don't -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <i class="fas fa-project-diagram text-white text-xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Connector's Responsibility</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              The Connector (or Enabler if no Connector) ensures:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/20">
                <i class="fas fa-check text-cyan-500 mt-1"></i>
                <span class="text-gray-700 dark:text-gray-300">Documentation is current and findable</span>
              </li>
              <li class="flex items-start gap-3 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/20">
                <i class="fas fa-check text-cyan-500 mt-1"></i>
                <span class="text-gray-700 dark:text-gray-300">New member has a "buddy" for questions (informal, not mandatory pairing)</span>
              </li>
              <li class="flex items-start gap-3 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/20">
                <i class="fas fa-check text-cyan-500 mt-1"></i>
                <span class="text-gray-700 dark:text-gray-300">First tasks are well-scoped and achievable</span>
              </li>
              <li class="flex items-start gap-3 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/20">
                <i class="fas fa-check text-cyan-500 mt-1"></i>
                <span class="text-gray-700 dark:text-gray-300">Overwhelm is caught early</span>
              </li>
            </ul>
          </div>

          <div class="card p-8 border-l-4 border-red-500">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <i class="fas fa-times text-white text-xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">What We Don't Do</h3>
            </div>
            <ul class="space-y-3">
              <li
                v-for="item in whatWeDont"
                :key="item"
                class="flex items-start gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20"
              >
                <i class="fas fa-times text-red-500 mt-1"></i>
                <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8">
          <i class="fas fa-bullseye text-white text-3xl"></i>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">The Goal</h2>
        <p class="text-white/90 text-xl leading-relaxed">
          Onboarding should feel like a gradual ramp, not a firehose or an abandonment.
        </p>
      </div>
    </section>
  </div>
</template>
