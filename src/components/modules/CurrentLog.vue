<script setup lang="ts">
import type { StopwatchItem } from "@/types/Stopwatch";
import { watch, computed, ref } from "vue";
import { DateTime } from "luxon";

const props = defineProps<{
  log: StopwatchItem[] | null;
}>();
const headerLabel = ref("");
const currentLog = ref<StopwatchItem[] | null>(null);
watch(
  computed(() => props.log),
  () => {
    currentLog.value = props.log?.slice(1) || null;
    if (currentLog.value == null || currentLog.value.length === 0) {
      headerLabel.value = "";
      return;
    }
    const firstDate = DateTime.fromISO(
      currentLog.value[currentLog.value.length - 1].from
    );
    const lastDate = DateTime.now();
    if (firstDate.hasSame(lastDate, "day")) {
      headerLabel.value = firstDate.toFormat("LLLL dd");
      return;
    }
    headerLabel.value = `${firstDate.toFormat("LLLL dd")} - ${lastDate.toFormat(
      "LLLL dd"
    )}`;
  },
  { immediate: true, deep: true }
);
const getDifferenceLabel = (from: string, to: string) => {
  const diff = DateTime.fromISO(to).diff(DateTime.fromISO(from), [
    "hours",
    "minutes",
    "seconds",
  ]);
  const hours = Math.floor(diff.hours);
  const minutes = Math.floor(diff.minutes);
  const seconds = Math.floor(diff.seconds);
  if (hours === 0 && minutes === 0) {
    return `${seconds}s`;
  }
  if (hours === 0) {
    return `${minutes}m${seconds}s`;
  }
  return `${hours}h${minutes}m${seconds}s`;
};
const getTime = (date: string) => {
  const time = DateTime.fromISO(date);
  return `${time.toFormat("HH")}:${time.toFormat("mm")}`;
};
</script>
<template>
  <div class="current-log-wrapper">
    <div class="header">{{ headerLabel }}</div>
    <div class="items">
      <div class="item" v-for="(item, index) in currentLog" :key="item.from">
        <div class="item-label" :class="{ 'slept-for': item.type === 'sleep' }">
          {{ item.type === "sleep" ? "Slept" : "Awake" }}
        </div>
        <div class="item-value">
          for
          {{ getDifferenceLabel(item.from, log![index].from) }}
          ({{ getTime(item.from) }} - {{ getTime(log![index].from) }})
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.header {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
.item {
  display: flex;
  padding: 0.5rem 0;
  border-top: 1px solid var(--color-border);
}
.item:last-child {
  border-bottom: 1px solid var(--color-border);
}
.item-label {
  color: var(--color-primary);
}
.item-label.slept-for {
  color: var(--color-complementary);
}
.item-value {
  margin-left: 0.5rem;
}
</style>
