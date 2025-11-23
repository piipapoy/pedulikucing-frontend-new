<script setup>
import BaseSquareCheckbox from '../components/BaseSquareCheckbox.vue'
const model = defineModel()
</script>
<template>
  <p class="sub-title">
    Persetujuan yang Harus Dipahami oleh Anda
  </p>
  <div class="form-field">
    <div class="checkbox-group">
      <BaseSquareCheckbox 
        v-model="model.persetujuan"
        value="pernyataan-benar"
        label="Saya menyatakan bahwa seluruh informasi yang saya berikan adalah benar."
      />
      <BaseSquareCheckbox 
        v-model="model.persetujuan"
        value="bersedia-wawancara"
        label="Saya bersedia untuk dihubungi dan dijadwalkan untuk sesi wawancara/survei oleh pihak rescuer/shelter."
      />
      <BaseSquareCheckbox 
        v-model="model.persetujuan"
        value="bersedia-update"
        label="Saya bersedia memberikan update kondisi kucing secara berkala pasca-adopsi."
      />
      <BaseSquareCheckbox 
        v-model="model.persetujuan"
        value="mengerti-hak-penolakan"
        label="Saya mengerti bahwa pihak rescuer/shelter memiliki hak penuh untuk menolak aplikasi adopsi saya."
      />
    </div>
  </div>
</template>
<style scoped>
.sub-title {
  font-weight: 300;
  color: var(--text-dark);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.checkbox-group {
  gap: 1.2rem;
}
</style>