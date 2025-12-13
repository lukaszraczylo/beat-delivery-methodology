<script setup>
import IconCard from '@/components/ui/IconCard.vue'
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
    <section class="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-red-900/10 dark:to-pink-900/10 transition-colors duration-300"></div>
      <div class="absolute top-0 -left-4 w-72 h-72 bg-red-300 dark:bg-red-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-1000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <i class="fas fa-heart text-white text-2xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-100">Values</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          The foundation of everything we do. What we value in our work and how we treat each other.
        </p>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Core Values</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            While there is value in the items on the right, we value the items on the left more.
          </p>
        </div>

        <TableCard :headers="coreValuesHeaders" :rows="coreValuesRows" />

        <!-- Visual Cards -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div
            v-for="value in coreValues"
            :key="value.valueMore"
            class="glass p-6 rounded-xl group hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-center gap-4 mb-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <i :class="value.icon" class="text-white text-sm"></i>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ value.valueMore }}</h3>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-500">
              over {{ value.over }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Values -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Five Team Values</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Beyond what we value in our work, we hold these values in how we treat each other.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="value in teamValues"
            :key="value.name"
            class="glass p-6 rounded-xl group hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                :class="value.gradient"
              >
                <i :class="value.icon" class="text-white"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ value.name }}</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="glass p-8 rounded-2xl">
          <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Values in Action</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            These values are not just words on a page. They guide our daily decisions, how we interact with each other, and how we approach every piece of work. When in doubt, return to these values.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
