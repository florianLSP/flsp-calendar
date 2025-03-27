<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()

function closeModal() {
  calendarStore.isEventClicked = false
  calendarStore.openEventDetailsModal = false
  calendarStore.selectedEvent = undefined
}

function deleteEvent() {
  calendarStore.events = calendarStore.events.filter(
    (event) => event !== calendarStore.selectedEvent,
  )
  closeModal()
}
</script>
<template>
  <TransitionRoot appear :show="calendarStore.openEventDetailsModal" as="template">
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
              <DialogTitle
                as="h3"
                class="text-xl font-medium leading-6 text-gray-900 capitalize flex items-center"
              >
                {{ calendarStore.selectedEvent.title }}
                <span
                  @click="calendarStore.editEventDetailsModal"
                  class="ml-2 p-1 rounded-md hover:bg-flsp-light_gray cursor-pointer transition"
                  ><PencilSquareIcon class="h-5 w-5"
                /></span>
              </DialogTitle>

              <div class="mt-4 w-full space-y-1">
                <p>
                  <span v-if="calendarStore.selectedEvent.date.day < 10">0</span
                  >{{ calendarStore.selectedEvent.date.day }}/<span
                    v-if="calendarStore.selectedEvent.date.month < 10"
                    >0</span
                  >{{ calendarStore.selectedEvent.date.month }}/{{
                    calendarStore.selectedEvent.date.year
                  }}
                </p>
                <p>{{ calendarStore.selectedEvent.description }}</p>
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
                  @click="closeModal"
                >
                  Fermer
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
