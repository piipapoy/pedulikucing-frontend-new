<template>
  <div class="form-group">
    <label :for="id" class="form-label">{{ label }}</label>
    <textarea
      :id="id"
      :placeholder="placeholder" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-textarea"
      :rows="rows"
    ></textarea>
  </div>
</template>
<script>
export default {
  name: 'BaseTextarea',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 4 }
  },
  emits: ['update:modelValue']
}
</script>
<style scoped>
.form-group {
  width: 100%;
  margin-bottom: 1.5rem;
  text-align: left;
}
.form-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 0.5rem;
}
.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #333;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: vertical;
}
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color, #0b4f4a);
  box-shadow: 0 0 0 3px rgba(11, 79, 74, 0.1);
}
</style>