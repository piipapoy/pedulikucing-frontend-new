<template>
  <div class="page-container">
    <main class="content-wrapper">
      <section class="page-header">
        <span class="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path>
          </svg>
        </span>
        <h2>Bergabung Sebagai Bagian Komunitas</h2>
        <p>
          Bukan hanya donasi, Anda juga bisa berkontribusi langsung sebagai foster parent 
          atau bergabung sebagai shelter mitra dalam ekosistem penyelamatan kucing.
        </p>
      </section>
      <div class="tab-buttons">
        <button 
          :class="['tab-button', { active: activeTab === 'foster' }]"
          @click="activeTab = 'foster'"
        >
          Jadi Foster Parent
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'shelter' }]"
          @click="activeTab = 'shelter'"
        >
          Shelter & Klinik Mitra
        </button>
      </div>
      <div class="tab-content">
        <div v-if="activeTab === 'foster'" class="foster-content">
          <section class="hero-foster">
            <div class="hero-foster-text">
              <h2>Jadi Foster Parent, Selamatkan Nyawa</h2>
              <p>
                Foster parent adalah pahlawan tanpa tanda jasa. Anda memberikan 
                rumah dan kasih sayang sementara untuk kucing dalam proses 
                penyembuhan atau menunggu adopsi.
              </p>
              <ul class="hero-list">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Berikan rumah sementara yang penuh kasih
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path>
                  </svg>
                  Bantu proses sosialisasi dan pemulihan
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Berikan rumah sementara yang penuh kasih
                </li>
              </ul>
            </div>
            <div class="hero-foster-image">
              <img src="/src/assets/cats/foster-hero.png" alt="Kucing di tangan foster parent">
            </div>
          </section>
          <section class="info-grid">
            <div class="info-column">
              <h3 class="info-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path>
                </svg>
                Syarat Menjadi Foster Parent
              </h3>
              <ul class="info-list">
                <li>Memiliki tempat tinggal yang aman dan nyaman untuk kucing.</li>
                <li>Bersedia merawat kucing selama 2-12 minggu (fleksibel).</li>
                <li>Dapat memberikan cinta, perhatian, dan perawatan dasar.</li>
                <li>Bersedia berkomunikasi rutin dengan tim rescue.</li>
                <li>Memiliki akses ke transportasi untuk ke klinik jika diperlukan.</li>
              </ul>
              <div class="note-wrapper"> 
                <strong>Catatan:</strong> Semua biaya medis dan pakan akan ditanggung oleh shelter. Anda hanya perlu memberikan tempat tinggal dan kasih sayang.
              </div>
            </div>
            <div class="info-column">
              <h3 class="info-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Manfaat Menjadi Foster
              </h3>
              <ul class="info-list">
                <li>Merasakan kebahagiaan menyelamatkan nyawa secara langsung.</li>
                <li>Membantu kucing belajar hidup di lingkungan rumah.</li>
                <li>Mendapat dukungan penuh dari tim medis dan komunitas.</li>
                <li>Kesempatan prioritas jika ingin mengadopsi kucing foster.</li>
                <li>Menjadi bagian dari komunitas penyelamat kucing se-Indonesia.</li>
              </ul>
              <div class="testimonial-wrapper">
                "Menjadi foster parent memberikan saya pelajaran berharga. Melihat kucing yang dulu ketakutan berubah jadi penyayang adalah bayaran terbesarnya."
                <br>
                <strong>- Maya, Foster Parent Jakarta</strong>
              </div>
            </div>
          </section>
          <FosterForm />
        </div>
        <div v-else class="shelter-content">
          <h3 class="shelter-list-title">Shelter & Klinik Mitra Terpercaya</h3>
          <p class="shelter-list-description">
            Jaringan shelter dan klinik mitra PeduliKucing yang telah terverifikasi dan terpercaya dalam menyelamatkan kucing di seluruh Indonesia.
          </p>
          <div class="shelter-cards-grid">
            <ShelterCard 
              v-for="(shelter, index) in shelters" 
              :key="index" 
              :shelter="shelter" 
              :is-clinic="true"
            />
          </div>
          <div class="shelter-cta-wrapper">
            <button class="cta-button-shelter">Daftar Sebagai Shelter Mitra</button>
          </div>
          <section class="shelter-footer">
            <h2 class="footer-title">Daftarkan Shelter Anda Sebagai Mitra</h2>
            <p class="footer-subtitle">Bergabung dengan jaringan PeduliKucing dan dapatkan akses ke donatur, volunteer, dan sistem terintegrasi untuk memaksimalkan impact penyelamatan.</p>
            <div class="footer-access-grid">
              <div class="access-item">
                <span class="access-icon">
                  <img src="/src/assets/Akses-donatur.png" alt="Akses Donatur" class="icon-png">
                </span>
                <h3>Akses Donatur</h3>
                <p>Terhubung langsung dengan ribuan donatur aktif</p>
              </div>
              <div class="access-item">
                <span class="access-icon">
                  <img src="/src/assets/Terintegrasi.png" alt="Terintegrasi" class="icon-png">
                </span>
                <h3>Terintegrasi</h3>
                <p>Manajemen kucing, adopsi, dan donasi dalam satu platform</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import FosterForm from '../components/FosterForm.vue'
import ShelterCard from '../components/ShelterCard.vue' 
export default {
  name: 'CommunityView',
  components: {
    FosterForm,
    ShelterCard 
  },
  data() {
    return {
      activeTab: 'foster', 
      shelters: [
        {
          name: 'Rescue Kucing Jakarta',
          location: 'Jakarta Barat',
          image: '/src/assets/cats/shelter-1.png',
          description: 'Shelter terpercaya dengan fokus pada kesehatan dan program adopsi yang bertanggung jawab.',
          stats: { rescued: '2,000', operational: '15' },
          services: ['Sterilisasi Massal', 'Perawatan Medis', 'Program Adopsi'],
          contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
        },
        {
          name: 'Rescue Kucing Jakarta',
          location: 'Jakarta Barat',
          image: '/src/assets/cats/shelter-2.png',
          description: 'Shelter terpercaya dengan fokus pada kesehatan dan program adopsi yang bertanggung jawab.',
          stats: { rescued: '2,000', operational: '15' },
          services: ['Sterilisasi Massal', 'Perawatan Medis'],
          contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
        },
        {
          name: 'Rescue Kucing Jakarta',
          location: 'Jakarta Barat',
          image: '/src/assets/cats/shelter-3.png',
          description: 'Shelter terpercaya dengan fokus pada kesehatan dan program adopsi yang bertanggung jawab.',
          stats: { rescued: '2,000', operational: '15' },
          services: ['Sterilisasi Massal', 'Perawatan Medis'],
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
  --border-color: #e0e0e0;
  --accent-color-light: #e0f2f1;
}
.page-container {
  background-color: var(--bg-color-light);
  min-height: 100vh;
}
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
.page-header {
  text-align: center;
  max-width: 800px;
  margin: 1rem auto 2.5rem auto;
}
.header-icon {
  display: inline-block;
  color: var(--primary-color);
  margin-bottom: 1rem;
}
.page-header h2 {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 1rem 0;
}
.page-header p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
}
.tab-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
  background-color: white;
  border-radius: 999px;
  padding: 0.3rem;
  box-shadow: 0 8px 8px rgba(0,0,0,0.1);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.tab-button {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tab-button.active {
  background-color: var(--primary-color);
  color: white;
}
.tab-button:not(.active) {
  background-color: transparent;
  color: var(--primary-color);
}
.tab-button:not(.active):hover {
  background-color: #f0fafa;
}
.hero-foster {
  background-color: var(--primary-color);
  color: white;
  border-radius: 1.5rem; 
  padding: 2rem; 
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; 
  align-items: start; 
  margin-bottom: 1.5rem;
}
@media (min-width: 768px) {
  .hero-foster {
    grid-template-columns: 1.5fr 1fr;
    padding: 2.5rem 3rem; 
    gap: 2.5rem;
  }
}
.hero-foster-text h2 {
  font-family: 'Source Serif Pro', serif;
  font-size: 2.5rem; 
  font-weight: 700;
  line-height: 1.2; 
}
.hero-foster-text p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 1.5rem; 
}
.hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem; 
}
.hero-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
}
.hero-list li svg {
  flex-shrink: 0;
}
.hero-foster-image {
  border-radius: 1rem; 
  overflow: hidden;
}
.hero-foster-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 0;
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
.info-column {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.info-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 1.5rem 0;
}
.info-title svg {
  color: var(--primary-color);
  flex-shrink: 0;
}
.info-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
}
.info-list li {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
  position: relative;
  padding-left: 1.5rem;
}
.info-list li::before {
  content: '';
  width: 8px;
  height: 8px;
  background-color: var(--primary-color);
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0.6em;
  transform: translateY(-50%);
}
.note-wrapper {
  background-color: #e0f2f1;
  border-radius: 0.75rem;
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
  margin-top: 2rem;
}
.note-wrapper strong {
  font-weight: 700;
  color: var(--primary-color);
  display: inline;
  margin-right: 0.5em;
}
.testimonial-wrapper {
  background-color: #e0f2f1;
  border-radius: 0.75rem;
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.6;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.testimonial-wrapper strong {
  font-weight: 700;
  color: var(--primary-color);
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 0;
}
.shelter-list-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  text-align: center;
  margin: 0 auto 0.75rem auto;
}
.shelter-list-description {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem auto;
}
.shelter-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .shelter-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.shelter-cta-wrapper {
  text-align: center;
  margin-bottom: 3rem;
}
.cta-button-shelter {
  background-color: var(--primary-color);
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 5px 10px rgba(11, 79, 74, 0.3);
}
.cta-button-shelter:hover {
  background-color: #083b37;
}
.shelter-footer {
  background-color: var(--primary-color);
  color: white;
  border-radius: 1rem; 
  padding: 3rem; 
  text-align: center;
}
.footer-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.75rem; 
  font-weight: 700;
  margin: 0;
}
.footer-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem; 
  opacity: 0.9;
  max-width: 700px;
  margin: 0.75rem auto 2.5rem auto; 
}
.footer-access-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; 
  padding-top: 1rem;
}
@media (min-width: 600px) {
  .footer-access-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem; 
    max-width: 600px; 
    margin: 0 auto; 
  }
}
.access-item {
  background-color: rgba(255, 255, 255, 0.08); 
  border-radius: 0.75rem; 
  padding: 2rem 1.5rem; 
  text-align: center;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center; 
}
.access-icon {
  display: inline-flex; 
  justify-content: center;
  align-items: center;
  width: 60px; 
  height: 60px; 
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15); 
  margin-bottom: 1rem;
  padding: 10px;
  flex-shrink: 0; 
  overflow: hidden; 
}
.access-icon .icon-png {
  width: 70%; 
  height: 70%;
  object-fit: contain; 
}
.access-item h3 {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0; 
  line-height: 1.3;
}
.access-item p {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
  line-height: 1.5;
}
</style>