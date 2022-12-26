<script setup lang="ts">
import { fitFontSizeToWidth } from "@/utils/domUtils";
import { ref, watch, computed, onMounted } from "vue";
const props = defineProps<{
  from: string | null;
  label: string;
  color: string;
}>();
const currentTimeLabel = ref("");
const updateTimeLabel = () => {
  if (props.from === null) {
    currentTimeLabel.value = "";
    return;
  }
  const currentTime = new Date().getTime() - new Date(props.from).getTime();
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
    window.innerWidth - 32,
    50
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
  <div class="stopwatch-label-wrapper">
    <div
      v-if="from !== null"
      ref="currentTimeLabelEl"
      class="current-time-label"
      :style="{
        color: color,
      }"
    >
      {{ label }}
    </div>
    <div ref="currentTimeEl" class="current-time-value">
      {{ currentTimeLabel }}
    </div>
  </div>
</template>
<style scoped>
.stopwatch-label-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.current-time-label {
  font-size: 2rem;
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
</style>
