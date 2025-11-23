<template>
  <div class="footer">
    <div class="footer-item">
      <img src="../assets/Cepat.png" alt="Cepat & Terhubung" class="footer-icon" />
      <span>Cepat & Terhubung</span>
    </div>
    <div class="footer-item">
      <img src="../assets/Terverifikasi.png" alt="Terverifikasi & Aman" class="footer-icon" />
      <span>Terverifikasi & Aman</span>
    </div>
    <div class="footer-item">
      <img src="../assets/Transparan.png" alt="Transparan & Berdampak" class="footer-icon" />
      <span>Transparan & Berdampak</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  padding : 3rem;
  background-color: #fff;
  font-family: 'Source Serif Pro', serif;
}
.footer-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
}
.footer-icon {
  width: 25px;
  height: 25px;
  object-fit: contain;
}
</style>
