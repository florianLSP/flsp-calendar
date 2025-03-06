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
const currentMonth = ref(
  new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(currentDate.value),
)
const currentYear = ref(
  new Intl.DateTimeFormat('fr-FR', { year: 'numeric' }).format(currentDate.value),
)
const selectedMonth = ref(months.value.indexOf(currentMonth.value))

function updateMonth(step: number) {
  if (selectedMonth.value == 0 && step == -1) {
    currentYear.value = (parseInt(currentYear.value) - 1).toString()
  } else if (selectedMonth.value == 11 && step == 1) {
    currentYear.value = (parseInt(currentYear.value) + 1).toString()
  }

  selectedMonth.value = (selectedMonth.value + step + months.value.length) % months.value.length
}
</script>

<template>
  <div class="p-10 flex items-center space-x-5">
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
    <p class="capitalize">
      <span>{{ months[selectedMonth] }}</span>
      {{ currentYear }}
    </p>
  </div>
</template>
