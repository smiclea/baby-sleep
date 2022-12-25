import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { StopwatchCycle, StopwatchItem } from "@/types/Stopwatch";
import stopwatchSource from "@/sources/stopwatchSource";

export const useStopwatchStore = defineStore("stopwatch", () => {
  const cycles = ref<StopwatchCycle[]>([]);
  const currentCycle = computed(() => {
    const lastCycle = cycles.value[0]?.items as StopwatchItem[] | undefined;
    if (!lastCycle || lastCycle[0].to) return;
    return lastCycle;
  });
  const currentCycleItem = computed(() => {
    const lastCycleItem = currentCycle.value?.[0] as StopwatchItem | undefined;
    if (!lastCycleItem || lastCycleItem.to) return;
    return lastCycleItem;
  });
  const loadCycles = async () => {
    cycles.value = await stopwatchSource.loadCycles();
  };
  const addCycleItem = async () => {
    if (!currentCycle.value) {
      cycles.value.unshift({
        items: [
          {
            type: "sleep",
            from: new Date().toISOString(),
          },
        ],
      });
      await stopwatchSource.saveCycles(cycles.value);
      return;
    }
    currentCycle.value?.unshift({
      type: currentCycleItem.value?.type === "sleep" ? "awake" : "sleep",
      from: new Date().toISOString(),
    });
    await stopwatchSource.saveCycles(cycles.value);
  };
  const stopCycle = async () => {
    if (!currentCycleItem.value) return;
    currentCycleItem.value.to = new Date().toISOString();
    await stopwatchSource.saveCycles(cycles.value);
  };
  const addCurrentCycleItem = async (msToAdd: number) => {
    if (!currentCycleItem.value) return;
    let newTime = new Date(currentCycleItem.value.from).getTime() - msToAdd;
    if (newTime > new Date().getTime()) {
      newTime = new Date().getTime();
    }
    const nextCycleItem = currentCycle.value?.[1];
    if (nextCycleItem && newTime < new Date(nextCycleItem.from).getTime()) {
      newTime = new Date(nextCycleItem.from).getTime();
    }
    currentCycleItem.value.from = new Date(newTime).toISOString();
    await stopwatchSource.saveCycles(cycles.value);
  };

  return {
    cycles,
    currentCycle,
    currentCycleItem,
    loadCycles,
    addCycleItem,
    stopCycle,
    addCurrentCycleItem,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStopwatchStore, import.meta.hot));
}
