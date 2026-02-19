<script setup>
import TableCard from '@/components/ui/TableCard.vue'
import { coreValues, teamValues } from '@/data/manifesto'

const coreValuesHeaders = ['We Value More', 'Over']
const coreValuesRows = coreValues.map(v => [
  `<strong class="text-blue-600 dark:text-blue-400">${v.valueMore}</strong>`,
  v.over
])
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-rose-950/20 dark:to-pink-950/20 transition-colors duration-300"></div>
      <div class="absolute top-20 -left-20 w-96 h-96 bg-rose-400/20 dark:bg-rose-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div class="absolute top-40 -right-20 w-80 h-80 bg-pink-400/20 dark:bg-pink-500/20 rounded-full filter blur-3xl animate-float animate-delay-2000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-sm font-medium mb-6 animate-fade-in-up">
          <i class="fas fa-heart"></i>
          Foundation
        </div>
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mx-auto mb-8 animate-fade-in-up animate-delay-100 shadow-glow-blue">
          <i class="fas fa-heart text-white text-3xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-200">Values</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
          The foundation of everything we do. What we value in our work and how we treat each other.
        </p>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Core Values</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            While there is value in the items on the right, we value the items on the left more.
          </p>
        </div>

        <TableCard :headers="coreValuesHeaders" :rows="coreValuesRows" />

        <!-- Visual Cards -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div
            v-for="(value, index) in coreValues"
            :key="value.valueMore"
            class="card group"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <i :class="value.icon" class="text-white"></i>
              </div>
              <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100">{{ value.valueMore }}</h3>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-500">
              over <span class="text-gray-700 dark:text-gray-300">{{ value.over }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Values -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300 relative overflow-hidden">
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full filter blur-3xl"></div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Five Team Values</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Beyond what we value in our work, we hold these values in how we treat each other.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(value, index) in teamValues"
            :key="value.name"
            class="card group p-8"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center gap-5 mb-5">
              <div
                class="w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                :class="value.gradient"
              >
                <i :class="value.icon" class="text-white text-xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ value.name }}</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="glass p-10 sm:p-14 rounded-3xl relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"></div>
          
          <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Values in Action</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            These values are not just words on a page. They guide our daily decisions, how we interact with each other, and how we approach every piece of work. When in doubt, return to these values.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
