<script setup lang="ts">
defineProps<{
  colorStyle?: "primary" | "complementary";
  small?: boolean;
}>();
</script>
<template>
  <button :class="{ complementary: colorStyle === 'complementary', small }">
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  background: var(--color-primary);
  border: 1px solid var(--color-border);
  color: white;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  font-size: 17px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  text-align: center;
}
button.small {
  width: 5rem;
  height: 5rem;
}
button.complementary {
  background: var(--color-complementary);
}
button:active {
  transform: scale(0.9);
  transition: all 0.1s ease-in-out;
}
</style>
