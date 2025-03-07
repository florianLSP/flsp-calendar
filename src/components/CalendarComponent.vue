<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

const months = ref([
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
])
const currentDate = ref(new Date())
const currentDay = ref(
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric' }).format(currentDate.value),
)
const currentMonth = ref(
  new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(currentDate.value),
)
const currentYear = ref(
  new Intl.DateTimeFormat('fr-FR', { year: 'numeric' }).format(currentDate.value),
)
const selectedMonth = ref(months.value.indexOf(currentMonth.value))
const selectedYear = ref(Number(currentYear.value))

function updateMonth(step: number) {
  if (selectedMonth.value == 0 && step == -1) {
    selectedYear.value = parseInt(currentYear.value) - 1
  } else if (selectedMonth.value == 11 && step == 1) {
    selectedYear.value = parseInt(currentYear.value) + 1
  }

  selectedMonth.value = (selectedMonth.value + step + months.value.length) % months.value.length
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function goToCurrentMonth() {
  selectedMonth.value = currentDate.value.getMonth()
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
        <span>{{ months[selectedMonth] }}</span>
        {{ currentYear }}
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
        v-for="firstDay in getFirstDayOfMonth(selectedYear, selectedMonth)"
        :key="firstDay"
        class="border border-gray-300 bg-gray-200"
      ></div>
      <div
        class="border"
        v-for="(day, index) in getDaysInMonth(Number(currentYear), selectedMonth)"
        :key="day"
      >
        <div :style="{ height: `${100 / 7}vh`, width: `${100 / 7}vw` }">
          <p v-if="index + 1 === Number(currentDay)" class="p-2 font-bold">
            {{ index + 1 }}
          </p>
          <p v-else class="p-2">{{ index + 1 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
