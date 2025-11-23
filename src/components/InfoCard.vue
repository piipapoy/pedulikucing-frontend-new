<template>
  <div class="info-card">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'InfoCard'
}
</script>
<style scoped>
.info-card {
  background-color: #fff;
  border-radius: 0.75rem; 
  padding: 1.5rem; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>