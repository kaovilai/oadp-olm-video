<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <aside class="clawd-note" aria-label="Key takeaway">
    <Clawd class="note-mascot" />
    <p>{{ text }}</p>
  </aside>
</template>
