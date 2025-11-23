<template>
  <main class="container">
    <section class="header-section">
      <i class="fas fa-heart header-icon"></i>
      <h2>Setiap Donasi Menyelamatkan Nyawa</h2>
      <p>Pilih cara Anda berkontribusi: bantu kasus spesifik yang butuh pertolongan segera, atau dukung program komunitas yang memberikan dampak jangka panjang.</p>
      
      <div class="search-filter-bar">
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Cari kasus darurat..."
            v-model="searchTerm" 
          >
        </div>
        <button class="filter-button" @click="isFilterOpen = !isFilterOpen">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
    </section>

    <div v-if="isFilterOpen" class="filter-modal-overlay" @click="isFilterOpen = false">
      <div class="filter-modal" @click.stop>
        <div class="modal-header">
          <h4>Filter & Urutkan</h4>
          <button class="close-btn" @click="isFilterOpen = false">×</button>
        </div>
        
        <div class="filter-body">
          <div class="filter-group">
            <label>Urutkan Berdasarkan</label>
            <div class="select-wrapper">
              <select v-model="selectedSort">
                <option value="mendesak">Paling Mendesak</option>
                <option value="terbaru">Terbaru</option>
                <option value="hampir_penuh">Hampir Penuh (Target &lt; 20%)</option>
              </select>
            </div>
          </div>

          <div class="filter-group">
            <label>Kategori Donasi</label>
            <div class="radio-chips">
              <label class="chip">
                <input type="radio" value="semua" v-model="selectedCategory" name="cat">
                <span>Semua</span>
              </label>
              <label class="chip">
                <input type="radio" value="medis" v-model="selectedCategory" name="cat">
                <span>Medis</span>
              </label>
              <label class="chip">
                <input type="radio" value="pakan" v-model="selectedCategory" name="cat">
                <span>Pakan</span>
              </label>
              <label class="chip">
                <input type="radio" value="steril" v-model="selectedCategory" name="cat">
                <span>Steril</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <label>Lokasi</label>
            <div class="select-wrapper">
              <select v-model="selectedLocation">
                <option value="semua">Semua Lokasi</option>
                <option value="Jakarta Barat">Jakarta Barat</option>
                <option value="Jakarta Selatan">Jakarta Selatan</option>
                <option value="Bandung Kota">Bandung Kota</option>
                <option value="Surabaya">Surabaya</option>
              </select>
            </div>
          </div>
        </div>

        <div class="filter-actions">
          <button class="btn-reset" @click="resetFilters">
            Reset
          </button>
          <button class="btn-apply" @click="isFilterOpen = false">
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>

    <section class="donation-category">
      <h3>Kasus Darurat Membutuhkan Bantuan</h3>
      <div class="donation-grid">
        <DonationCard
          v-for="kasus in kasusDarurat"
          :key="kasus.id"
          :donation="kasus" 
        />
      </div>
    </section>

    <section class="donation-category">
      <h3>Program Komunitas Berkelanjutan</h3>
      <div class="donation-grid">
        <DonationCard
          v-for="program in programKomunitas"
          :key="program.id"
          :donation="program"
        />
      </div>
    </section>

    <section class="transparency-section">
      <h3>Transparansi Donasi Real-Time</h3>
      <p>Setiap donasi yang masuk langsung terlihat dan dapat diverifikasi oleh publik</p>
      <div class="transparency-container">
        <div class="transparency-list">
          <h4>Donasi Terbaru (Real-Time)</h4>
          <ul>
            <li v-for="donasi in recentDonations" :key="donasi.id">
              <div class="donor-info">
                <strong>{{ donasi.name }}</strong>
                <span>{{ donasi.campaign }}</span>
              </div>
              <div class="donation-amount">
                <strong>{{ formatCurrency(donasi.amount) }}</strong>
                <span>{{ donasi.time }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="transparency-summary">
          <h4>Total Impact Hari Ini</h4>
          <div class="summary-item">
            <span>Total Donasi Masuk</span>
            <strong>{{ formatCurrency(impactSummary.total) }}</strong>
          </div>
          <div class="summary-item">
            <span>Jumlah Donatur</span>
            <strong>{{ impactSummary.donors }} orang</strong>
          </div>
          <div class="summary-item">
            <span>Kasus Terbantu</span>
            <strong>{{ impactSummary.cases }} kasus</strong>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import DonationCard from '../components/DonationCard.vue';

const isFilterOpen = ref(false); 
const selectedSort = ref('mendesak');
const selectedLocation = ref('semua');
const selectedCategory = ref('semua'); // Tambahan state kategori
const searchTerm = ref('');

const resetFilters = () => {
  selectedSort.value = 'mendesak';
  selectedLocation.value = 'semua';
  selectedCategory.value = 'semua';
  // isFilterOpen.value = false; // Opsional: tutup modal atau biarkan terbuka
};

const allDonationData = [
  { id: 1, title: 'Rescue Kucing di Bawah Jembatan', type: 'kasus', location: 'Jakarta Barat', terkumpul: 1800000, target: 5000000, percentage: 36, imageUrl: '/src/assets/cats/kucing_darurat_1.png' },
  { id: 2, title: 'Biaya Operasi Kucing Tertabrak', type: 'kasus', location: 'Bandung Barat', terkumpul: 4500000, target: 7000000, percentage: 64, imageUrl: '/src/assets/cats/kucing_darurat_2.png' },
  { id: 3, title: 'Program Vaksinasi Kucing Liar', type: 'program', location: 'Jakarta', terkumpul: 9000000, target: 10000000, percentage: 90, imageUrl: '/src/assets/cats/program_vaksin.png', manfaat: 'Kekebalan Komunitas', dampak: '500+ Kucing' },
  { id: 4, title: 'Pakan Harian Shelter Induk', type: 'program', location: 'Jakarta Barat', terkumpul: 6000000, target: 15000000, percentage: 40, imageUrl: '/src/assets/cats/program_pakan.png', manfaat: 'Nutrisi Terjamin', dampak: '150 Ekor/Bulan' }
];

const filteredData = computed(() => {
  // Logika filter sederhana (bisa dikembangkan)
  let data = [...allDonationData];
  if(searchTerm.value) {
    data = data.filter(d => d.title.toLowerCase().includes(searchTerm.value.toLowerCase()));
  }
  return data;
});

const kasusDarurat = computed(() => 
  filteredData.value.filter(d => d.type === 'kasus')
);

const programKomunitas = computed(() =>
  filteredData.value.filter(d => d.type === 'program')
);

const recentDonations = ref([
  { id: 1, name: 'Azmi', campaign: 'Rescue Kucing dari Banjir', amount: 100000, time: '2 menit lalu' },
  { id: 2, name: 'Budi', campaign: 'Bantuan Pakan Shelter', amount: 50000, time: '3 menit lalu' },
  { id: 3, name: 'Citra', campaign: 'Rescue Kucing dari Banjir', amount: 200000, time: '5 menit lalu' },
  { id: 4, name: 'Doni', campaign: 'Rescue Kucing dari Banjir', amount: 25000, time: '6 menit lalu' },
]);

const impactSummary = ref({
  total: 2850000,
  donors: 47,
  cases: 8
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

/* Header Styles */
.header-section {
  text-align: center;
  margin-bottom: 40px;
}
.header-icon {
  font-size: 32px;
  color: #0b4f4a;
  margin-bottom: 10px;
}
.header-section h2 {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 10px 0;
}
.header-section p {
  font-size: 1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 20px auto;
  line-height: 1.5;
}

/* Search Bar */
.search-filter-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
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

/* --- MODAL FILTER STYLES --- */
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
}

.select-wrapper {
  position: relative;
}
.select-wrapper select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  background-color: #fff;
  appearance: none;
  cursor: pointer;
}
.select-wrapper::after {
  content: '▼';
  font-size: 0.7rem;
  color: #666;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* Radio Chips Style */
.radio-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip input {
  display: none;
}
.chip span {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 99px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.chip input:checked + span {
  background-color: #e0f2f1; /* Hijau muda */
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
.btn-apply:hover {
  background-color: #083b37;
}

/* Content Styles */
.donation-category {
  margin-bottom: 40px;
}
.donation-category h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 20px;
}
.donation-grid {
  display: flex; 
  overflow-x: auto; 
  gap: 24px; 
  padding-bottom: 20px; 
  scroll-snap-type: x mandatory;
}

/* Transparency Section */
.transparency-section {
  background-color: #f0fafa;
  border-radius: 12px;
  padding: 32px;
  margin-top: 40px;
  text-align: center;
}
.transparency-section h3 {
  font-size: 1.5rem;
  color: #0b4f4a;
  margin: 0;
}
.transparency-section p {
  color: #666;
  margin: 10px 0 30px 0;
}
.transparency-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
@media (min-width: 768px) {
  .transparency-container {
    flex-direction: row;
    text-align: left;
  }
}
.transparency-list, .transparency-summary {
  flex: 1; 
}
.transparency-list h4, .transparency-summary h4 {
  font-size: 1.1rem;
  margin: 0 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
}
.transparency-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 220px;
  overflow-y: auto;
}
.transparency-list li {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px dashed #eee;
}
.donor-info strong, .donation-amount strong {
  display: block;
  font-size: 0.95rem;
  color: #333;
}
.donor-info span, .donation-amount span {
  font-size: 0.85rem;
  color: #777;
}
.donation-amount {
  text-align: right;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 1rem;
}
.summary-item strong {
  color: #0b4f4a;
  font-size: 1.1rem;
}

/* Scrollbar Styles */
.donation-grid::-webkit-scrollbar, .transparency-list ul::-webkit-scrollbar {
  height: 6px; width: 6px;
}
.donation-grid::-webkit-scrollbar-thumb, .transparency-list ul::-webkit-scrollbar-thumb {
  background-color: #ccc; 
  border-radius: 3px;
}
</style>