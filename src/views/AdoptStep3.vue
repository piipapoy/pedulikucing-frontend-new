<script setup>
import BaseRadio from '../components/BaseRadio.vue'
import BaseInput from '../components/BaseInput.vue'
const model = defineModel()
</script>

<template>
  <div class="form-field">
    <label class="field-label">Apakah Anda Pernah Memelihara Kucing Sebelumnya?</label>
    <div class="radio-group">
      <BaseRadio 
        v-model="model.pernahPelihara" 
        value="tidak" 
        label="Tidak" 
      />
      <BaseRadio 
        v-model="model.pernahPelihara" 
        value="ya" 
        label="Ya" 
      />
    </div>
  </div>

  <div class="form-field">
    <label class="field-label">Apa Alasan Utama Anda Mengadopsi?</label>
    <BaseInput 
      v-model="model.alasanAdopsi"
      placeholder="Apa alasannya..." 
    />
  </div>

  <div class="form-field">
    <label class="field-label">Apakah Anda Bersedia Menanggung Biaya Perawatan Rutin dan Darurat (Pakan, Vaksin Tahunan, Biaya Medis Jika Sakit)?</label>
    <div class="radio-group">
      <BaseRadio 
        v-model="model.bersediaBiaya" 
        value="tidak" 
        label="Tidak" 
      />
      <BaseRadio 
        v-model="model.bersediaBiaya" 
        value="ya" 
        label="Ya" 
      />
    </div>
  </div>

  <div class="form-field">
    <label class="field-label">Apa Rencana Anda untuk Kucing Ini Jika Anda Harus Pindah Rumah/Kota?</label>
    <BaseInput 
      v-model="model.rencanaPindah"
      placeholder="Apa rencananya..." 
    />
  </div>

</template>

<style scoped>
:deep(.input-group) {
  width: 100%;
}
</style>