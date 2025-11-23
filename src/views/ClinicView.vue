<template>
  <div class="page-container">
    <main class="content-wrapper">
      <section class="clinic-header">
        <span class="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 21.5V17"></path><path d="M12 17a4 4 0 0 1 0-8c0-3.3 2.7-6 6-6s6 2.7 6 6v.5"></path><path d="M12 17a4 4 0 0 0 0-8c0-3.3-2.7-6-6-6S0 5.7 0 9v.5"></path><path d="M22 17H2c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>
          </svg>
        </span>
        <h2>Klinik Hewan Terdekat</h2>
        <p>
          Temukan klinik hewan terdekat untuk perawatan darurat atau rutin. 
          Semua klinik mitra telah terverifikasi dan siap membantu kucing Anda 24/7.
        </p>
      </section>
      <div class="search-section">
        <div class="search-bar">
          <input type="text" placeholder="Cari kasus darurat, layanan, atau lokasi..." class="search-input">
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <button class="filter-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 21v-7"></path><path d="M4 10V3"></path><path d="M12 21v-9"></path><path d="M12 8V3"></path><path d="M20 21v-5"></path><path d="M20 12V3"></path><path d="M1 14h6"></path><path d="M9 8h6"></path><path d="M17 16h6"></path>
          </svg>
        </button>
      </div>
      <div class="filter-tags">
        <span class="tag-item tag-active">Emergency</span>
        <span class="tag-item">Vaksinasi</span>
        <span class="tag-item">Rawat Inap</span>
      </div>
      <h3 class="list-title">Klinik Terdekat Dari Lokasi Anda</h3>
      <div class="clinic-cards-grid">
        <ShelterCard v-for="(clinic, index) in clinics" :key="index" :shelter="clinic" :is-clinic="true" />
      </div>
      <section class="clinic-footer-cta">
        <h2 class="footer-cta-title">Klinik Anda Ingin Bergabung?</h2>
        <p class="footer-cta-subtitle">Bergabunglah dengan jaringan klinik mitra PeduliKucing dan bantu lebih banyak kucing mendapat perawatan terbaik di seluruh Indonesia.</p>
        <button class="cta-button-clinic">Daftar Sebagai Klinik Mitra</button>
      </section>
    </main>
  </div>
</template>
<script>
import ShelterCard from '../components/ShelterCard.vue'; 
export default {
  name: 'ClinicView',
  components: {
    ShelterCard
  },
  data() {
    return {
      clinics: [
        {
          name: 'Klinik Hewan Sehat Sentosa',
          location: 'Jakarta Barat (0.4 km)',
          image: '/src/assets/cats/shelter-1.png',
          description: 'Shelter terpercaya dengan fokus pada sterilisasi massal dan program adopsi yang bertanggung jawab.',
          stats: { rescued: '2,000', operational: '15' },
          specialties: ['Sterilisasi', 'Vaksinasi', 'Rawat Inap'],
          contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
        },
        {
          name: 'Klinik Hewan Sehat Sentosa',
          location: 'Jakarta Barat (0.6 km)',
          image: '/src/assets/cats/shelter-2.png',
          description: 'Shelter terpercaya dengan fokus pada sterilisasi massal dan program adopsi yang bertanggung jawab.',
          stats: { rescued: '2,000', operational: '15' },
          specialties: ['Emergency', 'Vaksinasi', 'Rawat Inap'],
          contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
        },
        {
          name: 'Klinik Hewan Sehat Sentosa',
          location: 'Jakarta Barat (0.8 km)',
          image: '/src/assets/cats/shelter-3.png',
          description: 'Shelter terpercaya dengan fokus pada sterilisasi massal dan program adopsi yang bertanggung jawab.',
          stats: { rescued: '2,000', operational: '15' },
          specialties: ['Emergency', 'Vaksinasi', 'Rawat Inap'],
          contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
        },
        {
          name: 'Klinik Hewan Sehat Sentosa',
          location: 'Jakarta Barat (0.8 km)',
          image: '/src/assets/cats/shelter-4.png',
          description: 'Shelter terpercaya dengan fokus pada sterilisasi massal dan program adopsi yang bertanggung jawab.',
          stats: { rescued: '2,000', operational: '15' },
          specialties: ['Sterilisasi', 'Rawat Inap'],
          contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
        },
        {
          name: 'Klinik Hewan Sehat Sentosa',
          location: 'Jakarta Barat (0.8 km)',
          image: '/src/assets/cats/shelter-5.png',
          description: 'Shelter terpercaya dengan fokus pada sterilisasi massal dan program adopsi yang bertanggung jawab.',
          stats: { rescued: '2,000', operational: '15' },
          specialties: ['Vaksinasi', 'Rawat Inap'],
          contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
        },
      ]
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@700&display=swap');
:root {
  --primary-color: #0b4f4a;
  --bg-color-light: #f8f9fa;
  --text-color: #2d2d2d;
  --text-color-secondary: #555;
}
.page-container {
  background-color: white; 
  min-height: 100vh;
}
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
.clinic-header {
  text-align: center;
  max-width: 700px;
  margin: 1rem auto 1.5rem auto;
}
.header-icon {
  display: inline-block;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}
.clinic-header h2 {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
}
.clinic-header p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
}
.search-section {
  display: flex;
  gap: 0.75rem;
  max-width: 700px;
  margin: 0 auto 1rem auto;
}
.search-bar {
  flex-grow: 1;
  position: relative;
}
.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem; 
  border: 1px solid #ddd;
  border-radius: 999px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
}
.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color);
}
.search-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 48px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color);
}
.filter-button {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-button:hover {
  background-color: #f0fafa;
}
.filter-tags {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
}
.tag-item {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background-color: #f0f0f0;
  color: #555;
  cursor: pointer;
}
.tag-active {
  background-color: var(--primary-color);
  color: white;
}
.list-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}
.clinic-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-bottom: 3rem;
}
@media (min-width: 600px) {
  .clinic-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .clinic-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.clinic-footer-cta {
  background-color: var(--primary-color);
  color: white;
  border-radius: 1rem;
  padding: 3rem 1.5rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.footer-cta-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}
.footer-cta-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0.75rem auto 2rem auto;
}
.cta-button-clinic {
  background-color: white;
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 5px 10px rgba(255, 255, 255, 0.3);
}
.cta-button-clinic:hover {
  background-color: #f0f0f0;
}
</style>