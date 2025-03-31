<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon, Bars3BottomLeftIcon } from '@heroicons/vue/24/solid'
import { useCalendarStore } from '@/stores/calendar'
import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import AlertInfo from '../AlertInfo.vue'

const calendarStore = useCalendarStore()
const date: Ref<Date | null> = ref(null)
const modifiedTitle = ref(calendarStore.selectedEvent?.title)
const modifiedDescription = ref()
const showAlertInfo = ref(false)
const alertMessage = ref()

function closeModal() {
  calendarStore.isEventClicked = false
  calendarStore.openEditEventDetailsModal = false
  calendarStore.selectedEvent = undefined
}

function deleteEvent() {
  calendarStore.events = calendarStore.events.filter(
    (event) => event !== calendarStore.selectedEvent,
  )
  closeModal()
}

function formatDate(date: Date) {
  return date.toLocaleDateString('fr-FR')
}

function editEvent() {
  if (calendarStore.selectedEvent) {
    if (modifiedTitle.value == calendarStore.selectedEvent.title) {
      alertMessage.value = 'Le titre ne peut pas être identique au précédent'
      showAlertInfo.value = true
      setTimeout(() => {
        showAlertInfo.value = false
      }, 5000)
      return
    } else if (modifiedDescription.value == calendarStore.selectedEvent.description) {
      alertMessage.value = 'La description ne peut pas être identique à la précédente'
      showAlertInfo.value = true
      setTimeout(() => {
        showAlertInfo.value = false
      }, 5000)
      return
    } else if (modifiedTitle.value == '') {
      alertMessage.value = "L'événement doit avoir un titre."
      showAlertInfo.value = true
      setTimeout(() => {
        showAlertInfo.value = false
      }, 5000)
      return
    }
    calendarStore.eventDetailsModal(calendarStore.selectedEvent)
  }
}

onMounted(() => {
  if (calendarStore.selectedEvent?.date) {
    const { day, month, year } = calendarStore.selectedEvent.date
    date.value = new Date(year, month - 1, day)
  } else {
    date.value = new Date()
  }
})

watch(date, (newDate) => {
  if (newDate && calendarStore.selectedEvent) {
    calendarStore.selectedEvent.date = {
      day: newDate.getDate(),
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    }
  }
})
</script>
<template>
  <TransitionRoot appear :show="calendarStore.openEditEventDetailsModal" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25 backdrop-blur-sm"></div>
      </TransitionChild>

      <div v-if="calendarStore.selectedEvent" class="fixed inset-0 overflow-y-auto">
        <div class="h-12">
          <Transition
            enter-active-class="transition-opacity duration-500 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-500 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <AlertInfo v-if="showAlertInfo" :alertMessage="alertMessage" />
          </Transition>
        </div>
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <XMarkIcon
                class="absolute top-4 right-4 rounded-md hover:bg-gray-200 cursor-pointer transition h-5 w-5"
                @click="closeModal"
              />
              <DialogTitle class="leading-6 text-gray-900 capitalize flex items-center w-3/4">
                <!--:class="showAlertInfo ? 'border-flsp-medium_red duration-200 border-2' : 'border'"-->
                <input
                  type="text"
                  name="name"
                  v-model="modifiedTitle"
                  placeholder="Ajouter un titre à l'événement"
                  maxlength="25"
                  class="w-full mt-1 p-2 border focus:ring-0 rounded-lg focus:ring-flsp-light_gray focus:border-flsp-light_gray bg-gray-50 outline-none flex-1"
                />
              </DialogTitle>

              <div class="mt-4 w-full space-y-1">
                <VueDatePicker
                  v-model="date"
                  teleport="body"
                  :enable-time-picker="false"
                  :format="formatDate"
                ></VueDatePicker>

                <div class="flex items-center space-x-4">
                  <Bars3BottomLeftIcon class="h-5 w-5" />
                  <textarea
                    name="description"
                    v-model="modifiedDescription"
                    placeholder="Ajouter une description à l'événement"
                    class="w-full mt-1 p-2 border focus:ring-0 rounded-lg focus:ring-sen-gray focus:border-sen-gray bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none flex-1"
                  ></textarea>
                </div>
              </div>

              <div class="mt-8 space-x-5 flex justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-flsp-light_red px-4 py-2 text-sm font-medium text-flsp-dark_red hover:bg-flsp-medium_red focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="deleteEvent()"
                >
                  Supprimer
                </button>

                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-flsp-light_blue px-4 py-2 text-sm font-medium text-flsp-dark_blue hover:bg-flsp-medium_blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="editEvent()"
                >
                  Modifier
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
