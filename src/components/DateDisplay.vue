<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()
</script>

<template>
  <p class="capitalize text-xl">
    <span>{{ calendarStore.months[calendarStore.selectedMonth] }}</span>
    {{ calendarStore.selectedYear }}
  </p>
</template>
