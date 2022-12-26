<script setup lang="ts">
import NavigationVue from "@/views/NavigationVue.vue";
import BaseView from "@/views/BaseView.vue";
</script>
<template>
  <BaseView>
    <template #content>
      <div class="history-wrapper">History</div>
    </template>
    <template #navigation>
      <NavigationVue selectedItemId="history" />
    </template>
  </BaseView>
</template>
