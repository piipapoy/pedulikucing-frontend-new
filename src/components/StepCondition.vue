<template>
  <div class="step-content">
    <div class="condition-group">
      <p class="condition-label">Bagaimana kondisi kucing saat ini? (Pilih minimal 1)</p>
      <div class="checkbox-list">
        <label v-for="condition in conditions" :key="condition.value" class="checkbox-item">
          <input 
            type="checkbox" 
            :value="condition.value" 
            v-model="selectedConditions"
            class="custom-checkbox"
          >
          <span class="checkbox-text">{{ condition.label }}</span>
        </label>
      </div>
    </div>
    <div class="description-group">
      <label for="detail-deskripsi" class="description-label">Deskripsi Tambahan (Opsional)</label>
      <textarea 
        id="detail-deskripsi"
        v-model="additionalDescription"
        placeholder="Berikan detail tambahan tentang situasi. Contoh: Kucing ini sudah ada di sini sejak tadi malam, terlihat lapar, atau ada luka di kaki depan sebelah kiri..."
        rows="5"
        class="description-textarea"
        @input="$emit('update:description', additionalDescription)"
      ></textarea>
      <p class="char-count">{{ additionalDescription.length }} / 500 karakter</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const conditions = [
  { label: 'Luka/Cedera Terlihat', value: 'injured' },
  { label: 'Sakit/Lemas', value: 'sick' },
  { label: 'Terjebak/Di tempat berbahaya', value: 'trapped' },
  { label: 'Kelaparan/Kehausan', value: 'hungry' },
  { label: 'Kucing baru lahir (kitten)', value: 'kitten' },
]
const selectedConditions = ref([])
const additionalDescription = ref('')
</script>
<style scoped>
.step-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}
.condition-group {
    width: 100%;
    text-align: left;
}
.condition-label {
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 1rem;
    font-size: 1rem;
}
.checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}
.checkbox-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 0.8rem;
    border-radius: 8px;
    transition: background-color 0.2s, border-color 0.2s;
}
.checkbox-item:hover {
    background-color: #f3f4f6;
    border-color: #0f766e;
}
.checkbox-item:has(.custom-checkbox:checked) {
    background-color: #ecfdf5;
    border-color: #0f766e;
}
.custom-checkbox {
    width: 18px;
    height: 18px;
    margin-right: 0.8rem;
    accent-color: #0f766e;
}
.checkbox-text {
    font-size: 0.95rem;
    color: #374151;
    font-weight: 500;
}
.description-group {
    width: 100%;
    text-align: left;
}
.description-label {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    display: block;
    font-size: 1rem;
}
.description-textarea {
    width: 100%;
    box-sizing: border-box; 
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
    resize: vertical;
}
.description-textarea:focus {
    border-color: #0f766e;
    box-shadow: 0 0 0 1px #0f766e;
}
.char-count {
    font-size: 0.8rem;
    color: #6b7280;
    text-align: right;
    margin: 0.3rem 0 0;
}
</style>