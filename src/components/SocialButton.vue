<template>
  <button class="social-button">
    <span class="icon-wrapper">
      <slot name="icon"></slot>
    </span>
    <span class="text-wrapper">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'SocialButton'
}
</script>
<style scoped>
.social-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 0.75rem 1.5rem; 
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem; 
  font-weight: 500;
  color: #333;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 999px; 
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  position: relative; 
}
.social-button:hover {
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.icon-wrapper {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(svg) {
  width: 20px;
  height: 20px;
}
</style>