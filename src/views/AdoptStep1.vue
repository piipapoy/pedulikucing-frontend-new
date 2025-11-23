<script setup>
import BaseInput from '../components/BaseInput.vue'
const model = defineModel()
</script>

<template>
  <div class="form-field">
    <label class="field-label">Nama Lengkap</label>
    <BaseInput 
      v-model="model.namaLengkap"
      placeholder="Nama lengkap..." 
    />
  </div>

  <div class="form-field">
    <label class="field-label">Nomor Telepon</label>
    <BaseInput 
      v-model="model.nomorTelepon"
      placeholder="Nomor telepon..." 
    />
    <small>Contoh: 6285779716749</small>
  </div>

  <div class="form-field">
    <label class="field-label">Nomor KTP</label>
    <BaseInput 
      v-model="model.nomorKTP"
      placeholder="Nomor KTP..." 
    />
  </div>

  <div class="form-field">
    <label class="field-label">Akun Media Sosial</label>
    <BaseInput 
      v-model="model.mediaSosial"
      placeholder="Instagram/Facebook" 
    />
    <small>Contoh: @pedulikucing.id</small>
  </div>
</template>

<style scoped>
small {
  font-size: 0.85rem;
  color: #666666;
  margin-top: 0.1rem;
  margin-bottom: 0.8rem;
}
:deep(.input-group) {
  width: 100%;
}
</style>