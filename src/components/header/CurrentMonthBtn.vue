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
    class="bg-white hover:bg-flsp-light_gray text-gray-800 py-2 px-4 border border-flsp-dark_gray rounded-xl shadow"
  >
    Aujourd'hui
  </button>
</template>
