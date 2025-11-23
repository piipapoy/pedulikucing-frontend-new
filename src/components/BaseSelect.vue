<template>
  <div class="select-wrapper">
    <select 
      :value="modelValue" 
      @change="$emit('update:modelValue', $event.target.value)"
      class="form-select"
    >
      <option value="" disabled selected>Pilih salah satu...</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'BaseSelect',
  props: {
    modelValue: { type: [String, Number], default: '' },
    options: {
      type: Array,
      required: true,
    }
  },
  emits: ['update:modelValue']
}
</script>
<style scoped>
.select-wrapper {
  position: relative;
  width: 100%;
}
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  appearance: none;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
}
.form-select:focus {
  outline: none;
  border-color: #0b4f4a;
}
.select-wrapper::after {
  content: '▼';
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.75rem;
  color: #555;
}
</style>