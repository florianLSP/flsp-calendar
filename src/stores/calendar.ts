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
  const events: Ref<Array<Event>> = ref([])
  const openEventDetailsModal = ref(false)
  const openEventCreationModal = ref(false)
  const openEditEventDetailsModal = ref(false)
  const selectedEvent: Ref<Event | undefined> = ref()
  const isEventClicked = ref(false)

  function addEventDay(day: number) {
    if (!isEventClicked.value) {
      openEventCreationModal.value = true
      selectedDay.value = day
    }
  }

  function eventDetailsModal(event: Event) {
    isEventClicked.value = true
    openEventDetailsModal.value = true
    selectedEvent.value = event
  }

  function editEventDetailsModal() {
    openEventDetailsModal.value = false
    openEditEventDetailsModal.value = true
  }
  return {
    months,
    currentDate,
    currentDay,
    currentMonth,
    currentYear,
    selectedMonth,
    selectedYear,
    selectedDay,
    events,
    openEventDetailsModal,
    openEventCreationModal,
    isEventClicked,
    selectedEvent,
    openEditEventDetailsModal,
    addEventDay,
    eventDetailsModal,
    editEventDetailsModal,
  }
})
