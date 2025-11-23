<template>
  <div class="detail-container">
    <router-link to="/donasi" class="back-link">
      <i class="fas fa-arrow-left"></i> Kembali ke Halaman Donasi
    </router-link>
    <div v-if="donation" class="detail-content">
      <div class="column-left">
        <div class="info-card bella-card">
          <div class="bella-header">
            <h1>{{ donation.title }}</h1>
            <span class="tag tag-gender">{{ donation.gender }}</span>
          </div>
          <span 
            v-if="donation.type !== 'program'" 
            class="info-line">
            <i class="fas fa-clock"></i> {{ donation.age }}
          </span>
          <span 
            v-if="donation.type !== 'program'" 
            class="info-line">
            <i class="fas fa-map-marker-alt"></i> {{ donation.location }}
          </span>
          <BaseButton @click="openDonationModal" variant="default">Bantu Sekarang</BaseButton>
          <BaseButton variant="outline">Hubungi Penggalang</BaseButton>
        </div>
        <div class="info-card donasi-list-card">
          <h3>Donasi <span class="donasi-count">{{ donation.donors.length }}</span></h3>
          <ul class="donasi-list">
            <li v-for="donor in donation.donors" :key="donor.id">
              <strong>{{ donor.name }}</strong>
              <span>Berdonasi sebesar <strong>{{ formatCurrency(donor.amount) }}</strong></span>
            </li>
          </ul>
        </div>
        <div class="info-card penggalang-card">
          <h3>Informasi Penggalang</h3>
          <strong>{{ donation.fundraiser.name }}</strong>
          <span>{{ donation.fundraiser.role }}</span>
          <p>{{ donation.fundraiser.address }}</p>
          <p class="phone">{{ donation.fundraiser.phone }}</p>
        </div>
      </div>
      <div class="column-right">
        <div class="image-card">
          <img :src="donation.imageUrl" alt="Donation Image" class="main-image">
          <i class="fas fa-heart heart-icon"></i>
          <div class="thumbnail-gallery">
            <img 
              v-for="(thumb, index) in donation.thumbnails" 
              :key="index" 
              :src="thumb" 
              alt="Thumbnail" 
              class="thumbnail"
              :class="{ 'thumbnail-active': activeThumbnailIndex === index }"
              @click="changeMainImage(index)"
            >
          </div>
        </div>
        <div class="info-card story-card">
          <div class="story-header">
            <h3>Cerita Penggalangan Dana</h3>
            <i class="fas fa-chevron-right"></i>
          </div>
          <span class="story-date">{{ donation.storyDate }}</span>
          <p class="story-text-full">{{ donation.story }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading data donasi...</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '../components/BaseButton.vue'; 
const DUMMY_DATA = {
    id: 1, 
    title: 'Biaya Operasi Kucing Tertabrak di Bawah Flyover', 
    type: 'kasus', 
    gender: 'Jantan', 
    age: '2 Tahun', 
    location: 'Bandung Kota',
    imageUrl: '/images/kucing_detail_1.jpg',
    thumbnails: ['/images/kucing_detail_1.jpg', '/images/kucing_detail_2.jpg'],
    storyDate: '3 Hari yang lalu',
    story: 'Kucing ini ditemukan dalam kondisi kritis di bawah flyover. Kaki belakangnya patah parah dan membutuhkan operasi segera. Dana ini akan digunakan untuk operasi, rawat inap, dan biaya pasca operasi selama 2 bulan. Mohon bantuan dan doa dari rekan-rekan semua.',
    donors: [
        { id: 1, name: 'Sumbang Anonim', amount: 150000 },
        { id: 2, name: 'Maya', amount: 50000 },
    ],
    fundraiser: {
        name: 'Dr. Sarah Veteriner',
        role: 'Veterinarian',
        address: 'Jl. Kemang Raya No. 123, Jakarta Selatan',
        phone: '+62 812-3456-7890'
    }
};
const route = useRoute();
const donation = ref(null);
const activeThumbnailIndex = ref(0);
onMounted(() => {
    donation.value = DUMMY_DATA; 
    if (donation.value.thumbnails && donation.value.thumbnails.length > 0) {
      donation.value.imageUrl = donation.value.thumbnails[0];
    }
});
const changeMainImage = (index) => {
  activeThumbnailIndex.value = index;
  donation.value.imageUrl = donation.value.thumbnails[index]; 
};
const formatCurrency = (value) => {
  if (!value) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
const openDonationModal = () => {
    alert('Modal Donasi Dibuka!');
};
</script>
<style scoped>
</style>