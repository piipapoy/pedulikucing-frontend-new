<template>
  <section class="form-section">
    <div class="form-card">
      <h2 class="form-title">Daftar Sebagai Foster</h2>
      <form @submit.prevent="handleSubmit">
        <BaseInput
          id="nama"
          label="Nama Lengkap"
          v-model="form.nama"
        />
        <BaseInput
          id="telepon"
          label="Nomor Telepon"
          v-model="form.telepon"
        />
        <BaseTextarea
          id="alamat"
          label="Alamat Lengkap"
          placeholder="Alamat tempat tinggal untuk foster..."
          v-model="form.alamat"
        />
        <BaseRadio
          label="Pengalaman dengan Kucing"
          name="pengalaman"
          v-model="form.pengalaman"
          :options="[
            { label: 'Baru pertama kali, tapi sudah belajar', value: 'baru' },
            { label: 'Sudah pernah pelihara kucing sendiri', value: 'pernah' },
            { label: 'Berpengalaman foster sebelumnya', value: 'pro' },
            { label: 'Sangat berpengalaman dengan rescue', value: 'rescue' }
          ]"
        />
        <BaseTextarea
          id="motivasi"
          label="Motivasi & Alasan"
          placeholder="Ceritakan alasan Anda ingin menjadi foster parent..."
          v-model="form.motivasi"
          :rows="5"
        />
        <BaseButton variant="default" type="submit">
          Daftar Sebagai Foster
        </BaseButton>
      </form>
    </div>
  </section>
</template>
<script>
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseRadio from './BaseRadio.vue'
import BaseButton from './BaseButton.vue'
export default {
  name: 'FosterForm',
  components: {
    BaseInput,
    BaseTextarea,
    BaseRadio,
    BaseButton
  },
  setup() {
    const form = ref({
      nama: '',
      telepon: '',
      alamat: '',
      pengalaman: '',
      motivasi: ''
    });
    const handleSubmit = () => {
      console.log('Form submitted:', form.value);
      alert('Form pendaftaran terkirim!');
      form.value = {
        nama: '',
        telepon: '',
        alamat: '',
        pengalaman: '',
        motivasi: ''
      };
    };
    return { form, handleSubmit };
  }
}
</script>
<style scoped>
.form-section {
  padding: 2.5rem 0; 
}
.form-card {
  background-color: white;
  border-radius: 1rem; 
  padding: 2rem;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .form-card {
    padding: 3rem;
  }
}
.form-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color, #2d2d2d);
  text-align: center;
  margin: 0 auto 2.5rem auto;
}
</style>