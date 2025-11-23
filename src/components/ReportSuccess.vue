<template>
  <div class="success-card">
    <div class="icon-wrapper">
      <img 
        src="../assets/Ceklis.png" 
        alt="Sukses" 
        class="checkmark" 
      />
    </div>
    <h1>Laporan Berhasil Dikirim!</h1>
    <p class="subtitle">
      Terima kasih telah melaporkan kucing yang membutuhkan bantuan. 
      Tim kami akan segera menindaklanjuti laporan Anda.
    </p>
    
    <div class="info-box">
      <h2>Apa Yang Terjadi Selanjutnya?</h2>
      <ul class="process-list">
        <li>
          <span class="step-number">1</span>
          <div class="step-content">
            <strong>Verifikasi (1-2 jam)</strong>
            <p>Tim relawan akan memverifikasi lokasi dan kondisi kucing.</p>
          </div>
        </li>
        <li>
          <span class="step-number">2</span>
          <div class="step-content">
            <strong>Penyelamatan</strong>
            <p>Kucing akan diselamatkan dan dibawa ke klinik mitra.</p>
          </div>
        </li>
        <li>
          <span class="step-number">3</span>
          <div class="step-content">
            <strong>Penggalangan Dana</strong>
            <p>Kasus akan dipublikasikan untuk biaya pengobatan.</p>
          </div>
        </li>
        <li>
          <span class="step-number">4</span>
          <div class="step-content">
            <strong>Update Progress</strong>
            <p>Anda akan mendapat update perkembangan kesehatan kucing.</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="info-box advice-box">
      <div class="advice-title-wrapper">
        <img 
          src="../assets/Saran.png" 
          alt="Saran" 
          class="advice-icon" 
        />
        <h2>Saran untuk Anda</h2>
      </div>
      <p>
        Buat akun PeduliKucing untuk melacak status laporan Anda secara real-time, 
        mendapat notifikasi update, dan menindaklanjuti jika kasusnya fatal.
      </p>
      <div class="advice-buttons">
        <BaseButton 
          variant="default" 
          @click="$emit('register')"
        >
          Daftar Akun
        </BaseButton>
        <BaseButton 
          variant="outline" 
          @click="$emit('later')"
        >
          Nanti Saja
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
const emit = defineEmits(['register', 'later']) 
</script>

<style scoped>
/* Style disamakan persis dengan AdoptSuccess.vue */
.success-card {
  font-family: 'Noto Sans', sans-serif;
  max-width: 600px; 
  width: 100%;
  margin: 1.5rem auto 3rem;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 70px; /* Rounded corner besar */
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  text-align: center;
}
.icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}
.checkmark {
  width: 60px;
  height: 60px;
}
h1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: 1rem;
  color: black;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.info-box {
  background-color: #baeae7; 
  border-radius: 12px;
  padding: 1.5rem 4rem 2.2rem 4rem;
  text-align: left;
  margin-top: 1.5rem;
}
.info-box h2 {
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  color: #0B4F4A;
  margin-top: 0.3rem;
  margin-bottom: 1.3rem;
}
.process-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.process-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.step-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #0b4f4a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  padding-top: 2px;
}
.step-content {
  line-height: 1.4;
}
.step-content strong {
  font-weight: 600;
  color: #134643;
  font-size: 0.95rem;
  display: block; /* Memastikan text bold di baris baru/atas */
}
.step-content p {
  font-size: 0.9rem;
  color: #134643;
  margin: 0.2rem 0 0;
}
.advice-box {
  text-align: center;
  background-color: #baeae763;
}
.advice-box h2 {
  font-size: 1rem;
  font-weight: 700;
  color:  #397D79;
  margin-bottom: 0;
}
.advice-icon {
  width: 24px;   
  height: 24px;
  object-fit: contain;
}
.advice-box p {
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color : #397D79;
}
.advice-title-wrapper {
  display: flex;
  align-items: flex-end; 
  justify-content: center;
  gap: 1rem;
}
.advice-buttons {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
}
/* Menggunakan BaseButton, tapi kita atur widthnya */
.advice-buttons > :deep(.base-button) {
  flex: 1;
  max-width: 180px;
}
</style>