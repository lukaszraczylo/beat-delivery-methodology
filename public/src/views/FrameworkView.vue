<script setup>
import { roles, priorityBuckets, ceremonies, constraints } from '@/data/manifesto'

const workItems = [
  { name: 'Tasks', time: 'hours', description: 'A one-liner. No ceremony needed.' },
  { name: 'Work Items', time: 'days', description: 'Title, context, done condition. Three lines.' },
  { name: 'Projects', time: 'week+', description: 'Half-page doc with breakdown. No more.' }
]

const bucketColors = {
  red: 'from-red-500 to-red-600 border-red-500',
  amber: 'from-amber-500 to-amber-600 border-amber-500',
  blue: 'from-blue-500 to-blue-600 border-blue-500',
  gray: 'from-gray-500 to-gray-600 border-gray-500'
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-indigo-900/10 transition-colors duration-300"></div>
      <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-1000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <i class="fas fa-sitemap text-white text-2xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-100">The Framework</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          The principles guide us. The framework implements them.
        </p>
      </div>
    </section>

    <!-- Roles -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Roles</h2>
          <p class="text-gray-600 dark:text-gray-400">We recognize three roles, loosely held.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="role in roles"
            :key="role.name"
            class="glass p-6 rounded-xl group hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
              :class="role.gradient"
            >
              <i :class="role.icon" class="text-white text-xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{{ role.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ role.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Beats -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Beats</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We work in beats—flexible iterations of one to two weeks.
          </p>
        </div>

        <div class="glass p-8 rounded-2xl">
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-play text-white"></i>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Beat Start</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Review priorities and pull initial work</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-cogs text-white"></i>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">During Beat</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Check in async daily, work autonomously</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-flag-checkered text-white"></i>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Beat Close</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Reflect: what worked, what didn't, what to improve</p>
            </div>
          </div>

          <div class="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p class="text-sm text-blue-800 dark:text-blue-200">
              <i class="fas fa-info-circle mr-2"></i>
              Beats have <strong>goals</strong>, not commitments. We aim; we do not promise. There is no sprint pressure, no velocity tracking, no burndown theater.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Work Items -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Work Items</h2>
          <p class="text-gray-600 dark:text-gray-400">Documentation effort scales with task size.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="item in workItems"
            :key="item.name"
            class="glass p-6 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-center gap-3 mb-3">
              <span class="text-2xl font-bold gradient-text">{{ item.name }}</span>
            </div>
            <div class="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 mb-3">
              {{ item.time }}
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ item.description }}</p>
          </div>
        </div>

        <div class="mt-8 text-center">
          <p class="text-gray-500 dark:text-gray-500 text-sm">
            We size with <strong>S/M/L</strong>, not story points. We do not groom. We do not point. We do not track velocity.
          </p>
        </div>
      </div>
    </section>

    <!-- Prioritization -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Prioritization Buckets</h2>
          <p class="text-gray-600 dark:text-gray-400">We use four buckets to organize work.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="bucket in priorityBuckets"
            :key="bucket.name"
            class="glass p-5 rounded-xl border-l-4 hover:shadow-lg transition-all duration-300"
            :class="bucketColors[bucket.color]"
          >
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{{ bucket.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ bucket.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- The Board -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Board</h2>
          <p class="text-gray-600 dark:text-gray-400">A simple kanban with priority built in.</p>
        </div>

        <!-- Visual Board Flow -->
        <div class="glass p-4 sm:p-6 rounded-xl overflow-x-auto">
          <div class="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0">
            <div class="px-3 sm:px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">
              ICE
            </div>
            <i class="fas fa-arrow-right text-gray-400 text-xs"></i>
            <div class="px-3 sm:px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium">
              LATER
            </div>
            <i class="fas fa-arrow-right text-gray-400 text-xs"></i>
            <div class="px-3 sm:px-4 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-medium">
              NEXT
            </div>
            <i class="fas fa-arrow-right text-gray-400 text-xs"></i>
            <div class="px-3 sm:px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-medium">
              IN PROGRESS
            </div>
            <i class="fas fa-arrow-right text-gray-400 text-xs"></i>
            <div class="px-3 sm:px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs sm:text-sm font-medium">
              DONE
            </div>
          </div>
        </div>

        <div class="mt-8 grid sm:grid-cols-3 gap-4">
          <div class="glass p-4 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas fa-user text-blue-500"></i>
              <span class="font-semibold text-gray-900 dark:text-gray-100">WIP Limit</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">3 items per maker</p>
          </div>
          <div class="glass p-4 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas fa-sort-amount-up text-purple-500"></i>
              <span class="font-semibold text-gray-900 dark:text-gray-100">NEXT is Ordered</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Pull from top</p>
          </div>
          <div class="glass p-4 rounded-lg">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas fa-clock text-amber-500"></i>
              <span class="font-semibold text-gray-900 dark:text-gray-100">Stale Items</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Return to backlog after 5 days</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Constraints -->
    <section class="py-16 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white text-center mb-8">The Numbers</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="item in constraints"
            :key="item.constraint"
            class="bg-white/10 backdrop-blur-sm p-4 rounded-xl"
          >
            <div class="text-white/70 text-sm mb-1">{{ item.constraint }}</div>
            <div class="text-white text-xl font-bold">{{ item.limit }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
