<script setup>
import { ceremonies, incidentProtocol, technicalPractices, definitionOfDone } from '@/data/manifesto'

const meetingLimits = [
  { value: '2 hours', label: 'per week total', icon: 'fas fa-clock', color: 'blue' },
  { value: '1 hour', label: 'maximum per meeting', icon: 'fas fa-hourglass-half', color: 'purple' },
  { value: 'Agenda', label: 'required or cancelled', icon: 'fas fa-list-check', color: 'emerald' }
]

const collaborationSteps = [
  { text: 'Post when stuck', icon: 'fas fa-comment-dots' },
  { text: 'Someone responds when available', icon: 'fas fa-reply' },
  { text: 'Sync briefly if needed', icon: 'fas fa-video' },
  { text: 'Return to solo work', icon: 'fas fa-user' }
]

const multiMakerPrinciples = [
  { title: 'Break vertically.', desc: 'Each maker owns an end-to-end slice.', icon: 'fas fa-arrows-alt-v' },
  { title: 'Define interfaces first.', desc: 'Work in parallel against contracts.', icon: 'fas fa-plug' },
  { title: 'Coordinate via doc.', desc: 'One feature doc as source of truth.', icon: 'fas fa-file-alt' },
  { title: 'Sync only when stuck.', desc: 'Document outcome. Return to async.', icon: 'fas fa-sync' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-950/20 dark:to-teal-950/20 transition-colors duration-300"></div>
      <div class="absolute top-20 -left-20 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div class="absolute top-40 -right-20 w-80 h-80 bg-teal-400/20 dark:bg-teal-500/20 rounded-full filter blur-3xl animate-float animate-delay-2000"></div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6 animate-fade-in-up">
          <i class="fas fa-cogs"></i>
          Day-to-Day
        </div>
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-8 animate-fade-in-up animate-delay-100">
          <i class="fas fa-cogs text-white text-3xl"></i>
        </div>
        <h1 class="section-title animate-fade-in-up animate-delay-200">Practices</h1>
        <p class="section-subtitle max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
          How we work day-to-day: meetings, collaboration, incidents, and technical practices.
        </p>
      </div>
    </section>

    <!-- Meetings -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Meetings</h2>
          <p class="text-gray-600 dark:text-gray-400">Hard limits protect our time.</p>
        </div>

        <div class="glass p-8 sm:p-10 rounded-3xl mb-10">
          <div class="grid sm:grid-cols-3 gap-8">
            <div
              v-for="(item, index) in meetingLimits"
              :key="item.label"
              class="text-center group"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div 
                class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                :class="[
                  item.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  item.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                  'bg-emerald-100 dark:bg-emerald-900/30'
                ]"
              >
                <i :class="[item.icon, 'text-2xl', item.color === 'blue' ? 'text-blue-500' : item.color === 'purple' ? 'text-purple-500' : 'text-emerald-500']"></i>
              </div>
              <div class="text-3xl sm:text-4xl font-bold gradient-text mb-2">{{ item.value }}</div>
              <div class="text-gray-600 dark:text-gray-400 text-sm">{{ item.label }}</div>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(ceremony, index) in ceremonies"
            :key="ceremony.name"
            class="card p-6"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">{{ ceremony.name }}</h3>
            <div class="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
              {{ ceremony.duration }}
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ ceremony.purpose }}</p>
          </div>
        </div>

        <div class="mt-8 p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p class="text-sm text-amber-800 dark:text-amber-200 flex items-start gap-3">
            <i class="fas fa-lightbulb mt-0.5"></i>
            <span>If a topic needs more than one hour: write first, comment async, meet on the delta. <strong>Never extend.</strong></span>
          </p>
        </div>
      </div>
    </section>

    <!-- Daily Check-in -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300 relative overflow-hidden">
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Daily Check-in</h2>
          <p class="text-gray-600 dark:text-gray-400">Replace standups with written updates.</p>
        </div>

        <div class="max-w-2xl mx-auto">
          <!-- Visual Check-in Template -->
          <div class="glass p-8 rounded-3xl mb-8">
            <div class="space-y-4">
              <div class="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-tasks text-white"></i>
                </div>
                <div>
                  <div class="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">Working on</div>
                  <div class="text-gray-700 dark:text-gray-300">[current task]</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-hand-paper text-white"></i>
                </div>
                <div>
                  <div class="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wide">Blocked by</div>
                  <div class="text-gray-700 dark:text-gray-300">[nothing / specific issue]</div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="card p-5 text-center group">
              <i class="fas fa-clock text-blue-500 text-2xl mb-3 group-hover:scale-110 transition-transform block"></i>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Post once daily</div>
            </div>
            <div class="card p-5 text-center group">
              <i class="fas fa-stopwatch text-purple-500 text-2xl mb-3 group-hover:scale-110 transition-transform block"></i>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Two minutes</div>
            </div>
            <div class="card p-5 text-center group">
              <i class="fas fa-users-slash text-emerald-500 text-2xl mb-3 group-hover:scale-110 transition-transform block"></i>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">No gathering</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collaboration -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Collaboration</h2>
          <p class="text-gray-600 dark:text-gray-400">Default mode is solo deep work.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Ad-hoc Help -->
          <div class="card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <i class="fas fa-hand-holding-heart text-white text-xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Ad-hoc Help</h3>
            </div>
            <div class="space-y-4">
              <div
                v-for="(step, index) in collaborationSteps"
                :key="step.text"
                class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 font-bold">
                  {{ index + 1 }}
                </div>
                <div class="flex items-center gap-3">
                  <i :class="step.icon" class="text-blue-500"></i>
                  <span class="text-gray-700 dark:text-gray-300">{{ step.text }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Multi-Maker Work -->
          <div class="card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <i class="fas fa-users text-white text-xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">Multi-Maker Work</h3>
            </div>
            <div class="space-y-4">
              <div
                v-for="(principle, index) in multiMakerPrinciples"
                :key="principle.title"
                class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <i :class="principle.icon" class="text-emerald-500"></i>
                </div>
                <div>
                  <span class="font-semibold text-gray-900 dark:text-gray-100 block">{{ principle.title }}</span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ principle.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 p-5 rounded-xl bg-gray-100 dark:bg-gray-800">
          <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
            We do not schedule pairing. We do not mandate walkthroughs. We do not assign buddies. Collaboration is initiated by those who need it.
          </p>
        </div>
      </div>
    </section>

    <!-- Definition of Done -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Definition of Done</h2>
          <p class="text-gray-600 dark:text-gray-400">Work is not done until it meets these criteria.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <i class="fas fa-code text-white text-xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">For Code</h3>
            </div>
            <ul class="space-y-3">
              <li
                v-for="item in definitionOfDone.code"
                :key="item"
                class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
              >
                <div class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-check text-white text-sm"></i>
                </div>
                <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <i class="fas fa-file-alt text-white text-xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">For Non-Code</h3>
            </div>
            <ul class="space-y-3">
              <li
                v-for="item in definitionOfDone.nonCode"
                :key="item"
                class="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
              >
                <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-check text-white text-sm"></i>
                </div>
                <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p class="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-3">
            <i class="fas fa-info-circle mt-0.5"></i>
            <span>The team owns this definition. Adjust it as needed. But once agreed, honor it. "Done" means done—not "done but..." or "done except..."</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Incidents -->
    <section class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Incidents & Emergencies</h2>
          <p class="text-gray-600 dark:text-gray-400">When production breaks, normal rules suspend temporarily.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="card p-8 border-l-4 border-red-500">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <i class="fas fa-exclamation-triangle text-red-500"></i>
              What Qualifies
            </h3>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                <i class="fas fa-times-circle text-red-500"></i>
                <span class="text-gray-700 dark:text-gray-300">Users cannot complete critical actions</span>
              </li>
              <li class="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                <i class="fas fa-times-circle text-red-500"></i>
                <span class="text-gray-700 dark:text-gray-300">Data integrity is at risk</span>
              </li>
              <li class="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                <i class="fas fa-times-circle text-red-500"></i>
                <span class="text-gray-700 dark:text-gray-300">Security vulnerability being exploited</span>
              </li>
              <li class="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                <i class="fas fa-times-circle text-red-500"></i>
                <span class="text-gray-700 dark:text-gray-300">Significant revenue or reputation impact</span>
              </li>
            </ul>
          </div>

          <div class="card p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <i class="fas fa-clipboard-list text-blue-500"></i>
              Incident Protocol
            </h3>
            <div class="relative">
              <!-- Flow line -->
              <div class="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-green-500 hidden sm:block"></div>
              <div class="space-y-4">
                <div
                  v-for="(step, index) in incidentProtocol"
                  :key="step.step"
                  class="flex items-start gap-4"
                >
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-sm font-bold"
                    :class="[
                      index === 0 ? 'bg-red-500 text-white' :
                      index === 1 ? 'bg-orange-500 text-white' :
                      index === 2 ? 'bg-amber-500 text-white' :
                      index === 3 ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    ]"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1 pb-2">
                    <div class="font-semibold text-gray-900 dark:text-gray-100">{{ step.step.replace(/^\d+\.\s*/, '') }}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p class="text-sm text-amber-800 dark:text-amber-200 flex items-start gap-3">
            <i class="fas fa-lightbulb mt-0.5"></i>
            <span>This is not normal work. Incidents should be rare. If they're frequent, that's a systemic problem to solve—not a reason to abandon sustainable pace.</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Technical Practices -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Technical Practices</h2>
          <p class="text-gray-600 dark:text-gray-400">Optional practices that align well with BEAT principles.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(practice, index) in technicalPractices"
            :key="practice.name"
            class="card p-6 group"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ practice.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ practice.description }}</p>
          </div>
        </div>

        <p class="mt-10 text-center text-gray-500 dark:text-gray-500">
          These are not mandated. They are offered as practices that support focus, speed, and quality. <strong class="text-gray-700 dark:text-gray-300">Adopt what serves you. Discard what doesn't.</strong>
        </p>
      </div>
    </section>
  </div>
</template>
