<template>
  <div class="page-container">
    <main class="content-wrapper">
      
      <div class="back-link">
        <RouterLink to="/adopsi">
          ← Kembali ke Galeri Adopsi
        </RouterLink>
      </div>

      <div class="layout-grid">
        
        <div class="column-left">
          <InfoCard>
            <ImageGallery 
              :images="cat.images" 
              :is-liked="cat.isLiked"
              @toggle-love="handleToggleFavorite"
            />
          </InfoCard>

          <InfoCard>
            <div>
              <h2 class="story-title">Kisah {{ cat.name }}</h2>
              <p class="story-text">
                {{ cat.story }}
              </p>
            </div>
          </InfoCard>
        </div>
        
        <div class="column-right">
          <InfoCard>
            <div class="info-header">
              <h1 class="cat-name">{{ cat.name }}</h1>
              <span class="share-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b4f4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </span>
              <BaseTag variant="gender" class="gender-tag">{{ cat.gender }}</BaseTag>
            </div>

            <div class="info-meta">
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 19H5V8h14v11zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2z"/>
                </svg>
                {{ cat.age }}
              </span>
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {{ cat.location }}
              </span>
            </div>

            <div class="button-group">
              <BaseButton variant="default" @click="goToAdoptionForm">Ajukan Adopsi</BaseButton>
              <BaseButton variant="outline" @click="handleContact">Hubungi Shelter</BaseButton>
            </div>
          </InfoCard>
          
          <InfoCard>
            <h2 class="card-title">Rekam Medis Digital</h2>
            <ul class="check-list">
              <li v-for="item in cat.medical" :key="item">{{ item }}</li>
            </ul>
          </InfoCard>

          <InfoCard>
            <h2 class="card-title">Kartu Kepribadian</h2>
            <div class="personality-tags">
              <BaseTag v-for="tag in cat.personality" :key="tag" variant="gender">{{ tag }}</BaseTag>
            </div>
          </InfoCard>
          
          <InfoCard>
            <h2 class="card-title">Informasi Shelter</h2>
            <p class="shelter-name">{{ cat.shelter.name }}</p>
            <p class="shelter-info">{{ cat.shelter.contactPerson }}</p>
            <p class="shelter-info">{{ cat.shelter.address }}</p>
            <p class="shelter-phone">{{ cat.shelter.phone }}</p>
          </InfoCard>

        </div>
      </div>
      
    </main>

    <LoginRequiredModal 
      :show="showLoginModal" 
      :mode="loginModalMode" 
      @close="showLoginModal = false" 
    />

  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import InfoCard from '../components/InfoCard.vue'
import ImageGallery from '../components/ImageGallery.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseTag from '../components/BaseTag.vue'
import LoginRequiredModal from '../components/LoginRequiredModal.vue'
import { authStore } from '../store/authStore.js'
import { chatStore } from '../store/chatStore.js'

export default {
  name: 'AdoptionDetailView',
  components: {
    RouterLink,
    InfoCard,
    ImageGallery,
    BaseButton,
    BaseTag,
    LoginRequiredModal
  },
  data() {
    return {
      showLoginModal: false,
      loginModalMode: 'contact', // Default mode modal (contact/love)
      cat: {
        name: 'Bella',
        story: 'Bella adalah kucing cantik yang ditemukan dalam kondisi malnutrisi di area parkir kantor. Setelah dirawat intensif selama 3 bulan, Bella kini telah pulih sepenuhnya dan siap menemukan keluarga yang akan menyayanginya selamanya.',
        images: [
          '/src/assets/cats/bella-1.png',
          '/src/assets/cats/bella-2.png',
          '/src/assets/cats/bella-3.png',
        ],
        gender: 'Betina',
        age: '1 Tahun',
        location: 'Bandung Kota',
        medical: ['Steril', 'Vaksin Lengkap', 'Sehat', 'Cek Kesehatan Rutin'],
        personality: ['Manja', 'Aktif'],
        isLiked: false,
        shelter: {
          name: 'Rumah Kucing Jakarta',
          contactPerson: 'Dr. Sarah Veteriner',
          address: 'Jl. Kemang Raya No. 123, Jakarta Selatan',
          phone: '+62 812-3456-7890'
        }
      }
    }
  },
  methods: {
    goToAdoptionForm() {
      const catId = this.$route.params.id
      this.$router.push(`/adopsi/${catId}/form`)
    },
    
    // Logika Chat (Hubungi Shelter)
    handleContact() {
      if (!authStore.isAuthenticated) {
        this.loginModalMode = 'contact' // Set mode modal ke CONTACT
        this.showLoginModal = true
      } else {
        // Buka chat room langsung (Simulasi)
        chatStore.openChat({
          id: 99, // Dummy ID
          name: this.cat.shelter.name,
          avatar: '/src/assets/cats/shelter-placeholder.jpg'
        })
      }
    },

    // Logika Love (Favorit)
    handleToggleFavorite() {
      if (!authStore.isAuthenticated) {
        this.loginModalMode = 'love' // Set mode modal ke LOVE
        this.showLoginModal = true
      } else {
        this.cat.isLiked = !this.cat.isLiked
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Source+Serif+Pro:wght@700&display=swap');

:root {
  --primary-color: #0b4f4a; 
  --bg-color-light: #f8f9fa;
  --text-color: #2d2d2d;
  --text-color-secondary: #6c757d;
  --text-color-light-gray: #a8a8a8;
}

.page-container {
  background-color: var(--bg-color-light);
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
  color: var(--primary-color);
  font-weight: 300; 
  font-size: 1rem;
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
    grid-template-columns: 2fr 1fr; 
  }
}

.column-left, .column-right {
  display: flex;
  flex-direction: column;
  gap: 2rem; 
}

.card-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  margin-bottom: 1.25rem;
}

.story-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.5rem; 
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  margin-bottom: 1rem;
}
.story-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
  font-weight: 400;
  margin: 0;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}
.cat-name {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}
.share-icon {
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gender-tag {
  margin-left: auto;
}

.info-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-light-gray);
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.meta-item svg {
  fill: var(--text-color-light-gray);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.check-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.check-list li {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.check-list li::before {
  content: '';
  display: inline-block;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230b4f4a'%3E%3Cpath fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clip-rule='evenodd' /%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.personality-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.shelter-name {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.25rem 0;
}
.shelter-info {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.5;
  margin: 0 0 0.25rem 0;
}
.shelter-phone {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
  padding-top: 0.5rem;
}
</style>