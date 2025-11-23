<template>
  <div class="page-container">
    <main class="content-wrapper">
      <section class="page-header">
        <span class="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="3"></circle>
          </svg>
        </span>
        <h2>Klinik Hewan Terdekat</h2>
        <p>
          Temukan klinik hewan yang siap menangani kebutuhan kucing darurat atau rutin. 
          Semua klinik mitra telah terverifikasi.
        </p>
      </section>

      <div class="search-filter-bar">
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Cari klinik atau lokasi..."
            v-model="searchTerm" 
          >
        </div>
        <button class="filter-button" @click="isFilterOpen = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>

      <div v-if="isFilterOpen" class="filter-modal-overlay" @click="isFilterOpen = false">
        <div class="filter-modal" @click.stop>
          <div class="modal-header">
            <h4>Filter Klinik</h4>
            <button class="close-btn" @click="isFilterOpen = false">×</button>
          </div>
          
          <div class="filter-body">
            <div class="filter-group">
              <label>Urutkan Jarak</label>
              <div class="select-wrapper">
                <select v-model="filters.sort">
                  <option value="terdekat">Paling Dekat</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>

            <div class="filter-group">
              <label>Layanan Khusus</label>
              <div class="radio-chips">
                <label class="chip">
                  <input type="radio" value="semua" v-model="filters.service" name="service">
                  <span>Semua</span>
                </label>
                <label class="chip">
                  <input type="radio" value="Emergency" v-model="filters.service" name="service">
                  <span>Emergency 24 Jam</span>
                </label>
                <label class="chip">
                  <input type="radio" value="Rawat Inap" v-model="filters.service" name="service">
                  <span>Rawat Inap</span>
                </label>
                <label class="chip">
                  <input type="radio" value="Sterilisasi" v-model="filters.service" name="service">
                  <span>Sterilisasi</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label>Status Operasional</label>
              <div class="radio-chips">
                <label class="chip">
                  <input type="radio" value="semua" v-model="filters.status" name="status">
                  <span>Semua</span>
                </label>
                <label class="chip">
                  <input type="radio" value="buka" v-model="filters.status" name="status">
                  <span>Buka Sekarang</span>
                </label>
              </div>
            </div>
          </div>

          <div class="filter-actions">
            <button class="btn-reset" @click="resetFilters">Reset</button>
            <button class="btn-apply" @click="isFilterOpen = false">Terapkan</button>
          </div>
        </div>
      </div>

      <h3 class="list-heading">Hasil Pencarian</h3>
      
      <div class="clinic-cards-grid">
        <ShelterCard 
          v-for="(clinic, index) in filteredClinics" 
          :key="index" 
          :shelter="clinic"
          :is-clinic="true" 
        />
        <p v-if="filteredClinics.length === 0" class="no-results-msg">
          Tidak ada klinik yang ditemukan dengan filter tersebut.
        </p>
      </div>

      <section class="clinic-cta-footer">
        <h3>Klinik Anda Ingin Bergabung?</h3>
        <p>Bergabunglah dengan jaringan klinik mitra PeduliKucing dan bantu lebih banyak kucing.</p>
        <button class="cta-button-clinic">Daftar Sebagai Klinik Mitra</button>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import ShelterCard from '../components/ShelterCard.vue';

const CLINICS_DATA = [
    {
      name: 'Klinik Hewan Sehat Sentosa',
      location: 'Jakarta Barat (0.4 km)',
      image: '/src/assets/cats/shelter-1.png',
      description: 'Layanan lengkap 24 jam.',
      stats: { rescued: '2,000', operational: '15' },
      specialties: [],
      services: ['Emergency', 'Vaksinasi', 'Rawat Inap'],
      contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
    },
    {
      name: 'Klinik Hewan Murni Cipta',
      location: 'Jakarta Selatan (1.2 km)',
      image: '/src/assets/cats/shelter-2.png',
      description: 'Spesialis bedah dan rawat inap.',
      stats: { rescued: '1,500', operational: '8' },
      specialties: [],
      services: ['Vaksinasi', 'Rawat Inap', 'Sterilisasi'],
      contact: { phone: '+62 812-1111-2222', email: 'murni@klinik.com' }
    },
    {
      name: 'Klinik Hewan Bahagia',
      location: 'Tangerang Kota (3.5 km)',
      image: '/src/assets/cats/shelter-3.png',
      description: 'Perawatan preventif dan gigi.',
      stats: { rescued: '3,000', operational: '20' },
      specialties: [],
      services: ['Emergency', 'Rawat Inap'],
      contact: { phone: '+62 819-3333-4444', email: 'bahagia@klinik.com' }
    },
];

const allClinics = ref(CLINICS_DATA);
const searchTerm = ref('');
const isFilterOpen = ref(false);

const filters = reactive({
  sort: 'terdekat',
  service: 'semua',
  status: 'semua'
});

const resetFilters = () => {
  filters.sort = 'terdekat';
  filters.service = 'semua';
  filters.status = 'semua';
};

const filteredClinics = computed(() => {
    let result = allClinics.value;

    // Filter Search
    if (searchTerm.value) {
        const query = searchTerm.value.toLowerCase();
        result = result.filter(clinic => 
            clinic.name.toLowerCase().includes(query) || 
            clinic.location.toLowerCase().includes(query)
        );
    }

    // Filter Service (Logika dummy: cek array services)
    if (filters.service !== 'semua') {
        result = result.filter(clinic => 
            clinic.services.includes(filters.service)
        );
    }

    return result;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@600;700&display=swap');

.page-container {
  background-color: #f8f9fa;
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
  margin: 1rem auto 2rem auto;
}
.header-icon {
  display: inline-block;
  color: #0b4f4a;
  margin-bottom: 1rem;
}
.page-header h2 {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0 0 1rem 0;
}
.page-header p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

/* --- SEARCH FILTER BAR (Sama dengan DonationPage) --- */
.search-filter-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
}
.search-box {
  display: flex;
  align-items: center;
  padding: 0 16px; 
  width: 100%;
  max-width: 450px; 
  background-color: white; 
  border-radius: 99px; 
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}
.search-box input {
  border: none; 
  outline: none;
  width: 100%;
  font-size: 1rem;
  padding: 12px 0; 
  background-color: transparent; 
  margin-left: 10px;
  font-family: 'Inter', sans-serif;
}
.filter-button {
  background: white; 
  border: 1px solid #ddd; 
  border-radius: 50%; 
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex; 
  align-items: center;
  justify-content: center;
  color: #0b4f4a;
  transition: all 0.2s;
}
.filter-button:hover {
  background-color: #f0fafa;
  border-color: #0b4f4a;
}

/* --- MODAL STYLES --- */
.filter-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}
.filter-modal {
  background-color: white;
  width: 90%;
  max-width: 400px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
}
.modal-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d2d2d;
  font-family: 'Inter', sans-serif;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
  line-height: 1;
}
.filter-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.filter-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
  font-family: 'Inter', sans-serif;
}
.select-wrapper select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  background-color: #fff;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
}
.radio-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip input { display: none; }
.chip span {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 99px;
  border: 1px solid #ddd;
  font-size: 0.85rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}
.chip input:checked + span {
  background-color: #e0f2f1;
  border-color: #0b4f4a;
  color: #0b4f4a;
  font-weight: 600;
}
.filter-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.btn-reset {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: white;
  color: #666;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.btn-apply {
  flex: 2;
  padding: 10px;
  background-color: #0b4f4a;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* --- GRID & CONTENT --- */
.list-heading {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0 0 1.5rem 0;
}
.clinic-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .clinic-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.no-results-msg {
    grid-column: 1 / -1;
    text-align: center;
    color: #555;
    padding: 2rem 0;
}
.clinic-cta-footer {
  background-color: #0b4f4a;
  color: white;
  border-radius: 1rem;
  padding: 3rem 1.5rem;
  text-align: center;
}
.clinic-cta-footer h3 {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}
.clinic-cta-footer p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0.75rem auto 2.5rem auto;
}
.cta-button-clinic {
  background-color: white;
  color: #0b4f4a;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(255, 255, 255, 0.3);
}
</style>