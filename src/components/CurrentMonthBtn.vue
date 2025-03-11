<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()

function goToCurrentMonth() {
  calendarStore.selectedMonth = calendarStore.currentDate.getMonth()
}
</script>

<template>
  <button
    @click="goToCurrentMonth"
    class="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded-xl shadow"
  >
    Aujourd'hui
  </button>
</template>
