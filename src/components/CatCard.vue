<template>
  <div class="cat-card">
    <div class="image-wrapper">
      <img :src="image" :alt="'Foto ' + name" class="cat-image">
      
      <!-- Tombol Love: Gunakan @click.stop agar tidak masuk ke halaman detail -->
      <button class="love-button" @click.stop="$emit('toggleFavorite')">
        <!-- Icon Love Dinamis -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          :fill="isLiked ? '#0b4f4a' : 'none'" 
          :stroke="isLiked ? '#0b4f4a' : 'white'" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          class="love-icon"
        >
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.31l-0.77-0.73a5.4 5.4 0 0 0-7.65 0C1.83 7.03 1.83 11.23 4.28 13.68L12 22l7.72-8.32c2.45-2.45 2.45-6.65 0-9.1Z"></path>
        </svg>
      </button>
    </div>
    
    <div class="card-content">
      <div class="header-meta">
        <h3 class="cat-name">{{ name }}</h3>
        <BaseTag variant="gender">{{ gender }}</BaseTag>
      </div>
      <div class="location-age">
        <span class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {{ age }} Tahun
        </span>
        <span class="meta-item location">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
          </svg>
          {{ location }}
        </span>
      </div>
      <div class="health-status-content">
        <span v-if="steril" class="health-item-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Steril
        </span>
        <span v-if="vaksin" class="health-item-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Vaksin
        </span>
      </div>
      <p class="cat-description">{{ description }}</p>
      <div class="character-tags">
        <BaseTag v-for="tag in karakter" :key="tag" variant="character">{{ tag }}</BaseTag>
      </div>
      <button class="profile-button" @click="$emit('viewProfile')">
        Lihat Profil Lengkap
      </button>
    </div>
  </div>
</template>

<script>
import BaseTag from './BaseTag.vue'
export default {
  name: 'CatCard',
  components: { BaseTag },
  props: {
    id: Number,
    image: String,
    name: String,
    age: [Number, String],
    location: String,
    gender: String,
    description: String,
    karakter: Array,
    steril: Boolean,
    vaksin: Boolean,
    isLiked: { type: Boolean, default: false }
  },
  emits: ['viewProfile', 'toggleFavorite']
}
</script>

<style scoped>
:root {
  --primary-color: #0b4f4a;
  --text-color: #2d2d2d;
  --text-color-secondary: #555;
  --meta-icon-color: #0b4f4a;
  --health-tag-bg-content: #134643;
}
.cat-card {
  background-color: white;
  border-radius: 1rem; 
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); 
  display: flex;
  flex-direction: column;
}
.image-wrapper {
  width: 100%;
  padding-top: 75%; 
  position: relative;
  overflow: hidden;
}
.cat-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.love-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.25); /* Transparan sedikit */
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s, background-color 0.2s;
}
.love-button:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.9);
}
.love-button svg {
  width: 20px;
  height: 20px;
  transition: fill 0.3s, stroke 0.3s;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); /* Biar keliatan di foto terang */
}
.card-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-family: 'Inter', sans-serif;
}
.header-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}
.cat-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}
.location-age {
  display: flex;
  gap: 1rem; 
  font-size: 0.9rem; 
  color: #555; 
  margin-bottom: 0.75rem;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem; 
}
.meta-item svg {
    width: 16px; 
    height: 16px;
    color: var(--meta-icon-color, var(--primary-color));
    stroke: var(--meta-icon-color, var(--primary-color));
    fill: none;
    flex-shrink: 0;
}
.meta-item.location svg {
    fill: var(--meta-icon-color, var(--primary-color)); 
    stroke: none;
}
.health-status-content {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    font-weight: 500;
}
.health-item-content {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    color: #0b4f4a;
}
.health-item-content svg {
    width: 15px;
    height: 15px;
    fill: #0b4f4a;
    color: none;
    flex-shrink: 0;
}
.cat-description {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  line-height: 1.4;
  flex-grow: 1; 
  margin-bottom: 1rem;
}
.character-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.profile-button {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: auto;
}
.profile-button:hover {
  background-color: #083b37;
}
</style>