<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

const currentDate = ref(new Date())
const currentMonth = ref(
  new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(currentDate.value),
)
const currentYear = ref(
  new Intl.DateTimeFormat('fr-FR', { year: 'numeric' }).format(currentDate.value),
)

const months = ref([
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
])
</script>

<template>
  <div class="p-10 flex items-center space-x-5">
    <div class="flex space-x-1">
      <ChevronLeftIcon
        class="h-5 w-5 rounded-md hover:bg-gray-200 cursor-pointer transition items-center"
      />
      <ChevronRightIcon class="h-5 w-5 rounded-md hover:bg-gray-200 cursor-pointer transition" />
    </div>
    <p class="capitalize">{{ currentMonth }} {{ currentYear }}</p>
  </div>
</template>
