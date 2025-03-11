<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar'
import MonthNavigation from './header/MonthNavigation.vue'
import DateDisplay from './header/DateDisplay.vue'
import CurrentMonthBtn from './header/CurrentMonthBtn.vue'

const calendarStore = useCalendarStore()

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}
</script>

<template>
  <div class="p-10 flex flex-col" :style="{ height: '100vh' }">
    <div class="flex items-center space-x-5">
      <CurrentMonthBtn />
      <MonthNavigation />
      <DateDisplay />
    </div>

    <div class="grid grid-cols-7 pt-5 font-bold text-center">
      <div>Lun.</div>
      <div>Mar.</div>
      <div>Mer.</div>
      <div>Jeu.</div>
      <div>Ven.</div>
      <div>Sam.</div>
      <div>Dim.</div>
    </div>

    <div class="grid grid-cols-7 p-5">
      <div
        v-for="firstDay in getFirstDayOfMonth(
          calendarStore.selectedYear,
          calendarStore.selectedMonth,
        )"
        :key="firstDay"
        class="border border-gray-300 bg-gray-200"
      ></div>
      <div
        class="border"
        v-for="(day, index) in getDaysInMonth(
          Number(calendarStore.currentYear),
          calendarStore.selectedMonth,
        )"
        :key="day"
      >
        <div :style="{ height: `${100 / 7}vh`, width: `${100 / 7}vw` }">
          <p
            v-if="
              index === Number(calendarStore.currentDay) - 1 &&
              calendarStore.months[calendarStore.selectedMonth] == calendarStore.currentMonth
            "
            class="p-2 font-bold"
          >
            {{ index + 1 }}
          </p>
          <p v-else class="p-2">{{ index + 1 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
