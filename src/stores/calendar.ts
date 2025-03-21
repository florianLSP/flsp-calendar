import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface Date {
  day: number
  month: number
  year: number
}

interface Event {
  date: Date
  title: string
  description: string
}

export const useCalendarStore = defineStore('calendar', () => {
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
  const selectedDay = ref()
  const addEvent = ref(false)
  const events: Ref<Array<Event>> = ref([])
  const openEventDetailsModal = ref(false)
  return {
    months,
    currentDate,
    currentDay,
    currentMonth,
    currentYear,
    selectedMonth,
    selectedYear,
    selectedDay,
    addEvent,
    events,
    openEventDetailsModal,
  }
})
