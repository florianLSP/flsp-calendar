<script setup lang="ts">
import { ref } from 'vue'

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
  <div class="p-10">
    <p class="capitalize">{{ currentMonth }} {{ currentYear }}</p>
  </div>
</template>
