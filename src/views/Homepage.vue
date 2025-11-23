<script setup>
import { useRouter } from 'vue-router'
import Footer from '../components/Footer.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()

const goToReport = () => {
  router.push('/lapor')
}

const goToClinic = () => {
  router.push('/klinik-terdekat')
}
</script>

<template>
  <div>
    <main class="hero-container">
      <div class="hero-left">
        <h1>
          Uluran tangan Anda mengubah nasib mereka di jalanan
        </h1>
        <p>
          Platform komunitas terpadu untuk melaporkan, mengadopsi, dan mendukung kucing terlantar di seluruh Indonesia.
        </p>
        <div class="hero-buttons">
          <BaseButton variant="default" class="report-btn" @click="goToReport">
            <img 
              src="../assets/LaporHomepage.png" 
              alt="Lapor Darurat"
            />
            Lapor Darurat
          </BaseButton>
          <BaseButton variant="outline" class="clinic-btn" @click="goToClinic">
            <img 
              src="../assets/LocationHomepage.png" 
              alt="Klinik Terdekat"
            />
            Klinik Terdekat
          </BaseButton>
        </div>
      </div>
      <div class="hero-right">
        <img 
          src="../assets/KucingHomepage.png" 
          alt="Kucing Oranye" 
          class="hero-cat-image" 
        />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Solway:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.hero-container {
  display: flex;
  align-items: center;
  padding: 6rem 8rem; 
  min-height: 80vh;
  position: relative;
  background-color: transparent; 
}
.hero-left {
  flex: 1; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  max-width: 500px;
}
.hero-left h1 {
  font-family: 'Solway', serif;
  font-size: 2.8rem;
  font-weight: 500;
  line-height: 1.2;
  color: #2D2D2D;
  margin-bottom: 1rem;
}
.hero-left p {
  font-family: 'Solway', serif;
  font-size: 1.1rem;
  color: #2D2D2D;
  line-height: 1.3;
  margin-bottom: 2.5rem;
}
.hero-buttons {
  display: flex;
  gap: 1rem;
}
.hero-buttons :deep(.base-button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem; 
  width: auto; 
  min-width: 180px; 
  padding: 1rem 1.8rem; 
  font-weight: 700; 
  font-family: 'Inter', sans-serif;
  border-width: 2px; 
}
.hero-buttons img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.report-btn {
  background-color: var(--primary-color, #0b4f4a);
  color: white;
}
.clinic-btn {
  border-color: #ccc; 
  color: #2D2D2D; 
}
.clinic-btn:hover {
  border-color: #2D2D2D; 
  background-color: #f5f5f5;
  color: #2D2D2D; 
}
.hero-container {
  display: flex;
  align-items: center;
  padding: 4rem 8rem; 
  min-height: 95vh;
  position: relative;
  background-color: transparent; 
  overflow: hidden;
}
.hero-right {
  position: absolute;
  top: -150px;
  right: 0; 
  width: 70%; 
  height: 100%;
}
.hero-cat-image {
  position: absolute; 
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1));
  width: 100%; 
  height: 100%;
  right: 0; 
  top: 100px;
  object-fit: contain;
}
@media (max-width: 1024px) {
  .hero-container {
    padding: 3rem 1rem;
    flex-direction: column;
    text-align: center;
  }
  .hero-left {
    max-width: 100%;
    align-items: center;
    order: 2; 
  }
  .hero-left h1, .hero-left p {
    text-align: center;
  }
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    align-items: center;
  }
  .hero-buttons :deep(.base-button) {
    width: 100%;
  }
  .hero-right {
    position: relative;
    top: auto;
    width: 100%;
    height: 300px;
    margin-bottom: 2rem;
    order: 1; 
  }
  .hero-cat-image {
    position: relative;
    top: auto;
  }
}
</style>