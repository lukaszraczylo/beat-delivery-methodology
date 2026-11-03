<script setup>
defineProps({
  title: { type: String, default: '' },
  headers: { type: Array, required: true },
  rows: { type: Array, required: true }
})
</script>

<template>
  <div class="border border-border">
    <h3 v-if="title" class="border-b border-border bg-muted px-4 py-2 text-title font-semibold text-large">
      {{ title }}
    </h3>

    <!-- Small screens: one block per row, so the table never scrolls sideways. -->
    <dl class="divide-y divide-border sm:hidden">
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="px-4 py-3">
        <template v-for="(cell, cellIndex) in row" :key="cellIndex">
          <dt class="pt-1 text-body-base font-semibold text-muted-foreground">{{ headers[cellIndex] }}</dt>
          <dd class="pb-1 text-body-base text-body">{{ cell }}</dd>
        </template>
      </div>
    </dl>

    <table class="hidden w-full table-auto border-collapse text-left sm:table">
      <thead>
        <tr class="bg-muted">
          <th
            v-for="header in headers"
            :key="header"
            scope="col"
            class="border-b border-border px-4 py-2 text-body-base font-semibold text-large"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="border-b border-border last:border-b-0">
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="break-words px-4 py-2 align-top text-body-base text-body"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
