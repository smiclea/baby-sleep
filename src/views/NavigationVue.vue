<script setup lang="ts">
import { useStopwatchStore } from "@/stores/stopwatchStore";
import { ref, onMounted } from "vue";

defineProps<{
  selectedItemId: "stopwatch" | "milk" | "history";
}>();

const stopwatchStore = useStopwatchStore();
stopwatchStore.loadMilkFrom();

const color = ref("var(--color-complementary)");

const updateColor = () => {
  setTimeout(updateColor, 1000);
  if (!stopwatchStore.milkColor) {
    return;
  }
  color.value = `${stopwatchStore.milkColor}55`;
};

onMounted(() => {
  updateColor();
});
</script>
<template>
  <div class="navigation-wrapper">
    <RouterLink
      to="/"
      class="navigation-item"
      :class="{ selected: selectedItemId === 'stopwatch' }"
      >Sleep Cycle</RouterLink
    >
    <RouterLink
      to="/milk"
      class="navigation-item"
      :class="{ selected: selectedItemId === 'milk' }"
      :style="{
        background: selectedItemId !== 'milk' ? color : undefined,
      }"
      >Milk</RouterLink
    >
    <RouterLink
      to="/history"
      class="navigation-item"
      :class="{ selected: selectedItemId === 'history' }"
      >History</RouterLink
    >
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
  color: inherit;
  text-decoration: none;
  padding: 0.3rem;
  align-items: center;
  justify-content: center;
  flex: 1;
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
