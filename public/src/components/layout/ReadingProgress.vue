<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const showBackToTop = ref(false)

const calculateProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight - windowHeight
  const scrollTop = window.scrollY
  
  if (documentHeight > 0) {
    progress.value = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100))
  }
  
  showBackToTop.value = scrollTop > 500
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', calculateProgress, { passive: true })
  calculateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateProgress)
})
</script>

<template>
  <!-- Reading Progress Bar -->
  <div class="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
    <div 
      class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-150 ease-out"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>

  <!-- Back to Top Button -->
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
      aria-label="Back to top"
    >
      <i class="fas fa-arrow-up group-hover:-translate-y-0.5 transition-transform"></i>
    </button>
  </transition>
</template>
