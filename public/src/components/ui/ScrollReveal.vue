<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
  direction: {
    type: String,
    default: 'up', // 'up', 'down', 'left', 'right'
    validator: (value) => ['up', 'down', 'left', 'right'].includes(value)
  },
  distance: {
    type: Number,
    default: 30
  },
  duration: {
    type: Number,
    default: 600
  },
  once: {
    type: Boolean,
    default: true
  },
  threshold: {
    type: Number,
    default: 0.1
  }
})

const elementRef = ref(null)
const isVisible = ref(false)

const getInitialTransform = () => {
  switch (props.direction) {
    case 'up': return `translateY(${props.distance}px)`
    case 'down': return `translateY(-${props.distance}px)`
    case 'left': return `translateX(${props.distance}px)`
    case 'right': return `translateX(-${props.distance}px)`
    default: return `translateY(${props.distance}px)`
  }
}

let observer = null

onMounted(() => {
  if (!elementRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            isVisible.value = true
          }, props.delay)
          
          if (props.once && observer) {
            observer.unobserve(entry.target)
          }
        } else if (!props.once) {
          isVisible.value = false
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  observer.observe(elementRef.value)
})

onUnmounted(() => {
  if (observer && elementRef.value) {
    observer.unobserve(elementRef.value)
  }
})
</script>

<template>
  <div
    ref="elementRef"
    class="scroll-reveal"
    :class="{ 'is-visible': isVisible }"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(0)' : getInitialTransform(),
      transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.scroll-reveal {
  will-change: opacity, transform;
}
</style>
