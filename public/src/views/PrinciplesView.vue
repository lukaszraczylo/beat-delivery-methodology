<script setup>
import { principles } from '@/data/manifesto'

const categories = [
  { key: 'focus', title: 'On Focus', icon: 'fas fa-bullseye', gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
  { key: 'communication', title: 'On Communication', icon: 'fas fa-comments', gradient: 'from-purple-500 to-pink-500', color: 'purple' },
  { key: 'autonomy', title: 'On Autonomy', icon: 'fas fa-user-shield', gradient: 'from-green-500 to-emerald-500', color: 'green' },
  { key: 'sustainability', title: 'On Sustainability', icon: 'fas fa-leaf', gradient: 'from-amber-500 to-orange-500', color: 'amber' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 transition-colors duration-300"></div>
      <div class="absolute top-0 -left-4 w-72 h-72 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-1000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <i class="fas fa-compass text-white text-2xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-100">The Twelve Principles</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          Guiding principles organized into four categories: Focus, Communication, Autonomy, and Sustainability.
        </p>
      </div>
    </section>

    <!-- Principles by Category -->
    <section
      v-for="category in categories"
      :key="category.key"
      class="py-16 transition-colors duration-300"
      :class="categories.indexOf(category) % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-4 mb-8">
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center"
            :class="category.gradient"
          >
            <i :class="category.icon" class="text-white"></i>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{{ category.title }}</h2>
        </div>

        <div class="space-y-6">
          <div
            v-for="principle in principles[category.key]"
            :key="principle.number"
            class="glass p-6 sm:p-8 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0"
                :class="category.gradient"
              >
                <span class="text-white font-bold">{{ principle.number }}</span>
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {{ principle.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {{ principle.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">Principles in Summary</h2>
        <div class="grid sm:grid-cols-2 gap-4 text-left">
          <div
            v-for="category in categories"
            :key="category.key"
            class="bg-white/10 backdrop-blur-sm p-4 rounded-xl"
          >
            <div class="flex items-center gap-2 mb-2">
              <i :class="category.icon" class="text-white"></i>
              <span class="text-white font-semibold">{{ category.title }}</span>
            </div>
            <ul class="text-white/80 text-sm space-y-1">
              <li v-for="p in principles[category.key]" :key="p.number">
                {{ p.number }}. {{ p.title.split('.')[0] }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
