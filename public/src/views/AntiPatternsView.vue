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
    <section class="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-red-950/20 dark:to-orange-950/20 transition-colors duration-300"></div>
      <div class="absolute top-20 -left-20 w-96 h-96 bg-red-400/20 dark:bg-red-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div class="absolute top-40 -right-20 w-80 h-80 bg-orange-400/20 dark:bg-orange-500/20 rounded-full filter blur-3xl animate-float animate-delay-2000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-6 animate-fade-in-up">
          <i class="fas fa-exclamation-triangle"></i>
          Watch Out
        </div>
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-8 animate-fade-in-up animate-delay-100">
          <i class="fas fa-exclamation-triangle text-white text-3xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-200">Anti-Patterns</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
          Common ways teams fail at BEAT—and how to fix them.
        </p>
      </div>
    </section>

    <!-- Process Anti-Patterns -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-4 mb-10">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
            <i class="fas fa-cogs text-white text-xl"></i>
          </div>
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Process Anti-Patterns</h2>
            <p class="text-gray-500 dark:text-gray-400">Issues in how work flows</p>
          </div>
        </div>
        <TableCard :headers="processHeaders" :rows="processRows" />
      </div>
    </section>

    <!-- People Anti-Patterns -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-4 mb-10">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
            <i class="fas fa-users text-white text-xl"></i>
          </div>
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">People Anti-Patterns</h2>
            <p class="text-gray-500 dark:text-gray-400">Issues in team dynamics</p>
          </div>
        </div>
        <TableCard :headers="peopleHeaders" :rows="peopleRows" />
      </div>
    </section>

    <!-- Organizational Anti-Patterns -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-4 mb-10">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
            <i class="fas fa-building text-white text-xl"></i>
          </div>
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Organizational Anti-Patterns</h2>
            <p class="text-gray-500 dark:text-gray-400">Issues from outside the team</p>
          </div>
        </div>
        <TableCard :headers="orgHeaders" :rows="orgRows" />
      </div>
    </section>

    <!-- Warning Signs -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">When BEAT Isn't Working</h2>
          <p class="text-gray-600 dark:text-gray-400">Signs the methodology isn't serving the team:</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <div
            v-for="(sign, index) in warningSigns"
            :key="sign"
            class="card p-5 border-l-4 border-red-500"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center gap-3">
              <i class="fas fa-exclamation-circle text-red-500 text-lg"></i>
              <span class="text-gray-700 dark:text-gray-300">{{ sign }}</span>
            </div>
          </div>
        </div>

        <div class="card p-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div class="flex items-start gap-5">
            <div class="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-lightbulb text-white text-xl"></i>
            </div>
            <div>
              <h4 class="font-bold text-blue-800 dark:text-blue-200 mb-2 text-lg">Response</h4>
              <p class="text-blue-700 dark:text-blue-300">Discuss in Beat Close. Adapt the framework. BEAT is a tool, not a religion. If it's not working, change it or choose something else.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Where BEAT Fits -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Where BEAT Fits</h2>
          <p class="text-gray-600 dark:text-gray-400">Know your context. Adapt accordingly.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="card p-8 border-t-4 border-emerald-500">
            <h3 class="font-bold text-xl text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <i class="fas fa-check-circle text-emerald-500 text-xl"></i>
              </div>
              Works Best For
            </h3>
            <ul class="space-y-3">
              <li
                v-for="item in whereItFits.worksFor"
                :key="item"
                class="text-gray-600 dark:text-gray-400 flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20"
              >
                <i class="fas fa-check text-emerald-500"></i>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="card p-8 border-t-4 border-red-500">
            <h3 class="font-bold text-xl text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <i class="fas fa-times-circle text-red-500 text-xl"></i>
              </div>
              Fits Poorly For
            </h3>
            <ul class="space-y-3">
              <li
                v-for="item in whereItFits.fitsPoorly"
                :key="item"
                class="text-gray-600 dark:text-gray-400 flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20"
              >
                <i class="fas fa-times text-red-500"></i>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="card p-8 border-t-4 border-amber-500">
            <h3 class="font-bold text-xl text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <i class="fas fa-sliders-h text-amber-500 text-xl"></i>
              </div>
              Can Adapt For
            </h3>
            <ul class="space-y-3">
              <li
                v-for="item in whereItFits.canAdapt"
                :key="item"
                class="text-gray-600 dark:text-gray-400 flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20"
              >
                <i class="fas fa-adjust text-amber-500"></i>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
