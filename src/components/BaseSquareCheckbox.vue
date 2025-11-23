<template>
  <label class="checkbox-container">
    <input 
      type="checkbox" 
      :value="value"
      :checked="isChecked"
      @change="handleChange"
      class="hidden-checkbox"
    >
    <span class="custom-checkbox">
      <svg v-if="isChecked" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span class="checkbox-label">{{ label }}</span>
  </label>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: { type: Array, required: true },
  value: { type: [String, Number], required: true },
  label: { type: String, required: true }
})
const emit = defineEmits(['update:modelValue'])
const isChecked = computed(() => {
  return props.modelValue.includes(props.value)
})
function handleChange(event) {
  let newArray = [...props.modelValue]
  if (event.target.checked) {
    newArray.push(props.value)
  } else {
    newArray = newArray.filter(v => v !== props.value)
  }
  emit('update:modelValue', newArray)
}
</script>
<style scoped>
.checkbox-container {
  display: flex;
  align-items: flex-start; 
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 0; 
  line-height: 1.4;
  user-select: none;
}
.hidden-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.custom-checkbox {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.hidden-checkbox:checked + .custom-checkbox {
  background-color: #0b4f4a; 
  border-color: #0b4f4a;
}
.checkbox-label {
  padding-top: 1px;
}
</style>