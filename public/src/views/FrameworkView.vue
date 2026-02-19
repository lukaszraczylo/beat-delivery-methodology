<script setup>
import { roles, priorityBuckets, ceremonies, constraints } from '@/data/manifesto'

const workItems = [
  { name: 'Tasks', time: 'hours', description: 'A one-liner. No ceremony needed.', icon: 'fas fa-check', color: 'blue' },
  { name: 'Work Items', time: 'days', description: 'Title, context, done condition. Three lines.', icon: 'fas fa-tasks', color: 'purple' },
  { name: 'Projects', time: 'week+', description: 'Half-page doc with breakdown. No more.', icon: 'fas fa-folder', color: 'emerald' }
]

const bucketColors = {
  red: 'from-red-500 to-red-600 border-red-500 shadow-glow-red',
  amber: 'from-amber-500 to-amber-600 border-amber-500',
  blue: 'from-blue-500 to-blue-600 border-blue-500 shadow-glow-blue',
  gray: 'from-gray-500 to-gray-600 border-gray-500'
}

const boardColumns = [
  { name: 'ICE', color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400', icon: 'fas fa-snowflake' },
  { name: 'LATER', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', icon: 'fas fa-clock' },
  { name: 'NEXT', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300', icon: 'fas fa-arrow-up' },
  { name: 'IN PROGRESS', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300', icon: 'fas fa-spinner' },
  { name: 'DONE', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', icon: 'fas fa-check-circle' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-indigo-950/20 transition-colors duration-300"></div>
      <div class="absolute top-20 -left-20 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div class="absolute top-40 -right-20 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-500/20 rounded-full filter blur-3xl animate-float animate-delay-2000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6 animate-fade-in-up">
          <i class="fas fa-sitemap"></i>
          Implementation
        </div>
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-8 animate-fade-in-up animate-delay-100 shadow-glow-purple">
          <i class="fas fa-sitemap text-white text-3xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-200">The Framework</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
          The principles guide us. The framework implements them.
        </p>
      </div>
    </section>

    <!-- Roles -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Roles</h2>
          <p class="text-gray-600 dark:text-gray-400">We recognize three roles, loosely held.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(role, index) in roles"
            :key="role.name"
            class="card group p-8 text-center"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div
              class="w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg"
              :class="role.gradient"
            >
              <i :class="role.icon" class="text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ role.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ role.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Beats -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Beats</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We work in beats—flexible iterations of one to two weeks.
          </p>
        </div>

        <div class="glass p-8 sm:p-10 rounded-3xl">
          <!-- Timeline -->
          <div class="grid md:grid-cols-3 gap-8 relative">
            <!-- Connecting line -->
            <div class="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
            
            <div class="text-center relative">
              <div class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 relative z-10 shadow-glow-blue group-hover:scale-110 transition-transform">
                <i class="fas fa-play text-white text-2xl"></i>
              </div>
              <h4 class="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">Beat Start</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Review priorities and pull initial work</p>
            </div>
            <div class="text-center relative">
              <div class="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 relative z-10 shadow-glow-purple">
                <i class="fas fa-cogs text-white text-2xl"></i>
              </div>
              <h4 class="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">During Beat</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Check in async daily, work autonomously</p>
            </div>
            <div class="text-center relative">
              <div class="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 relative z-10">
                <i class="fas fa-flag-checkered text-white text-2xl"></i>
              </div>
              <h4 class="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">Beat Close</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Reflect: what worked, what didn't, what to improve</p>
            </div>
          </div>

          <div class="mt-10 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p class="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-3">
              <i class="fas fa-info-circle mt-0.5"></i>
              <span>Beats have <strong>goals</strong>, not commitments. We aim; we do not promise. There is no sprint pressure, no velocity tracking, no burndown theater.</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Work Items -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Work Items</h2>
          <p class="text-gray-600 dark:text-gray-400">Documentation effort scales with task size.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(item, index) in workItems"
            :key="item.name"
            class="card group p-8"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                :class="[
                  item.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  item.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  'from-emerald-500 to-emerald-600'
                ]"
              >
                <i :class="item.icon" class="text-white text-xl"></i>
              </div>
              <span class="text-2xl font-bold gradient-text">{{ item.name }}</span>
            </div>
            <div class="inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
              {{ item.time }}
            </div>
            <p class="text-gray-600 dark:text-gray-400">{{ item.description }}</p>
          </div>
        </div>

        <div class="mt-8 text-center">
          <p class="text-gray-500 dark:text-gray-500">
            We size with <strong class="text-gray-700 dark:text-gray-300">S/M/L</strong>, not story points. We do not groom. We do not point. We do not track velocity.
          </p>
        </div>
      </div>
    </section>

    <!-- Prioritization -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Prioritization Buckets</h2>
          <p class="text-gray-600 dark:text-gray-400">We use four buckets to organize work.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(bucket, index) in priorityBuckets"
            :key="bucket.name"
            class="card p-6 border-l-4"
            :class="bucketColors[bucket.color]"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{{ bucket.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ bucket.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- The Board -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Board</h2>
          <p class="text-gray-600 dark:text-gray-400">A simple kanban with priority built in.</p>
        </div>

        <!-- Visual Board Flow -->
        <div class="glass p-6 sm:p-8 rounded-3xl overflow-x-auto mb-8">
          <div class="flex items-center justify-start sm:justify-center gap-3 min-w-max sm:min-w-0">
            <template v-for="(col, index) in boardColumns" :key="col.name">
              <div 
                class="flex items-center gap-2 px-4 py-3 rounded-xl font-medium"
                :class="col.color"
              >
                <i :class="col.icon" class="text-sm"></i>
                <span class="text-sm">{{ col.name }}</span>
              </div>
              <i v-if="index < boardColumns.length - 1" class="fas fa-arrow-right text-gray-400"></i>
            </template>
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-5">
          <div class="card p-6 text-center group">
            <div class="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <i class="fas fa-user text-blue-500 text-xl"></i>
            </div>
            <span class="font-semibold text-gray-900 dark:text-gray-100 block mb-1">WIP Limit</span>
            <p class="text-sm text-gray-600 dark:text-gray-400">3 items per maker</p>
          </div>
          <div class="card p-6 text-center group">
            <div class="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <i class="fas fa-sort-amount-up text-purple-500 text-xl"></i>
            </div>
            <span class="font-semibold text-gray-900 dark:text-gray-100 block mb-1">NEXT is Ordered</span>
            <p class="text-sm text-gray-600 dark:text-gray-400">Pull from top</p>
          </div>
          <div class="card p-6 text-center group">
            <div class="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <i class="fas fa-clock text-amber-500 text-xl"></i>
            </div>
            <span class="font-semibold text-gray-900 dark:text-gray-100 block mb-1">Stale Items</span>
            <p class="text-sm text-gray-600 dark:text-gray-400">Return to backlog after 5 days</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Constraints -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600"></div>
      
      <div class="relative max-w-5xl mx-auto px-4 sm:px-6">
        <h2 class="text-3xl sm:text-4xl font-bold text-white text-center mb-12">The Numbers</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(item, index) in constraints"
            :key="item.constraint"
            class="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <div class="text-white/70 text-sm mb-1">{{ item.constraint }}</div>
            <div class="text-white text-2xl font-bold">{{ item.limit }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
