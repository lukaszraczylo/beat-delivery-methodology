<script setup>
import TableCard from '@/components/ui/TableCard.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
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
          Everything you need at a glance. Print this page and keep it handy.
        </p>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Core Values</h2>
        <TableCard :headers="coreValuesHeaders" :rows="coreValuesRows" />
      </div>
    </section>

    <!-- Team Values -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Team Values</h2>
        <TableCard :headers="teamValuesHeaders" :rows="teamValuesRows" />
      </div>
    </section>

    <!-- The Numbers -->
    <section class="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Numbers</h2>
        <TableCard :headers="constraintsHeaders" :rows="constraintsRows" />
      </div>
    </section>

    <!-- Buckets & Roles -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Priority Buckets</h2>
            <TableCard :headers="bucketsHeaders" :rows="bucketsRows" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Roles</h2>
            <TableCard :headers="rolesHeaders" :rows="rolesRows" />
          </div>
        </div>
      </div>
    </section>

    <!-- Ceremonies -->
    <section class="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ceremonies</h2>
        <TableCard :headers="ceremoniesHeaders" :rows="ceremoniesRows" />
      </div>
    </section>

    <!-- Templates -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Templates</h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3">Daily Check-in</h3>
            <CodeBlock>Working on: [task]
Blocked by: [nothing / issue]</CodeBlock>
          </div>

          <div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3">Spotted Issue Decision</h3>
            <CodeBlock>Blocking? → Fix now
≤5 min?   → Fix now
>5 min?   → Log it, continue
Critical? → Flag team</CodeBlock>
          </div>
        </div>
      </div>
    </section>

    <!-- Definition of Done -->
    <section class="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Definition of Done (Code)</h2>
        <CodeBlock>{{ definitionOfDone.code.map(item => '✓ ' + item).join('\n') }}</CodeBlock>
      </div>
    </section>

    <!-- Incident Protocol -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Incident Protocol</h2>
        <CodeBlock>{{ incidentProtocol.map(step => step.step + ' ' + step.description.split('.')[0]).join('\n') }}</CodeBlock>
      </div>
    </section>

    <!-- Footer Note -->
    <section class="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="glass p-6 rounded-xl">
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
