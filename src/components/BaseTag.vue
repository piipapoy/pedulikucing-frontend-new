<template>
  <span :class="['base-tag', variant]">
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: 'BaseTag',
  props: {
    variant: {
      type: String,
      default: 'default'
    }
  }
}
</script>
<style scoped>
:root {
  --primary-color: #0b4f4a;
  --primary-color-light: #BAEAE7; 
}
.base-tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem; 
  font-weight: 500;
  padding: 0.2rem 0.6rem; 
  border-radius: 999px;
  line-height: 1.4;
  display: inline-block;
  white-space: nowrap;
}
.base-tag.default {
  background-color: #eee; 
  color: #555;
}
.base-tag.gender {
  background-color: #BAEAE7;
  color: var(--primary-color);
  font-weight: 600;
}
.base-tag.character {
  background-color: #E0F2F1;
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
}
.base-tag.health-steril, .base-tag.health-vaksin {
    background-color: transparent; 
    color: white; 
    padding-left: 0;
    padding-right: 0;
}
</style>