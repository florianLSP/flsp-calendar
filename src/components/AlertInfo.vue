<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  alertMessage: String,
})
</script>
<template>
  <div
    id="alert-2"
    class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    <InformationCircleIcon class="h-5 w-5" />
    <div class="ms-3 text-sm font-medium">{{ props.alertMessage }}</div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
      data-dismiss-target="#alert-2"
      aria-label="Close"
    >
      <XMarkIcon class="h-5 w-5" />
    </button>
  </div>
</template>
