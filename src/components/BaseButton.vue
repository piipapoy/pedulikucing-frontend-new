<template>
  <button :class="['base-button', variant]">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'BaseButton',
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
}
.base-button {
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 999px;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  transition: all 0.2s ease;
}
.base-button.default {
  background-color: var(--primary-color);
  color: white;
}
.base-button.default:hover {
  background-color: #083b37; 
  border-color: #083b37;
}
.base-button.outline {
  background-color: white;
  color: var(--primary-color);
}
.base-button.outline:hover {
  background-color: #f0fafa; 
}
</style>