<script setup>
import TableCard from '@/components/ui/TableCard.vue'
import { coreValues, teamValues, constraints, priorityBuckets, roles, ceremonies, definitionOfDone, incidentProtocol } from '@/data/manifesto'

const coreValuesHeaders = ['We Value More', 'Over']
const coreValuesRows = coreValues.map(v => [
  `<strong>${v.valueMore}</strong>`,
  v.over
])

const teamValuesHeaders = ['Value', 'Meaning']
const teamValuesRows = teamValues.map(v => [
  `<strong>${v.name}</strong>`,
  v.description.split('.')[0] + '.'
])

const constraintsHeaders = ['Constraint', 'Limit']
const constraintsRows = constraints.map(c => [
  c.constraint,
  `<strong class="text-blue-600 dark:text-blue-400">${c.limit}</strong>`
])

const bucketsHeaders = ['Bucket', 'Meaning']
const bucketsRows = priorityBuckets.map(b => [
  `<strong>${b.name}</strong>`,
  b.description.split('.')[0]
])

const rolesHeaders = ['Role', 'Purpose']
const rolesRows = roles.map(r => [
  `<strong>${r.name.replace('The ', '')}</strong>`,
  r.description.split('.')[0]
])

const ceremoniesHeaders = ['Event', 'Duration', 'Purpose']
const ceremoniesRows = ceremonies.map(c => [
  `<strong>${c.name}</strong>`,
  c.duration,
  c.purpose
])

const spottedIssueFlow = [
  { question: 'Blocking your work?', answer: 'Fix now', icon: 'fas fa-ban', color: 'red' },
  { question: '5 minutes or less?', answer: 'Fix now', icon: 'fas fa-clock', color: 'amber' },
  { question: 'More than 5 minutes?', answer: 'Log it, continue', icon: 'fas fa-sticky-note', color: 'blue' },
  { question: 'Production critical?', answer: 'Flag team', icon: 'fas fa-exclamation-triangle', color: 'purple' }
]

const colorMap = {
  red: 'from-red-500 to-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
  amber: 'from-amber-500 to-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
  blue: 'from-blue-500 to-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
  purple: 'from-purple-500 to-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300'
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-900/10 dark:to-blue-900/10 transition-colors duration-300"></div>
      <div class="absolute top-0 -left-4 w-72 h-72 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-1000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <i class="fas fa-book text-white text-2xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-100">Quick Reference</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          Everything you need at a glance.
        </p>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-8 sm:py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Core Values</h2>
        <TableCard :headers="coreValuesHeaders" :rows="coreValuesRows" />
      </div>
    </section>

    <!-- Team Values -->
    <section class="py-8 sm:py-12 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Team Values</h2>
        <TableCard :headers="teamValuesHeaders" :rows="teamValuesRows" />
      </div>
    </section>

    <!-- The Numbers -->
    <section class="py-8 sm:py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Numbers</h2>
        <TableCard :headers="constraintsHeaders" :rows="constraintsRows" />
      </div>
    </section>

    <!-- Buckets & Roles -->
    <section class="py-8 sm:py-12 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Priority Buckets</h2>
            <TableCard :headers="bucketsHeaders" :rows="bucketsRows" />
          </div>
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Roles</h2>
            <TableCard :headers="rolesHeaders" :rows="rolesRows" />
          </div>
        </div>
      </div>
    </section>

    <!-- Ceremonies -->
    <section class="py-8 sm:py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ceremonies</h2>
        <TableCard :headers="ceremoniesHeaders" :rows="ceremoniesRows" />
      </div>
    </section>

    <!-- Templates -->
    <section class="py-8 sm:py-12 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Templates</h2>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Daily Check-in Card -->
          <div class="glass p-5 sm:p-6 rounded-xl">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <i class="fas fa-calendar-check text-blue-500"></i>
              Daily Check-in
            </h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-tasks text-white text-xs"></i>
                </div>
                <div>
                  <div class="text-xs text-blue-600 dark:text-blue-400 font-medium">Working on</div>
                  <div class="text-sm text-gray-700 dark:text-gray-300">[current task]</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-hand-paper text-white text-xs"></i>
                </div>
                <div>
                  <div class="text-xs text-amber-600 dark:text-amber-400 font-medium">Blocked by</div>
                  <div class="text-sm text-gray-700 dark:text-gray-300">[nothing / specific issue]</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Spotted Issue Decision Flow -->
          <div class="glass p-5 sm:p-6 rounded-xl">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <i class="fas fa-code-branch text-purple-500"></i>
              Spotted Issue Decision
            </h3>
            <div class="space-y-2">
              <div
                v-for="(item, index) in spottedIssueFlow"
                :key="index"
                class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border"
                :class="colorMap[item.color].split(' ').slice(2).join(' ')"
              >
                <div
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0"
                  :class="colorMap[item.color].split(' ').slice(0, 2).join(' ')"
                >
                  <i :class="item.icon" class="text-white text-xs"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <span class="text-xs sm:text-sm font-medium">{{ item.question }}</span>
                </div>
                <i class="fas fa-arrow-right text-xs opacity-50 hidden sm:block"></i>
                <span class="text-xs sm:text-sm font-bold whitespace-nowrap">{{ item.answer }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Definition of Done -->
    <section class="py-8 sm:py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Definition of Done (Code)</h2>
        <div class="glass p-5 sm:p-6 rounded-xl">
          <div class="grid sm:grid-cols-2 gap-2 sm:gap-3">
            <div
              v-for="item in definitionOfDone.code"
              :key="item"
              class="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            >
              <div class="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-check text-white text-xs"></i>
              </div>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Incident Protocol -->
    <section class="py-8 sm:py-12 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Incident Protocol</h2>
        <div class="glass p-5 sm:p-6 rounded-xl">
          <div class="relative">
            <!-- Flow line for desktop -->
            <div class="hidden sm:block absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-red-500 via-amber-500 to-green-500"></div>
            <div class="space-y-4">
              <div
                v-for="(step, index) in incidentProtocol"
                :key="step.step"
                class="flex items-start gap-3 sm:gap-4"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  :class="[
                    index === 0 ? 'bg-gradient-to-br from-red-500 to-red-600' :
                    index === 1 ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                    index === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                    index === 3 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    'bg-gradient-to-br from-green-500 to-green-600'
                  ]"
                >
                  <span class="text-white font-bold text-sm">{{ index + 1 }}</span>
                </div>
                <div class="flex-1 pb-2">
                  <div class="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{{ step.step.replace(/^\d+\.\s*/, '') }}</div>
                  <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Note -->
    <section class="py-8 sm:py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="glass p-5 sm:p-6 rounded-xl">
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">
            BEAT v1.0 by <strong>Lukasz Raczylo</strong>
          </p>
          <p class="text-gray-500 dark:text-gray-500 text-xs">
            Attribution appreciated. Improvement welcomed. Dogma discouraged.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
