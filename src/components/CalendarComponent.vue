<script setup lang="ts">
import { useCalendarStore } from '@/stores/calendar'
import MonthNavigation from './header/MonthNavigation.vue'
import DateDisplay from './header/DateDisplay.vue'
import CurrentMonthBtn from './header/CurrentMonthBtn.vue'
import EventSticker from './EventSticker.vue'
import EventCreationModal from '@/components/modals/EventCreationModal.vue'
import EventDetailsModal from './modals/EventDetailsModal.vue'

const calendarStore = useCalendarStore()

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

function addEventDay(day: number) {
  calendarStore.openEventCreationModal = true
  calendarStore.selectedDay = day
}

function eventDetailsModal(event: Event) {
  event.stopPropagation()
  calendarStore.openEventDetailsModal = true
}
</script>

<template>
  <div class="p-10 flex flex-col h-screen">
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

    <div class="grid grid-cols-7 flex-grow p-5">
      <div
        v-for="firstDay in getFirstDayOfMonth(
          calendarStore.selectedYear,
          calendarStore.selectedMonth,
        )"
        :key="firstDay"
        class="border border-flsp-medium_gray bg-flsp-light_gray"
      ></div>
      <div
        @click="addEventDay(day)"
        class="border relative overflow-hidden h-full"
        :class="
          day === Number(calendarStore.currentDay) &&
          calendarStore.months[calendarStore.selectedMonth] == calendarStore.currentMonth
            ? 'border-flsp-medium_blue border-4'
            : 'border-flsp-medium_gray'
        "
        v-for="day in getDaysInMonth(
          Number(calendarStore.currentYear),
          calendarStore.selectedMonth,
        )"
        :key="day"
      >
        <div class="flex flex-col w-full h-32">
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

          <div v-for="event in calendarStore.events" :key="event.title">
            <div
              v-if="
                day == event.date.day &&
                calendarStore.selectedMonth == event.date.month &&
                calendarStore.selectedYear == event.date.year
              "
              class="px-1 pb-1"
            >
              <EventSticker @click="eventDetailsModal" :eventTitle="event.title" />
              <EventDetailsModal
                v-if="calendarStore.openEventDetailsModal"
                :eventTitle="event.title"
                :eventDescription="event.description"
                :eventDay="event.date.day"
                :eventMonth="event.date.month"
                :eventYear="event.date.year"
              />
            </div>
          </div>

          <div
            v-if="calendarStore.openEventCreationModal && day === calendarStore.selectedDay"
            class="px-1 pb-1"
          >
            <EventSticker eventTitle="Nouvel événement" />
            <EventCreationModal />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
