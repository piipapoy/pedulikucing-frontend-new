<script setup>
import BaseInput from '../components/BaseInput.vue'
import BaseSelect from '../components/BaseSelect.vue'
import BaseRadio from '../components/BaseRadio.vue'
import BaseSquareCheckbox from '../components/BaseSquareCheckbox.vue'
const model = defineModel()

const tipeTempatOptions = [
  { text: 'Rumah Milik Sendiri', value: 'milik-sendiri' },
  { text: 'Rumah Sewa', value: 'sewa' },
  { text: 'Kos', value: 'kos' },
  { text: 'Apartemen', value: 'apartemen' },
]
</script>

<template>
  <div class="form-field">
    <label class="field-label">Tipe Tempat Tinggal Anda</label>
    <BaseSelect 
      v-model="model.tipeTempatTinggal" 
      :options="tipeTempatOptions" 
    />
  </div>

  <div class="form-field" v-if="model.tipeTempatTinggal !== 'milik-sendiri'">
    <label class="field-label">Jika Rumah Sewa / Kos / Apartemen, Apakah Pemilik Mengizinkan Memelihara Hewan?</label>
    <div class="radio-group">
      <BaseRadio 
        v-model="model.izinHewan" 
        value="tidak" 
        label="Tidak" 
      />
      <BaseRadio 
        v-model="model.izinHewan" 
        value="ya" 
        label="Ya" 
      />
    </div>
  </div>

  <div class="form-field">
    <label class="field-label">Siapa Saja yang Tinggal Bersama Anda?</label>
    <div class="checkbox-group">
      <BaseSquareCheckbox 
        v-model="model.tinggalBersama"
        value="sendiri"
        label="Tinggal Sendiri"
      />
      <BaseSquareCheckbox 
        v-model="model.tinggalBersama"
        value="pasangan"
        label="Bersama Pasangan"
      />
      <BaseSquareCheckbox 
        v-model="model.tinggalBersama"
        value="orangtua"
        label="Bersama Orang Tua"
      />
      <BaseSquareCheckbox 
        v-model="model.tinggalBersama"
        value="anak"
        label="Bersama Anak-anak"
      />
    </div>
  </div>

  <div class="form-field" v-if="model.tinggalBersama.includes('anak')">
    <label class="field-label">Sebutkan Usia Anak-anak Anda</label>
    <BaseInput 
      v-model="model.usiaAnak"
      placeholder="Usia anak-anak..." 
    />
  </div>

  <div class="form-field">
    <label class="field-label">Apakah Anda Memiliki Hewan Peliharaan Lain di Rumah?</label>
    <div class="radio-group">
      <BaseRadio 
        v-model="model.punyaPeliharaanLain" 
        value="tidak" 
        label="Tidak" 
      />
      <BaseRadio 
        v-model="model.punyaPeliharaanLain" 
        value="ya" 
        label="Ya" 
      />
    </div>
  </div>

  <div class="form-field" v-if="model.punyaPeliharaanLain === 'ya'">
    <label class="field-label">Sebutkan jenis, jumlah, dan karakternya</label>
    <BaseInput 
      v-model="model.deskripsiPeliharaanLain"
      placeholder="Deskripsi peliharaan lain di rumah..." 
    />
  </div>

</template>

<style scoped>
:deep(.input-group) {
  width: 100%;
}
</style>