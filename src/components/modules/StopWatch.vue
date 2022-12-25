<script setup lang="ts">
import StopWatchButton from "@/components/ui/StopWatchButton.vue";
import { fitFontSizeToWidth } from "@/utils/domUtils";
import { onMounted, ref, computed, watch } from "vue";

const props = defineProps<{
  from: Date | null;
  type: "sleep" | "awake";
}>();
const emit = defineEmits<{
  (e: "start-sleep"): void;
  (e: "start-awake"): void;
  (e: "add-sleep-time", time: number): void;
  (e: "add-awake-time", time: number): void;
}>();

const currentTimeLabel = ref("");
const updateTimeLabel = () => {
  if (props.from === null) {
    currentTimeLabel.value = "";
    return;
  }
  const currentTime = new Date().getTime() - props.from.getTime();
  const hours = Math.floor(currentTime / 3600000);
  const minutes = Math.floor((currentTime % 3600000) / 60000);
  const seconds = Math.floor(((currentTime % 3600000) % 60000) / 1000);
  if (hours === 0 && minutes === 0) {
    currentTimeLabel.value = `${seconds} seconds`;
    return;
  }
  if (hours === 0) {
    currentTimeLabel.value = `${minutes} minutes ${seconds} seconds`;
    return;
  }
  currentTimeLabel.value = `${hours} hours ${minutes} minutes ${seconds} seconds`;
};
watch(
  computed(() => props.from),
  () => {
    updateTimeLabel();
  },
  { immediate: true }
);

const currentTimeEl = ref<HTMLElement | null>(null);
const currentTimeLabelEl = ref<HTMLElement | null>(null);

const refitFontSize = () => {
  if (!currentTimeEl.value || !currentTimeLabelEl.value) {
    return;
  }
  const fontFamily = window.getComputedStyle(currentTimeEl.value).fontFamily;
  const fontSize = fitFontSizeToWidth(
    currentTimeLabel.value,
    fontFamily,
    window.innerWidth - 32
  );
  currentTimeEl.value.style.fontSize = `${fontSize}px`;
};
const updateStopwatch = () => {
  updateTimeLabel();
  refitFontSize();
  setTimeout(updateStopwatch, 1000);
};
onMounted(() => {
  updateStopwatch();
});
</script>
<template>
  <div class="stopwatch-wrapper">
    <div class="current-time">
      <div
        v-if="from !== null"
        ref="currentTimeLabelEl"
        class="current-time-label"
        :class="{ sleep: type === 'sleep' }"
      >
        {{ type === "sleep" ? "Sleeping" : "Awake" }} for
      </div>
      <div ref="currentTimeEl" class="current-time-value">
        {{ currentTimeLabel }}
      </div>
    </div>
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
              @click="emit('add-sleep-time', -300000)"
              >-5m</StopWatchButton
            >
            <StopWatchButton
              class="small-action"
              :small="true"
              color-style="complementary"
              @click="emit('add-sleep-time', 300000)"
              >+5m</StopWatchButton
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
              @click="emit('add-awake-time', -300000)"
              >-5m</StopWatchButton
            >
            <StopWatchButton
              class="small-action"
              :small="true"
              @click="emit('add-awake-time', 300000)"
              >+5m</StopWatchButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.current-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.current-time-label {
  font-size: 3rem;
  color: var(--color-primary);
}
.current-time-label.sleep {
  color: var(--color-complementary);
}
.current-time-value {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
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
