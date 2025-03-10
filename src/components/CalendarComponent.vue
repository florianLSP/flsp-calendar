<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()

function updateMonth(step: number) {
  if (calendarStore.selectedMonth == 0 && step == -1) {
    calendarStore.selectedYear = parseInt(calendarStore.currentYear) - 1
  } else if (calendarStore.selectedMonth == 11 && step == 1) {
    calendarStore.selectedYear = parseInt(calendarStore.currentYear) + 1
  }

  calendarStore.selectedMonth =
    (calendarStore.selectedMonth + step + calendarStore.months.length) % calendarStore.months.length
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function goToCurrentMonth() {
  calendarStore.selectedMonth = calendarStore.currentDate.getMonth()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}
</script>

<template>
  <div class="p-10 flex flex-col" :style="{ height: '100vh' }">
    <div class="flex items-center space-x-5">
      <button
        @click="goToCurrentMonth"
        class="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded-xl shadow"
      >
        Aujourd'hui
      </button>
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
      <p class="capitalize text-xl">
        <span>{{ calendarStore.months[calendarStore.selectedMonth] }}</span>
        {{ calendarStore.currentYear }}
      </p>
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
