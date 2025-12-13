<script setup>
defineProps({
  title: {
    type: String,
    default: null
  },
  headers: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="glass rounded-xl overflow-hidden">
    <div v-if="title" class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">{{ title }}</h3>
    </div>
    <!-- Mobile card view -->
    <div class="block sm:hidden">
      <div
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
      >
        <div
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          class="py-1"
        >
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{{ headers[cellIndex] }}: </span>
          <span class="text-sm text-gray-700 dark:text-gray-300" v-html="cell"></span>
        </div>
      </div>
    </div>
    <!-- Desktop table view -->
    <div class="hidden sm:block overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-800/50">
            <th
              v-for="header in headers"
              :key="header"
              class="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(row, index) in rows"
            :key="index"
            class="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
          >
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-700 dark:text-gray-300"
            >
              <span v-html="cell"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
