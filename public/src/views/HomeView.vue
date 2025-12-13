<script setup>
import { RouterLink } from 'vue-router'
import IconCard from '@/components/ui/IconCard.vue'
import { researchStats } from '@/data/manifesto'

const navCards = [
  { path: '/values', title: 'Values', description: 'Core & team values that guide everything', icon: 'fas fa-heart', gradient: 'from-red-500 to-pink-500' },
  { path: '/principles', title: 'Principles', description: 'The 12 principles of BEAT', icon: 'fas fa-compass', gradient: 'from-blue-500 to-cyan-500' },
  { path: '/framework', title: 'Framework', description: 'Roles, beats, and the board', icon: 'fas fa-sitemap', gradient: 'from-purple-500 to-indigo-500' },
  { path: '/practices', title: 'Practices', description: 'Meetings, collaboration, incidents', icon: 'fas fa-cogs', gradient: 'from-green-500 to-emerald-500' },
  { path: '/onboarding', title: 'Onboarding', description: 'Getting started with BEAT', icon: 'fas fa-user-plus', gradient: 'from-amber-500 to-orange-500' },
  { path: '/reference', title: 'Reference', description: 'Quick lookup tables', icon: 'fas fa-book', gradient: 'from-cyan-500 to-blue-500' }
]

const keyNumbers = [
  { value: '4hrs', label: 'Sacred Focus Block', icon: 'fas fa-brain' },
  { value: '2hrs', label: 'Max Meetings/Week', icon: 'fas fa-calendar' },
  { value: '80%', label: 'Planning Capacity', icon: 'fas fa-battery-three-quarters' },
  { value: '20%', label: 'Exploration Time', icon: 'fas fa-flask' }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 transition-colors duration-300"></div>
      <div class="absolute top-0 -left-4 w-72 h-72 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-1000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-2000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center">
          <div class="mb-6 sm:mb-8 flex justify-center animate-fade-in-up">
            <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 flex items-center justify-center shadow-xl animate-float">
              <span class="text-white text-4xl sm:text-5xl font-bold">B</span>
            </div>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight animate-fade-in-up animate-delay-100">
            The <span class="gradient-text">BEAT</span> Manifesto
          </h1>

          <p class="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-4 animate-fade-in-up animate-delay-200 font-medium">
            <span class="text-blue-600 dark:text-blue-400">B</span>alanced.
            <span class="text-purple-600 dark:text-purple-400">E</span>mpowered.
            <span class="text-cyan-600 dark:text-cyan-400">A</span>sync.
            <span class="text-pink-600 dark:text-pink-400">T</span>eams.
          </p>

          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
            A software delivery methodology built for how developers actually work.
            <br class="hidden sm:block" />
            Created by <strong>Lukasz Raczylo</strong>.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <RouterLink to="/values" class="btn-primary">
              <i class="fas fa-book-open mr-2"></i>
              Start Reading
            </RouterLink>
            <RouterLink to="/reference" class="btn-secondary">
              <i class="fas fa-list mr-2"></i>
              Quick Reference
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Numbers -->
    <section class="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div
            v-for="item in keyNumbers"
            :key="item.label"
            class="glass p-6 rounded-xl text-center group hover:shadow-lg transition-all duration-300"
          >
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <i :class="item.icon" class="text-white"></i>
            </div>
            <div class="text-3xl sm:text-4xl font-bold gradient-text mb-1">{{ item.value }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="glass p-8 sm:p-12 rounded-2xl">
          <p class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            We are uncovering better ways of building software by doing it and helping others do it.
          </p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            BEAT emerges from research on how developers actually work. We built it for these realities, not against them.
          </p>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="stat in researchStats"
              :key="stat.stat"
              class="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50"
            >
              <span class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ stat.stat }}</span>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ stat.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Cards -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="section-title">Explore the Manifesto</h2>
          <p class="section-subtitle">Deep dive into each aspect of BEAT</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="card in navCards"
            :key="card.path"
            :to="card.path"
            class="glass p-6 rounded-xl group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                :class="card.gradient"
              >
                <i :class="card.icon" class="text-white"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ card.title }}
                  <i class="fas fa-arrow-right ml-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ card.description }}</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Commitment Section -->
    <section class="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-8">The BEAT Commitment</h2>
        <div class="grid sm:grid-cols-2 gap-4 text-left">
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas fa-shield-alt text-white"></i>
              <span class="text-white font-semibold">Protecting focus</span>
            </div>
            <p class="text-white/80 text-sm">We will not interrupt sacred time. We will wait.</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas fa-pen text-white"></i>
              <span class="text-white font-semibold">Defaulting to async</span>
            </div>
            <p class="text-white/80 text-sm">We will write first, meet only when writing fails.</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas fa-handshake text-white"></i>
              <span class="text-white font-semibold">Trusting makers</span>
            </div>
            <p class="text-white/80 text-sm">We will provide goals, not instructions. Constraints, not control.</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas fa-heart text-white"></i>
              <span class="text-white font-semibold">Sustaining pace</span>
            </div>
            <p class="text-white/80 text-sm">We will cut scope before we cut rest. We will plan for humans.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="glass p-8 rounded-2xl">
          <div class="font-mono text-lg sm:text-xl text-gray-700 dark:text-gray-300 space-y-2">
            <p>We protect focus.</p>
            <p>We write things down.</p>
            <p>We trust each other.</p>
            <p>We work sustainably.</p>
            <p>We ship and learn.</p>
          </div>
          <p class="mt-6 text-gray-500 dark:text-gray-500 italic">
            BEAT: Built for how developers actually work.
          </p>
          <p class="mt-4 text-sm text-gray-400 dark:text-gray-600">
            BEAT v1.0 by Lukasz Raczylo
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
