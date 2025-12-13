<script setup>
import TableCard from '@/components/ui/TableCard.vue'
import { antiPatterns, whereItFits } from '@/data/manifesto'

const processHeaders = ['Anti-Pattern', 'What It Looks Like', 'The Fix']
const processRows = antiPatterns.process.map(p => [
  `<strong class="text-red-600 dark:text-red-400">${p.pattern}</strong>`,
  p.looksLike,
  p.fix
])

const peopleHeaders = ['Anti-Pattern', 'What It Looks Like', 'The Fix']
const peopleRows = antiPatterns.people.map(p => [
  `<strong class="text-amber-600 dark:text-amber-400">${p.pattern}</strong>`,
  p.looksLike,
  p.fix
])

const orgHeaders = ['Anti-Pattern', 'What It Looks Like', 'The Fix']
const orgRows = antiPatterns.organizational.map(p => [
  `<strong class="text-purple-600 dark:text-purple-400">${p.pattern}</strong>`,
  p.looksLike,
  p.fix
])

const warningSigns = [
  'Burnout despite 80% planning',
  'Decisions taking too long async',
  'Quality declining',
  'Team feeling disconnected',
  'Makers disengaged from beat goals'
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-red-900/10 dark:to-orange-900/10 transition-colors duration-300"></div>
      <div class="absolute top-0 -left-4 w-72 h-72 bg-red-300 dark:bg-red-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-orange-300 dark:bg-orange-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-1000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <i class="fas fa-exclamation-triangle text-white text-2xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-100">Anti-Patterns</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          Common ways teams fail at BEAT—and how to fix them.
        </p>
      </div>
    </section>

    <!-- Process Anti-Patterns -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <i class="fas fa-cogs text-white"></i>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Process Anti-Patterns</h2>
        </div>
        <TableCard :headers="processHeaders" :rows="processRows" />
      </div>
    </section>

    <!-- People Anti-Patterns -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <i class="fas fa-users text-white"></i>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">People Anti-Patterns</h2>
        </div>
        <TableCard :headers="peopleHeaders" :rows="peopleRows" />
      </div>
    </section>

    <!-- Organizational Anti-Patterns -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-building text-white"></i>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Organizational Anti-Patterns</h2>
        </div>
        <TableCard :headers="orgHeaders" :rows="orgRows" />
      </div>
    </section>

    <!-- Warning Signs -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">When BEAT Isn't Working</h2>
          <p class="text-gray-600 dark:text-gray-400">Signs the methodology isn't serving the team:</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div
            v-for="sign in warningSigns"
            :key="sign"
            class="glass p-4 rounded-xl border-l-4 border-red-500"
          >
            <div class="flex items-center gap-3">
              <i class="fas fa-exclamation-circle text-red-500"></i>
              <span class="text-gray-700 dark:text-gray-300 text-sm">{{ sign }}</span>
            </div>
          </div>
        </div>

        <div class="glass p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-lightbulb text-white"></i>
            </div>
            <div>
              <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Response</h4>
              <p class="text-blue-700 dark:text-blue-300 text-sm">
                Discuss in Beat Close. Adapt the framework. BEAT is a tool, not a religion. If it's not working, change it or choose something else.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Where BEAT Fits -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Where BEAT Fits</h2>
          <p class="text-gray-600 dark:text-gray-400">Know your context. Adapt accordingly.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="glass p-6 rounded-xl border-t-4 border-green-500">
            <h3 class="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <i class="fas fa-check-circle text-green-500"></i>
              Works Best For
            </h3>
            <ul class="space-y-2">
              <li
                v-for="item in whereItFits.worksFor"
                :key="item"
                class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
              >
                <i class="fas fa-check text-green-500 text-xs"></i>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="glass p-6 rounded-xl border-t-4 border-red-500">
            <h3 class="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <i class="fas fa-times-circle text-red-500"></i>
              Fits Poorly For
            </h3>
            <ul class="space-y-2">
              <li
                v-for="item in whereItFits.fitsPoorly"
                :key="item"
                class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
              >
                <i class="fas fa-times text-red-500 text-xs"></i>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="glass p-6 rounded-xl border-t-4 border-amber-500">
            <h3 class="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <i class="fas fa-sliders-h text-amber-500"></i>
              Can Adapt For
            </h3>
            <ul class="space-y-2">
              <li
                v-for="item in whereItFits.canAdapt"
                :key="item"
                class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
              >
                <i class="fas fa-adjust text-amber-500 text-xs"></i>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
