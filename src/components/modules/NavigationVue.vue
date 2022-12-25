<script setup lang="ts">
defineProps<{
  selectedItemId: "stopwatch" | "data";
}>();
</script>
<template>
  <div class="navigation-wrapper">
    <div
      class="navigation-item"
      :class="{ selected: selectedItemId === 'stopwatch' }"
    >
      Stopwatch
    </div>
    <div
      class="navigation-item"
      :class="{ selected: selectedItemId === 'data' }"
    >
      Data
    </div>
  </div>
</template>
<style scoped>
.navigation-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  background: var(--color-background-soft);
  height: 3rem;
}
.navigation-item {
  display: flex;
  padding: 0.3rem;
  align-items: center;
  justify-content: center;
  min-width: 50%;
  border: 1px solid var(--color-border);
  border-right: 0;
}
.navigation-item:last-child {
  border-right: 1px solid var(--color-border);
}
.navigation-item.selected {
  background: var(--color-background);
}
</style>
