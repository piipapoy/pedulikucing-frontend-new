<template>
  <div class="donation-card">
    <div class="card-image-container">
      <img :src="donation.imageUrl" :alt="donation.title">
      <span class="card-tag" :class="donation.type === 'program' ? 'tag-program' : 'tag-kasus'">
        <i v-if="donation.type === 'program'" class="fas fa-sync-alt"></i>
        {{ donation.type === 'program' ? 'Program Rutin' : 'Darurat' }}
      </span>
    </div>

    <div class="card-content">
      <div class="header-group">
        <h4 class="card-title">{{ donation.title }}</h4>
        <span v-if="donation.type === 'kasus'" class="card-location">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
          </svg>
          {{ donation.location }}
        </span>
      </div>

      <p v-if="donation.type === 'kasus'" class="card-description">
        {{ donation.description || 'Kasus ini membutuhkan bantuan segera untuk biaya pengobatan dan perawatan intensif.' }}
      </p>

      <div v-if="donation.type === 'program'" class="program-details">
        <p class="card-description program-desc">
          Bantuan rutin untuk shelter dan foster parent.
        </p>
        <ul class="card-perks">
          <li>
            <span class="icon-dot"></span> 
            <span><strong>Manfaat:</strong> {{ donation.manfaat }}</span>
          </li>
          <li>
            <span class="icon-dot"></span> 
            <span><strong>Dampak:</strong> {{ donation.dampak }}</span>
          </li>
        </ul>
      </div>

      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="progress-labels">
          <div class="progress-left">
            <span class="label-text">Terkumpul</span>
            <strong class="amount-text">{{ formatCurrency(donation.terkumpul) }}</strong>
          </div>
          <div class="progress-right">
            <span class="percentage-text">{{ progressPercent.toFixed(0) }}%</span>
          </div>
        </div>
      </div>

      <router-link :to="`/donasi/${donation.id}`" class="action-button">
        {{ donation.type === 'kasus' ? 'Bantu Sekarang' : 'Dukung Program' }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  donation: {
    type: Object,
    required: true
  }
});

const progressPercent = computed(() => {
  if (props.donation.target === 0) return 0;
  // Batasi max 100% agar bar tidak keluar
  return Math.min((props.donation.terkumpul / props.donation.target) * 100, 100);
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@600;700&display=swap');

:root {
  --primary-color: #0b4f4a;
  --text-color: #2d2d2d;
  --text-light: #666;
  --bg-light: #f9f9f9;
}

.donation-card {
  background-color: white;
  border-radius: 1rem; /* Sama dengan ShelterCard */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 320px; /* Lebar tetap agar rapi di scroll horizontal */
  flex-shrink: 0;
  border: 1px solid #f0f0f0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.donation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
}

/* Bagian Gambar */
.card-image-container {
  position: relative;
  width: 100%;
  padding-top: 60%; /* Aspect Ratio 5:3 */
  overflow: hidden;
}

.card-image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
  backdrop-filter: blur(4px);
}

.tag-kasus {
  background-color: rgba(220, 38, 38, 0.9); /* Merah untuk darurat */
  color: white;
}

.tag-program {
  background-color: var(--primary-color, #0b4f4a);
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Bagian Konten */
.card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.header-group {
  margin-bottom: 0.75rem;
}

.card-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-color, #2d2d2d);
  margin: 0 0 0.4rem 0;
  line-height: 1.3;
  /* Truncate 2 baris */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-location {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #0b4f4a;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-light, #666);
  margin: 0 0 1rem 0;
  line-height: 1.5;
  /* Truncate 3 baris */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 4.5em; /* Menjaga tinggi konsisten */
}

.program-desc {
  min-height: auto;
  margin-bottom: 0.8rem;
}

/* List Manfaat Program */
.card-perks {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--text-light);
}

.card-perks li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 8px;
}

.icon-dot {
  width: 6px;
  height: 6px;
  background-color: #0b4f4a;
  border-radius: 50%;
  margin-top: 7px;
  flex-shrink: 0;
}

.card-perks li strong {
  color: var(--text-color);
  font-weight: 600;
}

/* Progress Bar */
.progress-section {
  margin-top: auto; /* Dorong ke bawah */
  margin-bottom: 1.25rem;
}

.progress-bar {
  background-color: #eee;
  border-radius: 99px;
  height: 8px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar-fill {
  background-color: #0b4f4a; /* Warna tema */
  height: 100%;
  border-radius: 99px;
  transition: width 0.5s ease-out;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: 'Inter', sans-serif;
}

.progress-left {
  display: flex;
  flex-direction: column;
}

.label-text {
  font-size: 0.75rem;
  color: #888;
}

.amount-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0b4f4a;
}

.percentage-text {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0b4f4a;
  background-color: #e0f2f1;
  padding: 2px 8px;
  border-radius: 4px;
}

/* Tombol Aksi */
.action-button {
  display: block;
  width: 100%;
  text-align: center;
  background-color: #0b4f4a;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem;
  border-radius: 999px; /* Pill shape */
  text-decoration: none;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #083b37;
}
</style>