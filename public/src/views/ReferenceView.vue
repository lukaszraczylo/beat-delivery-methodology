<script setup>
import TableCard from '@/components/ui/TableCard.vue'
import CopyButton from '@/components/ui/CopyButton.vue'
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
  red: { bg: 'from-red-500 to-red-600', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-300', badge: 'bg-red-50 dark:bg-red-900/20' },
  amber: { bg: 'from-amber-500 to-amber-600', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300', badge: 'bg-amber-50 dark:bg-amber-900/20' },
  blue: { bg: 'from-blue-500 to-blue-600', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300', badge: 'bg-blue-50 dark:bg-blue-900/20' },
  purple: { bg: 'from-purple-500 to-purple-600', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300', badge: 'bg-purple-50 dark:bg-purple-900/20' }
}

const incidentColors = [
  'from-red-500 to-red-600',
  'from-orange-500 to-orange-600',
  'from-amber-500 to-amber-600',
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600'
]

// Template text for copying
const dailyCheckinTemplate = `Working on: [current task]
Blocked by: [nothing / specific issue]`

const definitionOfDoneText = definitionOfDone.code.join('\n')
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-950/20 dark:to-blue-950/20 transition-colors duration-300"></div>
      <div class="absolute top-20 -left-20 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div class="absolute top-40 -right-20 w-80 h-80 bg-blue-400/20 dark:bg-blue-500/20 rounded-full filter blur-3xl animate-float animate-delay-2000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-6 animate-fade-in-up">
          <i class="fas fa-book"></i>
          Quick Lookup
        </div>
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-8 animate-fade-in-up animate-delay-100">
          <i class="fas fa-book text-white text-3xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-200">Quick Reference</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
          Everything you need at a glance. Copy templates with one click.
        </p>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-10 sm:py-14 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-6 rounded-full bg-gradient-to-b from-rose-500 to-pink-500"></div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Core Values</h2>
        </div>
        <TableCard :headers="coreValuesHeaders" :rows="coreValuesRows" />
      </div>
    </section>

    <!-- Team Values -->
    <section class="py-10 sm:py-14 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Team Values</h2>
        </div>
        <TableCard :headers="teamValuesHeaders" :rows="teamValuesRows" />
      </div>
    </section>

    <!-- The Numbers -->
    <section class="py-10 sm:py-14 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-500"></div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">The Numbers</h2>
        </div>
        <TableCard :headers="constraintsHeaders" :rows="constraintsRows" />
      </div>
    </section>

    <!-- Buckets & Roles -->
    <section class="py-10 sm:py-14 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1 h-6 rounded-full bg-gradient-to-b from-amber-500 to-orange-500"></div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Priority Buckets</h2>
            </div>
            <TableCard :headers="bucketsHeaders" :rows="bucketsRows" />
          </div>
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Roles</h2>
            </div>
            <TableCard :headers="rolesHeaders" :rows="rolesRows" />
          </div>
        </div>
      </div>
    </section>

    <!-- Ceremonies -->
    <section class="py-10 sm:py-14 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-blue-500"></div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Ceremonies</h2>
        </div>
        <TableCard :headers="ceremoniesHeaders" :rows="ceremoniesRows" />
      </div>
    </section>

    <!-- Templates with Copy Buttons -->
    <section class="py-10 sm:py-14 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-1 h-6 rounded-full bg-gradient-to-b from-pink-500 to-rose-500"></div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Templates</h2>
          <span class="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">Click to copy</span>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Daily Check-in Card -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <i class="fas fa-calendar-check text-blue-500"></i>
                </div>
                Daily Check-in
              </h3>
              <CopyButton :text="dailyCheckinTemplate" label="Copy" />
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-tasks text-white"></i>
                </div>
                <div>
                  <div class="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">Working on</div>
                  <div class="text-gray-700 dark:text-gray-300">[current task]</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-hand-paper text-white"></i>
                </div>
                <div>
                  <div class="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wide">Blocked by</div>
                  <div class="text-gray-700 dark:text-gray-300">[nothing / specific issue]</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Spotted Issue Decision Flow -->
          <div class="card p-6">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-5 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <i class="fas fa-code-branch text-purple-500"></i>
              </div>
              Spotted Issue Decision
            </h3>
            <div class="space-y-3">
              <div
                v-for="(item, index) in spottedIssueFlow"
                :key="index"
                class="flex items-center gap-3 p-3 rounded-xl border"
                :class="[colorMap[item.color].badge, colorMap[item.color].border]"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0"
                  :class="colorMap[item.color].bg"
                >
                  <i :class="item.icon" class="text-white"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ item.question }}</span>
                </div>
                <i class="fas fa-arrow-right text-xs opacity-50"></i>
                <span class="text-sm font-bold whitespace-nowrap" :class="colorMap[item.color].text">{{ item.answer }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Definition of Done -->
    <section class="py-10 sm:py-14 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-green-500"></div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Definition of Done (Code)</h2>
          </div>
          <CopyButton :text="definitionOfDoneText" label="Copy All" />
        </div>
        <div class="card p-6">
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              v-for="item in definitionOfDone.code"
              :key="item"
              class="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
            >
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-check text-white text-sm"></i>
              </div>
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Incident Protocol -->
    <section class="py-10 sm:py-14 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-6 rounded-full bg-gradient-to-b from-red-500 to-orange-500"></div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Incident Protocol</h2>
        </div>
        <div class="card p-6">
          <div class="relative">
            <!-- Flow line for desktop -->
            <div class="hidden sm:block absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 via-amber-500 via-blue-500 to-green-500"></div>
            <div class="space-y-4">
              <div
                v-for="(step, index) in incidentProtocol"
                :key="step.step"
                class="flex items-start gap-4"
              >
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 z-10 shadow-lg"
                  :class="incidentColors[index]"
                >
                  <span class="text-white font-bold">{{ index + 1 }}</span>
                </div>
                <div class="flex-1 pb-2 pt-2">
                  <div class="font-semibold text-gray-900 dark:text-gray-100">{{ step.step.replace(/^\d+\.\s*/, '') }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Note -->
    <section class="py-10 sm:py-14 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="card p-8">
          <p class="text-gray-600 dark:text-gray-400 mb-2">
            BEAT v1.0 by <strong class="text-gray-900 dark:text-gray-100">Lukasz Raczylo</strong>
          </p>
          <p class="text-gray-500 dark:text-gray-500 text-sm italic">
            Attribution appreciated. Improvement welcomed. Dogma discouraged.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
