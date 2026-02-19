<script setup>
import { principles } from '@/data/manifesto'

const categories = [
  { key: 'focus', title: 'On Focus', icon: 'fas fa-bullseye', gradient: 'from-blue-500 to-cyan-500', color: 'blue', desc: 'Protecting the deep work state' },
  { key: 'communication', title: 'On Communication', icon: 'fas fa-comments', gradient: 'from-purple-500 to-pink-500', color: 'purple', desc: 'Writing first, meeting wisely' },
  { key: 'autonomy', title: 'On Autonomy', icon: 'fas fa-user-shield', gradient: 'from-emerald-500 to-teal-500', color: 'emerald', desc: 'Trusting makers to make' },
  { key: 'sustainability', title: 'On Sustainability', icon: 'fas fa-leaf', gradient: 'from-amber-500 to-orange-500', color: 'amber', desc: 'Pace that lasts' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 transition-colors duration-300"></div>
      <div class="absolute top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/20 dark:bg-blue-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div class="absolute top-40 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-purple-400/20 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-float animate-delay-2000"></div>

      <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fade-in-up">
          <i class="fas fa-compass"></i>
          Guiding Principles
        </div>
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-fade-in-up animate-delay-100 shadow-glow-blue">
          <i class="fas fa-compass text-white text-2xl sm:text-3xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-200">The Twelve Principles</h1>
        <p class="section-subtitle max-w-2xl lg:max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
          Guiding principles organized into four categories: Focus, Communication, Autonomy, and Sustainability.
        </p>
      </div>
    </section>

    <!-- Principles by Category -->
    <section
      v-for="(category, catIndex) in categories"
      :key="category.key"
      class="py-12 sm:py-16 lg:py-20 transition-colors duration-300 relative"
      :class="catIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/30'"
    >
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg"
            :class="category.gradient"
          >
            <i :class="category.icon" class="text-white text-xl sm:text-2xl"></i>
          </div>
          <div>
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">{{ category.title }}</h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{{ category.desc }}</p>
          </div>
        </div>

        <div class="space-y-4 sm:space-y-5">
          <div
            v-for="(principle, index) in principles[category.key]"
            :key="principle.number"
            class="card group p-5 sm:p-6 lg:p-8"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-start gap-3 sm:gap-5">
              <div
                class="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-all duration-300"
                :class="category.gradient"
              >
                <span class="text-white font-bold text-sm sm:text-base lg:text-lg">{{ principle.number }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ principle.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                  {{ principle.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600"></div>
      
      <!-- Animated pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwVjQwWiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMFY0MFoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3ApIi8+PC9zdmc+')] animate-pulse-slow"></div>
      </div>
      
      <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-10">Principles in Summary</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div
            v-for="(category, index) in categories"
            :key="category.key"
            class="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center gap-3 mb-3 sm:mb-4">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center">
                <i :class="category.icon" class="text-white"></i>
              </div>
              <span class="text-white font-semibold text-base sm:text-lg">{{ category.title }}</span>
            </div>
            <ul class="text-white/80 text-xs sm:text-sm space-y-1.5 sm:space-y-2">
              <li v-for="p in principles[category.key]" :key="p.number" class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs flex-shrink-0">{{ p.number }}</span>
                <span class="truncate">{{ p.title.split('.')[0] }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
