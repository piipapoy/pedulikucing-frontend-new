<template>
  <div class="page-container">
    <main class="content-wrapper">
      
      <div class="back-link">
        <router-link to="/donasi">
          ← Kembali ke Halaman Donasi
        </router-link>
      </div>

      <div v-if="donation" class="layout-grid">
        
        <div class="column-left">
          <div class="info-card">
            
            <div class="card-header-section">
              <h1 class="donation-title">{{ donation.title }}</h1>
              
              <div class="tag-wrapper" v-if="donation.gender">
                <span class="tag-gender">{{ donation.gender }}</span>
              </div>
            </div>
            
            <div class="info-meta" v-if="donation.type !== 'program'">
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {{ donation.age }}
              </span>
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
                {{ donation.location }}
              </span>
            </div>

            <div class="button-group">
              <BaseButton @click="openDonationModal" variant="default">Bantu Sekarang</BaseButton>
              <BaseButton variant="outline" @click="handleContact">Hubungi Penggalang</BaseButton>
            </div>
          </div>

          <div class="info-card">
            <h3 class="card-title">
              Donasi Terkumpul <span class="donasi-count">{{ donation.donors.length }}</span>
            </h3>
            <ul class="donasi-list">
              <li v-for="donor in donation.donors" :key="donor.id">
                <div class="donor-row">
                  <strong>{{ donor.name }}</strong>
                  <span class="donor-amount">{{ formatCurrency(donor.amount) }}</span>
                </div>
                <span class="donor-msg">Berdonasi untuk membantu kesembuhan.</span>
              </li>
            </ul>
          </div>

          <div class="info-card">
            <h3 class="card-title">Informasi Penggalang</h3>
            <p class="shelter-name">{{ donation.fundraiser.name }}</p>
            <p class="shelter-info">{{ donation.fundraiser.role }}</p>
            <p class="shelter-info">{{ donation.fundraiser.address }}</p>
            <p class="shelter-phone">{{ donation.fundraiser.phone }}</p>
          </div>
        </div>

        <div class="column-right">
          <div class="info-card no-padding">
            <ImageGallery :images="donation.thumbnails" />
          </div>

          <div class="info-card">
            <div class="story-header">
              <h3 class="card-title">Cerita Penggalangan Dana</h3>
              <span class="story-date">{{ donation.storyDate }}</span>
            </div>
            <p class="story-text">
              {{ donation.story }}
            </p>
          </div>
        </div>

      </div>
      
      <div v-else class="loading-state">
        <p>Loading data donasi...</p>
      </div>

    </main>
    
    <DonationModal v-if="donationModalStore.isOpen" /> 
    
    <LoginRequiredDonationModal 
      :show="showLoginModal" 
      @close="showLoginModal = false" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '../components/BaseButton.vue';
import ImageGallery from '../components/ImageGallery.vue'; 
import DonationModal from '../components/DonationModal.vue';
// Import modal baru
import LoginRequiredDonationModal from '../components/LoginRequiredDonationModal.vue';
import { donationModalStore } from '../store/donationModalStore.js'; 
import { authStore } from '../store/authStore.js';
import { chatStore } from '../store/chatStore.js';

const route = useRoute();
const showLoginModal = ref(false); 

// DATA DUMMY
const DUMMY_DATA = {
    id: 1, 
    title: 'Biaya Operasi Kucing Tertabrak di Bawah Flyover', 
    type: 'kasus', 
    gender: 'Jantan', 
    age: '2 Tahun', 
    location: 'Bandung Kota',
    imageUrl: '/src/assets/cats/kucing_detail_1.png', 
    thumbnails: [
      '/src/assets/cats/kucing_detail_1.png', 
      '/src/assets/cats/kucing_detail_2.png'
    ],
    storyDate: '3 Hari yang lalu',
    story: 'Kucing ini ditemukan dalam kondisi kritis di bawah flyover. Kaki belakangnya patah parah dan membutuhkan operasi segera. Dana ini akan digunakan untuk operasi, rawat inap, dan biaya pasca operasi selama 2 bulan. Mohon bantuan dan doa dari rekan-rekan semua.',
    donors: [
        { id: 1, name: 'Sumbang Anonim', amount: 150000 },
        { id: 2, name: 'Maya', amount: 50000 },
        { id: 3, name: 'Budi', amount: 200000 },
        { id: 4, name: 'Citra', amount: 100000 },
        { id: 5, name: 'Doni', amount: 25000 },
    ],
    fundraiser: {
        name: 'Dr. Sarah Veteriner',
        role: 'Veterinarian',
        address: 'Jl. Kemang Raya No. 123, Jakarta Selatan',
        phone: '+62 812-3456-7890'
    }
};

const donation = ref(null);

onMounted(() => {
    donation.value = DUMMY_DATA; 
});

const formatCurrency = (value) => {
  if (!value) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};

const openDonationModal = () => {
    donationModalStore.open(donation.value);
};

const handleContact = () => {
  if (!authStore.isAuthenticated) {
    showLoginModal.value = true;
  } else {
    chatStore.openChat({
      id: 99,
      name: donation.value.fundraiser.name,
      avatar: '/src/assets/cats/shelter-placeholder.jpg'
    });
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Source+Serif+Pro:wght@600;700&display=swap');

.page-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Source Serif Pro', serif;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.back-link {
  font-family: 'Inter', sans-serif;
  margin-bottom: 1.5rem;
}
.back-link a {
  text-decoration: none;
  color: #0b4f4a;
  font-weight: 500;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.back-link a:hover {
  text-decoration: underline;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .layout-grid {
    grid-template-columns: 1fr 1.5fr;
    align-items: start;
  }
}

.column-left, .column-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* CARD STYLES */
.info-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.info-card.no-padding {
  padding: 0;
  overflow: hidden;
  border: none;
  background: transparent;
  box-shadow: none;
}

/* --- HEADER SECTION --- */
.card-header-section {
  margin-bottom: 1.5rem;
}

.donation-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0 0 0.8rem 0;
  line-height: 1.3;
}

.tag-wrapper {
  display: flex;
}

.tag-gender {
  display: inline-block;
  background-color: #baeae7;
  color: #0b4f4a;
  padding: 0.3rem 0.8rem;
  border-radius: 99px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
}

/* --- META INFO --- */
.info-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  font-family: 'Inter', sans-serif;
  color: #666;
  font-size: 0.95rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-item svg {
  color: #0b4f4a;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

/* Donatur List */
.card-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0 0 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.donasi-count {
  background-color: #e0f2f1;
  color: #0b4f4a;
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
}

.donasi-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  
  scrollbar-width: thin;
  scrollbar-color: #ccc #f9f9f9;
}

.donasi-list::-webkit-scrollbar {
  width: 6px;
}
.donasi-list::-webkit-scrollbar-track {
  background: #f9f9f9;
}
.donasi-list::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.donasi-list li {
  padding: 0.8rem 0;
  border-bottom: 1px dashed #eee;
}
.donasi-list li:last-child {
  border-bottom: none;
}

.donor-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}

.donor-msg {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #888;
}

.donor-amount {
  font-weight: 600;
  color: #0b4f4a;
}

/* Info Penggalang */
.shelter-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  margin: 0 0 0.2rem;
  color: #333;
}
.shelter-info {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}
.shelter-phone {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #0b4f4a;
  font-weight: 600;
  margin-top: 0.5rem;
}

/* Cerita */
.story-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.story-date {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #888;
}
.story-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin: 0;
}
</style>