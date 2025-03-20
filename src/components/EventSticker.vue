<script setup lang="ts">
const props = defineProps({
  eventTitle: String,
})
</script>

<template>
  <div class="bg-blue-500 w-full rounded-md">
    <p class="pl-2 text-white text-sm overflow-hidden text-ellipsis whitespace-nowrap">
      {{ props.eventTitle }}
    </p>
  </div>
</template>
