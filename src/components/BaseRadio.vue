<template>
  <label class="radio-option">
    <input 
      type="radio" 
      :name="name" 
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
      class="hidden-radio"
    >
    <span class="custom-radio"></span>
    <span class="radio-label">{{ label }}</span>
  </label>
</template>
<script>
export default {
  name: 'BaseRadio',
  props: {
    modelValue: { type: [String, Boolean, Number], default: '' },
    value: { type: [String, Boolean, Number], required: true },
    label: { type: String, required: true },
    name: { type: String, default: 'radio-group' }
  },
  emits: ['update:modelValue']
}
</script>
<style scoped>
.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
  font-weight: 400;
}
.hidden-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.custom-radio {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: white;
  position: relative;
  flex-shrink: 0;
}
.custom-radio::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #0b4f4a;
  transition: transform 0.2s ease;
}
.hidden-radio:checked + .custom-radio {
  border-color: #0b4f4a;
}
.hidden-radio:checked + .custom-radio::after {
  transform: translate(-50%, -50%) scale(1);
}
</style>