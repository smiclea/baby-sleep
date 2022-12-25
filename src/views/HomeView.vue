<script setup lang="ts">
import StopWatch from "@/components/modules/StopWatch.vue";
import CurrentLog from "@/components/modules/CurrentLog.vue";
import ButtonVue from "@/components/ui/ButtonVue.vue";
import NavigationVue from "@/components/modules/NavigationVue.vue";
import { useStopwatchStore } from "@/stores/stopwatchStore";

const stopwatchStore = useStopwatchStore();
</script>

<template>
  <div class="home-wrapper">
    <StopWatch
      class="stop-watch"
      :from="stopwatchStore.currentCycleItem?.from || null"
      :type="stopwatchStore.currentCycleItem?.type || 'awake'"
      @start-sleep="stopwatchStore.addCycleItem()"
      @start-awake="stopwatchStore.addCycleItem()"
      @add-sleep-time="stopwatchStore.addCurrentCycleItem($event)"
      @add-awake-time="stopwatchStore.addCurrentCycleItem($event)"
    />
    <CurrentLog
      class="current-log"
      :log="stopwatchStore.currentCycle || null"
    />
    <div class="bottom">
      <ButtonVue
        v-if="stopwatchStore.currentCycle"
        class="finish-button"
        @click="stopwatchStore.stopCycle()"
        >Stop cycle</ButtonVue
      >
      <NavigationVue selected-item-id="stopwatch" />
    </div>
  </div>
</template>
<style scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
}
.stop-watch {
  padding: 1rem;
}
.current-log {
  width: 100vw;
  flex-shrink: 1;
  flex-grow: 1;
  overflow: auto;
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom > * {
  margin-top: 1rem;
}
.finish-button {
  width: 200px;
}
</style>
