<template>
  <div class="shelter-card">
    <div class="card-image-wrapper">
      <img :src="shelter.image || '/src/assets/cats/shelter-placeholder.jpg'" :alt="'Foto ' + shelter.name" class="shelter-image">
    </div>
    <div class="card-content">
      <h3 class="shelter-name">{{ shelter.name }}</h3>
      <p class="shelter-location">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span class="location-text">
          {{ shelter.location }}
        </span>
      </p>
      <p v-if="!isClinic" class="shelter-description">
        {{ shelter.description }}
      </p>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">{{ shelter.stats.rescued }}</span>
          <span class="stat-label">Kucing Diselamatkan</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ shelter.stats.operational }}</span>
          <span class="stat-label">Tahun Beroperasi</span>
        </div>
      </div>
      <div v-if="isClinic" class="clinic-services">
        <p class="service-label">Layanan:</p>
        <div class="service-tags-grid">
          <span v-for="service in shelter.services" :key="service" class="service-tag">{{ service }}</span>
        </div>
      </div>
      <div v-if="!isClinic">
        <p class="spec-label">Spesialisasi:</p>
        <div class="specializations">
          <span v-for="spec in shelter.specialties" :key="spec" class="spec-tag">{{ spec }}</span>
        </div>
      </div>
      <div class="contact-info">
        <p class="contact-detail">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2 2h-3.4a20.5 20.5 0 0 1-8-8 20.5 20.5 0 0 1-8-8V4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2 15 15 0 0 0 1 2.3l.5.8c.4.7-.1 1.6-.9 1.9l-2.4 1c-.8.3-.9 1.3-.2 1.9a10 10 0 0 0 6.5 6.5c.6.7 1.6.6 1.9-.2l1-2.4c.3-.8 1.2-1.3 1.9-.9l.8.5a15 15 0 0 0 2.3 1z"></path>
          </svg>
          {{ shelter.contact.phone }}
        </p>
        <p class="contact-detail">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          {{ shelter.contact.email }}
        </p>
      </div>
      <div class="card-actions">
        <template v-if="isClinic">
          <button class="action-contact action-route-clinic" @click="openMaps">Rute</button>
          <button class="action-detail action-contact-clinic" @click="handleContact">Hubungi</button>
        </template>
        <template v-else>
          <button class="action-detail">Lihat Detail</button>
          <button class="action-contact" @click="handleContact">Hubungi</button>
        </template>
      </div>
    </div>

    <LoginRequiredModal 
      :show="showLoginModal" 
      @close="showLoginModal = false" 
    />
  </div>
</template>

<script>
import LoginRequiredModal from './LoginRequiredModal.vue';
import { authStore } from '../store/authStore.js';
import { chatStore } from '../store/chatStore.js';

export default {
  name: 'ShelterCard',
  components: {
    LoginRequiredModal
  },
  props: {
    shelter: {
      type: Object,
      required: true
    },
    isClinic: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      showLoginModal: false
    }
  },
  methods: {
    openMaps() {
      window.open('https://www.google.com/maps', '_blank');
    },
    handleContact() {
      if (!authStore.isAuthenticated) {
        this.showLoginModal = true;
      } else {
        // Langsung buka chat room dengan shelter ini
        chatStore.openChat({
          id: this.shelter.id || 99, 
          name: this.shelter.name,
          avatar: this.shelter.image
        });
      }
    }
  }
}
</script>

<style scoped>
/* CSS tidak berubah, tetap sama seperti sebelumnya */
:root {
  --primary-color: #0b4f4a;
  --text-color: #2d2d2d;
  --text-color-secondary: #555;
  --highlight-color: #DDF5F3; 
}
.shelter-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card-image-wrapper {
  width: 100%;
  padding-top: 66.66%; 
  position: relative;
  overflow: hidden;
}
.shelter-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.shelter-name {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}
.shelter-location {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500; 
  color: #333; 
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.25rem 0 0.5rem 0; 
}
.shelter-location svg {
  color: var(--primary-color); 
  fill: var(--primary-color);
}
.shelter-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
}
.spec-label { 
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background-color: var(--highlight-color); 
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
}
.stat-item {
  text-align: center;
}
.stat-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color); 
}
.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-color-secondary); 
}
.clinic-services {
    margin-bottom: 1rem;
}
.service-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.5rem;
}
.service-tags-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-family: 'Inter', sans-serif;
}
.service-tag {
    background-color: var(--highlight-color);
    color: var(--primary-color);
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
}
.specializations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-top: 0.5rem;
}
.spec-tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem; 
  background-color: #DDF5F3; 
  color: var(--primary-color);
  border: none; 
}
.contact-info {
  margin-top: auto; 
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  line-height: 1.5;
}
.contact-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
}
.contact-detail svg {
  color: var(--primary-color);
  flex-shrink: 0;
}
.card-actions {
  display: flex;
  gap: 0.5rem;
}
.action-detail, .action-contact {
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.65rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.action-detail {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}
.action-detail:hover {
  background-color: #f0fafa;
}
.action-contact {
  background-color: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color);
}
.action-contact:hover {
  background-color: #083b37;
}
.action-route-clinic {
    background-color: var(--primary-color); 
    color: white;
    border: 2px solid var(--primary-color);
}
.action-contact-clinic {
    background-color: white; 
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}
</style>