<script setup lang="ts">
import StopWatch from "@/components/modules/Stopwatch/StopWatch.vue";
import CurrentLog from "@/components/modules/CurrentLog.vue";
import ButtonVue from "@/components/ui/ButtonVue.vue";
import NavigationVue from "@/views/NavigationVue.vue";
import { useStopwatchStore } from "@/stores/stopwatchStore";
import BaseView from "@/views/BaseView.vue";

const stopwatchStore = useStopwatchStore();
stopwatchStore.loadCycles();
</script>

<template>
  <BaseView>
    <template #content>
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
          <!-- <ButtonVue
            v-if="stopwatchStore.currentCycle"
            @click="stopwatchStore.stopCycle()"
            >Stop cycle</ButtonVue
          > -->
        </div>
      </div>
    </template>
    <template #navigation>
      <NavigationVue selected-item-id="stopwatch" />
    </template>
  </BaseView>
</template>
<style scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.stop-watch {
  padding: 1rem;
}
.current-log {
  width: 100vw;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.bottom > * {
  margin-top: 1rem;
}
</style>
