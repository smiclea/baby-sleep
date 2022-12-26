<template>
  <div class="base-wrapper">
    <div class="base-content">
      <slot name="content"></slot>
    </div>
    <div class="base-navigation">
      <slot name="navigation"></slot>
    </div>
  </div>
</template>
<style scoped>
.base-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.base-content {
  height: 100%;
  overflow: auto;
}
</style>
