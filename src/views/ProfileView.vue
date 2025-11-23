<template>
  <div class="page-container">
    
    <div class="content-wrapper">
      <div class="profile-header-card">
        <div class="profile-info">
          <img :src="user.avatar" alt="Avatar" class="profile-avatar">
          <div class="profile-text">
            <h1 class="profile-name">{{ user.name }}</h1>
            <p class="profile-email">{{ user.email }}</p>
            <p class="profile-joined">Bergabung sejak Januari 2024</p>
          </div>
        </div>
        <button class="btn-edit" @click="$router.push('/profile/edit')">Edit Profil</button>
      </div>

      <div class="profile-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'history' }]"
          @click="activeTab = 'history'"
        >
          Riwayat Adopsi
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'favorites' }]"
          @click="activeTab = 'favorites'"
        >
          Kucing Disukai
        </button>
      </div>

      <div v-if="activeTab === 'history'" class="tab-content">
        <div v-if="adoptionHistory.length > 0" class="history-list">
          <div v-for="item in adoptionHistory" :key="item.id" class="history-card">
            <img :src="item.image" class="history-img">
            <div class="history-details">
              <div class="history-top">
                <h3>{{ item.catName }}</h3>
                <span :class="['status-badge', item.statusColor]">{{ item.status }}</span>
              </div>
              <p class="shelter-name"><i class="fas fa-home"></i> {{ item.shelter }}</p>
              <p class="date-text">Diajukan pada: {{ item.date }}</p>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>Belum ada riwayat adopsi.</p>
        </div>
      </div>

      <div v-if="activeTab === 'favorites'" class="tab-content">
        <div class="cat-grid">
          <CatCard 
            v-for="cat in favoriteCats" 
            :key="cat.id"
            v-bind="cat"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import CatCard from '../components/CatCard.vue'
import { authStore } from '../store/authStore.js' // Ambil data user dari store

const user = authStore.user || {
  name: 'Guest',
  email: 'guest@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Guest&background=0b4f4a&color=fff'
}

const activeTab = ref('history')

// Dummy Data Riwayat
const adoptionHistory = ref([
  {
    id: 1,
    catName: 'Bella',
    shelter: 'Rumah Kucing Jakarta',
    date: '20 Nov 2024',
    status: 'Menunggu Review',
    statusColor: 'status-pending', // css class
    image: '/src/assets/cats/bella-1.png'
  },
  {
    id: 2,
    catName: 'Milo',
    shelter: 'Klinik Hewan Sehat',
    date: '15 Okt 2024',
    status: 'Berhasil Diadopsi',
    statusColor: 'status-success',
    image: '/src/assets/cats/milo.png'
  }
])

// Dummy Data Favorit (Struktur sama dengan props CatCard)
const favoriteCats = ref([
  { 
    id: 4, 
    name: 'Toby', 
    image: '/src/assets/cats/toby.png', 
    age: 0.5, 
    location: 'Jakarta Selatan', 
    gender: 'Jantan', 
    description: 'Anak kucing yang sangat aktif.', 
    karakter: ['Aktif', 'Manja'], 
    steril: false, 
    vaksin: true 
  },
  { 
    id: 1, 
    name: 'Lana', 
    image: '/src/assets/cats/lana.png', 
    age: 2, 
    location: 'Jakarta Selatan', 
    gender: 'Betina', 
    description: 'Cantik yang sangat manja.', 
    karakter: ['Manja', 'Tenang'], 
    steril: true, 
    vaksin: true 
  }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@600;700&display=swap');

.page-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* HEADER CARD */
.profile-header-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  margin-bottom: 2rem;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e0f2f1;
}

.profile-name {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0 0 0.2rem 0;
}

.profile-email {
  color: #666;
  font-size: 0.95rem;
  margin: 0 0 0.5rem 0;
}

.profile-joined {
  color: #aaa;
  font-size: 0.85rem;
  margin: 0;
}

.btn-edit {
  background: white;
  border: 1px solid #ddd;
  padding: 0.6rem 1.2rem;
  border-radius: 99px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-edit:hover {
  background: #f9f9f9;
  border-color: #ccc;
}

/* TABS */
.profile-tabs {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem 0.5rem;
  font-size: 1rem;
  color: #888;
  cursor: pointer;
  position: relative;
  font-weight: 500;
}

.tab-btn.active {
  color: #0b4f4a;
  font-weight: 700;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #0b4f4a;
  border-radius: 3px 3px 0 0;
}

/* HISTORY LIST */
.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  border: 1px solid #f0f0f0;
}

.history-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.history-details {
  flex: 1;
}

.history-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.history-top h3 {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.2rem;
  margin: 0;
  color: #2d2d2d;
}

.status-badge {
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 600;
}

.status-pending {
  background-color: #fff7ed;
  color: #c2410c;
}

.status-success {
  background-color: #ecfdf5;
  color: #047857;
}

.shelter-name {
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 0.3rem 0;
}

.date-text {
  font-size: 0.8rem;
  color: #999;
  margin: 0;
}

/* CAT GRID (Favorites) */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-header-card {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  .profile-info {
    flex-direction: column;
  }
  .history-card {
    flex-direction: column;
    text-align: center;
  }
  .history-top {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>