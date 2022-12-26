<script setup lang="ts">
import StopWatchButton from "@/components/ui/StopWatchButton.vue";
import StopwatchLabel from "@/components/modules/Stopwatch/StopwatchLabel.vue";

defineProps<{
  from: string | null;
  type: "sleep" | "awake";
}>();
const emit = defineEmits<{
  (e: "start-sleep"): void;
  (e: "start-awake"): void;
  (e: "add-sleep-time", time: number): void;
  (e: "add-awake-time", time: number): void;
}>();
</script>
<template>
  <div class="stopwatch-wrapper">
    <StopwatchLabel
      :from="from"
      :label="`${type === 'sleep' ? 'Sleeping' : 'Awake'} for`"
      :color="
        type === 'sleep' ? 'var(--color-complementary)' : 'var(--color-primary)'
      "
    ></StopwatchLabel>
    <div class="actions" :class="{ center: from === null }">
      <div class="action-column">
        <StopWatchButton
          @click="emit('start-sleep')"
          v-if="type === 'awake'"
          color-style="complementary"
          >Start Sleep</StopWatchButton
        >
        <div v-if="type === 'sleep'" class="small-actions">
          <div class="small-action-label">Add</div>
          <div class="small-action-buttons">
            <StopWatchButton
              class="small-action"
              :small="true"
              color-style="complementary"
              @click="emit('add-sleep-time', -2 * 60000)"
              >-2m</StopWatchButton
            >
            <StopWatchButton
              class="small-action"
              :small="true"
              color-style="complementary"
              @click="emit('add-sleep-time', 2 * 60000)"
              >+2m</StopWatchButton
            >
          </div>
        </div>
      </div>
      <div v-if="from !== null" class="action-column">
        <StopWatchButton v-if="type === 'sleep'" @click="emit('start-awake')"
          >Start Awake</StopWatchButton
        >
        <div v-if="type === 'awake'" class="small-actions">
          <div class="small-action-label">Add</div>
          <div class="small-action-buttons">
            <StopWatchButton
              class="small-action"
              :small="true"
              @click="emit('add-awake-time', -2 * 60000)"
              >-2m</StopWatchButton
            >
            <StopWatchButton
              class="small-action"
              :small="true"
              @click="emit('add-awake-time', 2 * 60000)"
              >+2m</StopWatchButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
}
.actions.center {
  justify-content: center;
}
.action-column {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.action-column:last-child {
  margin-right: 0;
}
.small-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.small-action {
  margin-left: 0.5rem;
}
.small-action:first-child {
  margin-left: 0;
}
</style>
