<script setup>
import CodeBlock from '@/components/ui/CodeBlock.vue'
import { ceremonies, incidentProtocol, technicalPractices, definitionOfDone } from '@/data/manifesto'
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900/10 dark:to-emerald-900/10 transition-colors duration-300"></div>
      <div class="absolute top-0 -left-4 w-72 h-72 bg-green-300 dark:bg-green-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-emerald-300 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float animate-delay-1000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
          <i class="fas fa-cogs text-white text-2xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-100">Practices</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          How we work day-to-day: meetings, collaboration, incidents, and technical practices.
        </p>
      </div>
    </section>

    <!-- Meetings -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Meetings</h2>
          <p class="text-gray-600 dark:text-gray-400">Hard limits protect our time.</p>
        </div>

        <div class="glass p-6 rounded-2xl mb-8">
          <div class="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold gradient-text mb-2">2 hours</div>
              <div class="text-gray-600 dark:text-gray-400 text-sm">per week total</div>
            </div>
            <div>
              <div class="text-3xl font-bold gradient-text mb-2">1 hour</div>
              <div class="text-gray-600 dark:text-gray-400 text-sm">maximum per meeting</div>
            </div>
            <div>
              <div class="text-3xl font-bold gradient-text mb-2">Agenda</div>
              <div class="text-gray-600 dark:text-gray-400 text-sm">required or cancelled</div>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="ceremony in ceremonies"
            :key="ceremony.name"
            class="glass p-5 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">{{ ceremony.name }}</h3>
            <div class="text-sm text-blue-600 dark:text-blue-400 mb-2">{{ ceremony.duration }}</div>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ ceremony.purpose }}</p>
          </div>
        </div>

        <div class="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p class="text-sm text-amber-800 dark:text-amber-200">
            <i class="fas fa-lightbulb mr-2"></i>
            If a topic needs more than one hour: write first, comment async, meet on the delta. Never extend.
          </p>
        </div>
      </div>
    </section>

    <!-- Daily Check-in -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Daily Check-in</h2>
          <p class="text-gray-600 dark:text-gray-400">Replace standups with written updates.</p>
        </div>

        <div class="max-w-xl mx-auto">
          <CodeBlock title="Check-in Template">Working on: [current task]
Blocked by: [nothing / specific issue]</CodeBlock>

          <div class="mt-6 grid sm:grid-cols-3 gap-4">
            <div class="glass p-4 rounded-lg text-center">
              <i class="fas fa-clock text-blue-500 text-xl mb-2"></i>
              <div class="text-sm text-gray-600 dark:text-gray-400">Post once daily</div>
            </div>
            <div class="glass p-4 rounded-lg text-center">
              <i class="fas fa-stopwatch text-purple-500 text-xl mb-2"></i>
              <div class="text-sm text-gray-600 dark:text-gray-400">Two minutes</div>
            </div>
            <div class="glass p-4 rounded-lg text-center">
              <i class="fas fa-users-slash text-green-500 text-xl mb-2"></i>
              <div class="text-sm text-gray-600 dark:text-gray-400">No gathering required</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collaboration -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Collaboration</h2>
          <p class="text-gray-600 dark:text-gray-400">Default mode is solo deep work.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="glass p-6 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              <i class="fas fa-hand-holding-heart text-blue-500 mr-2"></i>
              Ad-hoc Help
            </h3>
            <ol class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                Post when stuck
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                Someone responds when available
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                Sync briefly if needed
              </li>
              <li class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                Return to solo work
              </li>
            </ol>
          </div>

          <div class="glass p-6 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              <i class="fas fa-users text-purple-500 mr-2"></i>
              Multi-Maker Work
            </h3>
            <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span><strong>Break vertically.</strong> Each maker owns an end-to-end slice.</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span><strong>Define interfaces first.</strong> Work in parallel against contracts.</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span><strong>Coordinate via doc.</strong> One feature doc as source of truth.</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span><strong>Sync only when stuck.</strong> Document outcome. Return to async.</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
          <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
            We do not schedule pairing. We do not mandate walkthroughs. We do not assign buddies. Collaboration is initiated by those who need it.
          </p>
        </div>
      </div>
    </section>

    <!-- Definition of Done -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Definition of Done</h2>
          <p class="text-gray-600 dark:text-gray-400">Work is not done until it meets these criteria.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="glass p-6 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              <i class="fas fa-code text-blue-500 mr-2"></i>
              For Code
            </h3>
            <ul class="space-y-2">
              <li
                v-for="item in definitionOfDone.code"
                :key="item"
                class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <i class="fas fa-check text-green-500"></i>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="glass p-6 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              <i class="fas fa-file-alt text-purple-500 mr-2"></i>
              For Non-Code
            </h3>
            <ul class="space-y-2">
              <li
                v-for="item in definitionOfDone.nonCode"
                :key="item"
                class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <i class="fas fa-check text-green-500"></i>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            <i class="fas fa-info-circle mr-2"></i>
            The team owns this definition. Adjust it as needed. But once agreed, honor it. "Done" means done—not "done but..." or "done except..."
          </p>
        </div>
      </div>
    </section>

    <!-- Incidents -->
    <section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Incidents & Emergencies</h2>
          <p class="text-gray-600 dark:text-gray-400">When production breaks, normal rules suspend temporarily.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="glass p-6 rounded-xl border-l-4 border-red-500">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">What Qualifies</h3>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <i class="fas fa-exclamation-triangle text-red-500"></i>
                Users cannot complete critical actions
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-exclamation-triangle text-red-500"></i>
                Data integrity is at risk
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-exclamation-triangle text-red-500"></i>
                Security vulnerability being exploited
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-exclamation-triangle text-red-500"></i>
                Significant revenue or reputation impact
              </li>
            </ul>
          </div>

          <div class="glass p-6 rounded-xl">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Incident Protocol</h3>
            <ol class="space-y-3">
              <li
                v-for="step in incidentProtocol"
                :key="step.step"
                class="flex items-start gap-3"
              >
                <span class="font-bold text-blue-600 dark:text-blue-400 text-sm">{{ step.step }}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</span>
              </li>
            </ol>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p class="text-sm text-amber-800 dark:text-amber-200">
            <i class="fas fa-lightbulb mr-2"></i>
            This is not normal work. Incidents should be rare. If they're frequent, that's a systemic problem to solve—not a reason to abandon sustainable pace.
          </p>
        </div>
      </div>
    </section>

    <!-- Technical Practices -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Technical Practices</h2>
          <p class="text-gray-600 dark:text-gray-400">Optional practices that align well with BEAT principles.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="practice in technicalPractices"
            :key="practice.name"
            class="glass p-5 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">{{ practice.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ practice.description }}</p>
          </div>
        </div>

        <p class="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          These are not mandated. They are offered as practices that support focus, speed, and quality. Adopt what serves you. Discard what doesn't.
        </p>
      </div>
    </section>
  </div>
</template>
