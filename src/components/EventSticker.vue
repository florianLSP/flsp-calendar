<script setup lang="ts">
const props = defineProps({
  eventTitle: String,
})
</script>

<template>
  <div class="w-full rounded-md cursor-pointer bg-blue-500 h-6 flex items-center">
    <p class="pl-2 text-white text-sm overflow-hidden text-ellipsis whitespace-nowrap">
      {{ props.eventTitle }}
    </p>
  </div>
</template>
