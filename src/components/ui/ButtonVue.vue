<template>
  <button>
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  background: var(--color-primary);
  border: 1px solid var(--color-border);
  color: white;
  font-size: 14px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  padding: 1rem;
}
button:active {
  transform: scale(0.9);
  transition: all 0.1s ease-in-out;
}
</style>
