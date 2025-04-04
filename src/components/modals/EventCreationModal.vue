<script setup lang="ts">
import { ref, watch } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useCalendarStore } from '@/stores/calendar'
import { XMarkIcon, Bars3BottomLeftIcon } from '@heroicons/vue/24/solid'
import AlertInfo from '../AlertInfo.vue'

const calendarStore = useCalendarStore()
const titleEvent = ref('')
const descriptionEvent = ref()
const showAlertInfo = ref(false)
const alertMessage = ref()
const titleNbChar = ref(0)

function closeModal() {
  calendarStore.openEventCreationModal = false
}

function createNewEvent() {
  if (titleEvent.value == '') {
    alertMessage.value = "L'événement doit avoir un titre !"
    showAlertInfo.value = true
    setTimeout(() => {
      showAlertInfo.value = false
    }, 5000)
    return
  }
  calendarStore.openEventCreationModal = false
  calendarStore.events.push({
    date: {
      day: calendarStore.selectedDay,
      month: calendarStore.selectedMonth,
      year: calendarStore.selectedYear,
    },
    title: titleEvent.value,
    description: descriptionEvent.value,
  })

  titleEvent.value = ''
  descriptionEvent.value = ''
}

watch(titleEvent, () => {
  titleNbChar.value = titleEvent.value.length
  if (titleEvent.value.length >= 25) {
    alertMessage.value = "Le titre de l'événement ne peut pas dépasser 25 caractères."
    showAlertInfo.value = true
    setTimeout(() => {
      showAlertInfo.value = false
    }, 5000)
    return
  }
})
</script>
<template>
  <TransitionRoot appear :show="calendarStore.openEventCreationModal" as="template">
    <Dialog
      as="div"
      @close="closeModal"
      @keydown.enter.prevent="createNewEvent"
      class="relative z-10"
    >
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

      <div class="fixed inset-0">
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
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Nouvel événement
              </DialogTitle>
              <div class="mt-4 w-full space-y-4">
                <div class="relative">
                  <input
                    type="text"
                    name="name"
                    v-model="titleEvent"
                    placeholder="Ajouter un titre à l'événement"
                    maxlength="25"
                    class="w-full mt-1 p-2 border focus:ring-0 rounded-lg focus:ring-flsp-light_gray focus:border-flsp-light_gray bg-gray-50 outline-none flex-1 pr-8"
                    :class="
                      showAlertInfo ? 'border-flsp-medium_red duration-200 border-2' : 'border'
                    "
                  />
                  <p class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    {{ titleNbChar }}/25
                  </p>
                </div>

                <div class="flex items-center space-x-4">
                  <Bars3BottomLeftIcon class="h-5 w-5" />
                  <textarea
                    name="description"
                    v-model="descriptionEvent"
                    placeholder="Ajouter une description à l'événement"
                    class="w-full mt-1 p-2 border focus:ring-0 rounded-lg focus:ring-sen-gray focus:border-sen-gray bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none flex-1"
                  ></textarea>
                </div>
              </div>

              <div class="mt-8 space-x-5 flex justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-flsp-light_red px-4 py-2 text-sm font-medium text-flsp-dark_red hover:bg-flsp-medium_red focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-flsp-light_blue px-4 py-2 text-sm font-medium text-flsp-dark_blue hover:bg-flsp-medium_blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="createNewEvent"
                >
                  Créer
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
