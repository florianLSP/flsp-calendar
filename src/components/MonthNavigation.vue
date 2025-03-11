<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()

function updateMonth(step: number) {
  if (calendarStore.selectedMonth == 0 && step == -1) {
    calendarStore.selectedYear = calendarStore.selectedYear - 1
  } else if (calendarStore.selectedMonth == 11 && step == 1) {
    calendarStore.selectedYear = calendarStore.selectedYear + 1
  }

  calendarStore.selectedMonth =
    (calendarStore.selectedMonth + step + calendarStore.months.length) % calendarStore.months.length
}
</script>

<template>
  <div class="flex space-x-1">
    <ChevronLeftIcon
      @click="updateMonth(-1)"
      class="h-5 w-5 rounded-md hover:bg-gray-200 cursor-pointer transition items-center"
    />
    <ChevronRightIcon
      @click="updateMonth(1)"
      class="h-5 w-5 rounded-md hover:bg-gray-200 cursor-pointer transition"
    />
  </div>
</template>
