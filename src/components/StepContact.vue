<template>
  <div class="step-content">
    <div class="privacy-guarantee">
      Privasi Terjamin: Informasi kontak Anda akan digunakan oleh tim relawan dan admin untuk koordinasi penyelamatan.
    </div>
    <div class="input-group">
      <label for="full-name">Nama Lengkap</label>
      <input
        id="full-name"
        type="text"
        placeholder="Nama Lengkap..."
        v-model="contact.fullName"
        class="base-input form-input"
        @input="$emit('update:fullName', contact.fullName)"
      />
    </div>
    <div class="input-group">
      <label for="phone-number">Nomor Telepon</label>
      <input
        id="phone-number"
        type="tel"
        placeholder="Nomor Telepon..."
        v-model="contact.phoneNumber"
        class="base-input form-input"
        @input="$emit('update:phoneNumber', contact.phoneNumber)"
      />
      <p class="example-text">Contoh: 6285779716749</p>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const contact = reactive({
    fullName: '',
    phoneNumber: ''
})
</script>
<style scoped>
.step-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}
.privacy-guarantee {
    background-color: #ecfdf5; 
    border: 1px solid #0f766e;
    color: #0f766e;
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.4;
    font-weight: 500;
}
.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}
label {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.3rem; 
  font-size: 0.95rem;
}
.form-input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}
.form-input:focus {
  border-color: #0f766e;
  box-shadow: 0 0 0 1px #0f766e;
}
.example-text {
    font-size: 0.8rem;
    color: #9ca3af;
    margin-top: 0.2rem;
    text-align: left;
}
</style>