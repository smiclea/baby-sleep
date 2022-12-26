<script setup lang="ts">
import NavigationVue from "@/views/NavigationVue.vue";
import StopwatchLabel from "@/components/modules/Stopwatch/StopwatchLabel.vue";
import BaseView from "@/views/BaseView.vue";

import { useStopwatchStore } from "@/stores/stopwatchStore";
import StopWatchButton from "@/components/ui/StopWatchButton.vue";
import { ref, onMounted } from "vue";

const stopwatchStore = useStopwatchStore();
stopwatchStore.loadMilkFrom();

const color = ref("var(--color-complementary)");

const updateColor = () => {
  setTimeout(updateColor, 1000);
  if (!stopwatchStore.milkColor) {
    return;
  }
  color.value = stopwatchStore.milkColor;
};

onMounted(() => {
  updateColor();
});
</script>
<template>
  <BaseView>
    <template #content>
      <div class="milk-wrapper">
        <StopwatchLabel
          :from="stopwatchStore.milkFrom || null"
          label="Milk age"
          :color="color"
        />
        <StopWatchButton
          @click="stopwatchStore.saveMilkFrom(new Date().toISOString())"
          >Reset</StopWatchButton
        >
      </div>
    </template>
    <template #navigation>
      <NavigationVue selectedItemId="milk" />
    </template>
  </BaseView>
</template>
<style scoped>
.milk-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
