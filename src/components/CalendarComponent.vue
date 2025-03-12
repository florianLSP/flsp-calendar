<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar'
import MonthNavigation from './header/MonthNavigation.vue'
import DateDisplay from './header/DateDisplay.vue'
import CurrentMonthBtn from './header/CurrentMonthBtn.vue'
import { ref } from 'vue'
import NewEvent from './NewEvent.vue'

const calendarStore = useCalendarStore()
const addEvent = ref(false)
const daySelected = ref()

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

function addEventDay(day: number) {
  addEvent.value = true
  daySelected.value = day
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
        :class="
          day === Number(calendarStore.currentDay) &&
          calendarStore.months[calendarStore.selectedMonth] == calendarStore.currentMonth
            ? 'border-blue-400 border-2'
            : 'border-gray-300'
        "
        v-for="day in getDaysInMonth(
          Number(calendarStore.currentYear),
          calendarStore.selectedMonth,
        )"
        :key="day"
      >
        <div @click="addEventDay(day)" :style="{ height: `${100 / 7}vh`, width: `${100 / 7}vw` }">
          <p
            v-if="
              day === Number(calendarStore.currentDay) &&
              calendarStore.months[calendarStore.selectedMonth] == calendarStore.currentMonth
            "
            class="p-2 font-extrabold"
          >
            {{ day }}
          </p>
          <p v-else class="p-2">{{ day }}</p>
          <div v-if="addEvent && day === daySelected"><NewEvent /></div>
        </div>
      </div>
    </div>
  </div>
</template>
