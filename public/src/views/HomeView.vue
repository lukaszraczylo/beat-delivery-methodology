<script setup>
import { RouterLink } from 'vue-router'
import { researchStats } from '@/data/manifesto'

const navCards = [
  { path: '/values', title: 'Values', description: 'Core & team values that guide everything', icon: 'fas fa-heart', gradient: 'from-rose-500 to-pink-500', color: 'rose' },
  { path: '/principles', title: 'Principles', description: 'The 12 principles of BEAT', icon: 'fas fa-compass', gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
  { path: '/framework', title: 'Framework', description: 'Roles, beats, and the board', icon: 'fas fa-sitemap', gradient: 'from-purple-500 to-indigo-500', color: 'purple' },
  { path: '/practices', title: 'Practices', description: 'Meetings, collaboration, incidents', icon: 'fas fa-cogs', gradient: 'from-emerald-500 to-teal-500', color: 'emerald' },
  { path: '/onboarding', title: 'Onboarding', description: 'Getting started with BEAT', icon: 'fas fa-user-plus', gradient: 'from-amber-500 to-orange-500', color: 'amber' },
  { path: '/reference', title: 'Reference', description: 'Quick lookup tables', icon: 'fas fa-book', gradient: 'from-cyan-500 to-sky-500', color: 'cyan' }
]

const keyNumbers = [
  { value: '4hrs', label: 'Sacred Focus Block', icon: 'fas fa-brain', color: 'blue' },
  { value: '2hrs', label: 'Max Meetings/Week', icon: 'fas fa-calendar', color: 'purple' },
  { value: '80%', label: 'Planning Capacity', icon: 'fas fa-battery-three-quarters', color: 'emerald' },
  { value: '20%', label: 'Exploration Time', icon: 'fas fa-flask', color: 'amber' }
]

const commitments = [
  { icon: 'fas fa-shield-alt', title: 'Protecting focus', description: 'We will not interrupt sacred time. We will wait.' },
  { icon: 'fas fa-pen', title: 'Defaulting to async', description: 'We will write first, meet only when writing fails.' },
  { icon: 'fas fa-handshake', title: 'Trusting makers', description: 'We will provide goals, not instructions. Constraints, not control.' },
  { icon: 'fas fa-heart', title: 'Sustaining pace', description: 'We will cut scope before we cut rest. We will plan for humans.' },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <!-- Animated background blobs -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 transition-colors duration-500"></div>
      
      <!-- Floating orbs - responsive sizing -->
      <div class="absolute top-20 left-[5%] w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-400/20 dark:bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-float"></div>
      <div class="absolute top-40 right-[5%] w-56 h-56 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem] bg-purple-400/20 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-float animate-delay-2000"></div>
      <div class="absolute -bottom-10 left-1/4 w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-float animate-delay-1000"></div>
      
      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Y2EzYWYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjQgMjRoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

      <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20 lg:py-24">
        <div class="text-center">
          <!-- Logo with glow effect -->
          <div class="mb-6 sm:mb-8 flex justify-center animate-fade-in-up">
            <div 
              class="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl animate-float"
            >
              <!-- Glow effect -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 blur-xl opacity-50 animate-pulse-slow"></div>
              <span class="relative text-white text-3xl sm:text-5xl lg:text-6xl font-bold">B</span>
            </div>
          </div>

          <!-- Title - responsive sizing -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight animate-fade-in-up animate-delay-100">
            The <span class="gradient-text">BEAT</span> Manifesto
          </h1>

          <!-- Subtitle -->
          <p class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-200 mb-4 sm:mb-6 animate-fade-in-up animate-delay-200 font-medium tracking-tight">
            <span class="text-blue-600 dark:text-blue-400">B</span>alanced.
            <span class="text-purple-600 dark:text-purple-400">E</span>mpowered.
            <span class="text-cyan-600 dark:text-cyan-400">A</span>sync.
            <span class="text-pink-600 dark:text-pink-400">T</span>eams.
          </p>

          <!-- Description -->
          <p class="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl lg:max-w-3xl mx-auto animate-fade-in-up animate-delay-300 leading-relaxed px-4 sm:px-0">
            A software delivery methodology built for how developers actually work.
            <span class="block mt-2 text-gray-500 dark:text-gray-500">Created by <strong class="text-gray-700 dark:text-gray-300">Lukasz Raczylo</strong>.</span>
          </p>

          <!-- CTA Buttons - stack on mobile, side by side on larger screens -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up animate-delay-400 px-4 sm:px-0">
            <RouterLink to="/values" class="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              <i class="fas fa-book-open mr-2"></i>
              Start Reading
            </RouterLink>
            <RouterLink to="/assessment" class="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
              <i class="fas fa-clipboard-check mr-2"></i>
              Take Assessment
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Scroll indicator - hide on very small screens -->
      <div class="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle hidden sm:block">
        <div class="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-2">
          <div class="w-1.5 h-3 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Key Numbers -->
    <section class="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div
            v-for="(item, index) in keyNumbers"
            :key="item.label"
            class="group card text-center p-4 sm:p-6 lg:p-8"
            :class="`hover:border-${item.color}-300 dark:hover:border-${item.color}-700`"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div 
              class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              :class="[
                item.color === 'blue' ? 'from-blue-500 to-blue-600 shadow-glow-blue' :
                item.color === 'purple' ? 'from-purple-500 to-purple-600 shadow-glow-purple' :
                item.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                'from-amber-500 to-amber-600'
              ]"
            >
              <i :class="item.icon" class="text-white text-base sm:text-xl lg:text-2xl"></i>
            </div>
            <div class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold gradient-text mb-1 sm:mb-2">{{ item.value }}</div>
            <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full filter blur-3xl"></div>
      
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div class="glass p-6 sm:p-8 lg:p-12 xl:p-16 rounded-2xl sm:rounded-3xl">
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <div class="w-1 h-6 sm:h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Our Philosophy</h2>
          </div>
          
          <p class="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 font-light">
            We are uncovering better ways of building software by doing it and helping others do it.
          </p>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
            BEAT emerges from research on how developers actually work. We built it for these realities, not against them.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div
              v-for="(stat, index) in researchStats"
              :key="stat.stat"
              class="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/60 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 group"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <span class="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-purple-500">{{ stat.stat }}</span>
              <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ stat.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Cards -->
    <section class="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div class="text-center mb-10 sm:mb-14">
          <h2 class="section-title">Explore the Manifesto</h2>
          <p class="section-subtitle">Deep dive into each aspect of BEAT</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <RouterLink
            v-for="(card, index) in navCards"
            :key="card.path"
            :to="card.path"
            class="group card p-5 sm:p-6 lg:p-8"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-start gap-4 sm:gap-5">
              <div
                class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                :class="card.gradient"
              >
                <i :class="card.icon" class="text-white text-lg sm:text-xl"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 flex items-center gap-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ card.title }}
                  <i class="fas fa-arrow-right text-xs sm:text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                </h3>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ card.description }}</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Commitment Section -->
    <section class="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600"></div>
      
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwVjQwWiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMFY0MFoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] animate-pulse-slow"></div>
      </div>
      
      <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">The BEAT Commitment</h2>
          <p class="text-white/70 text-base sm:text-lg">By adopting BEAT, we commit to:</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
          <div
            v-for="(item, index) in commitments"
            :key="item.title"
            class="group bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                <i :class="item.icon" class="text-white text-base sm:text-xl"></i>
              </div>
              <span class="text-white font-semibold text-base sm:text-lg">{{ item.title }}</span>
            </div>
            <p class="text-white/70 text-xs sm:text-sm leading-relaxed pl-13 sm:pl-16">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <div class="glass p-6 sm:p-8 lg:p-10 xl:p-14 rounded-2xl sm:rounded-3xl relative overflow-hidden">
          <!-- Decorative gradient -->
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
          
          <div class="font-mono text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-300 space-y-2 sm:space-y-3">
            <p class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">We protect focus.</p>
            <p class="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-default">We write things down.</p>
            <p class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-default">We trust each other.</p>
            <p class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-default">We work sustainably.</p>
            <p class="hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-default">We ship and learn.</p>
          </div>
          
          <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p class="text-gray-500 dark:text-gray-500 italic text-base sm:text-lg">
              BEAT: Built for how developers actually work.
            </p>
            <p class="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 dark:text-gray-600">
              BEAT v1.0 by Lukasz Raczylo
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
