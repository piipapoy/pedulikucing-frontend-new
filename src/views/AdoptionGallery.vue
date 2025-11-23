<template>
  <div> 
    
    <div class="adoption-page-container">
      
      <div class="gallery-content">
        <section class="page-header">
          <h2>Temukan Teman Hidup Anda</h2>
          <p>Ribuan kucing menunggu rumah yang hangat. Gunakan filter untuk menemukan yang paling cocok dengan gaya hidup Anda.</p>
        </section>

        <div class="search-filter-bar">
          <div class="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Cari nama kucing..."
              v-model="searchQuery"
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
              <h4>Filter Adopsi</h4>
              <button class="close-btn" @click="isFilterOpen = false">×</button>
            </div>
            
            <div class="filter-body">
              <div class="filter-group">
                <label>Lokasi</label>
                <div class="select-wrapper">
                  <select v-model="activeFilters.location">
                    <option value="Semua Lokasi">Semua Lokasi</option>
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Bandung Kota">Bandung Kota</option>
                    <option value="Surabaya">Surabaya</option>
                  </select>
                </div>
              </div>

              <div class="filter-group">
                <label>Usia Kucing</label>
                <div class="select-wrapper">
                  <select v-model="activeFilters.age">
                    <option value="Semua Usia">Semua Usia</option>
                    <option value="< 1 Tahun">Kitten (&lt; 1 Tahun)</option>
                    <option value="1-3 Tahun">Remaja (1-3 Tahun)</option>
                    <option value="> 3 Tahun">Dewasa (&gt; 3 Tahun)</option>
                  </select>
                </div>
              </div>

              <div class="filter-group">
                <label>Jenis Kelamin</label>
                <div class="radio-chips">
                  <label class="chip">
                    <input type="radio" :value="null" v-model="activeFilters.gender">
                    <span>Semua</span>
                  </label>
                  <label class="chip">
                    <input type="radio" value="Jantan" v-model="activeFilters.gender">
                    <span>Jantan</span>
                  </label>
                  <label class="chip">
                    <input type="radio" value="Betina" v-model="activeFilters.gender">
                    <span>Betina</span>
                  </label>
                </div>
              </div>

              <div class="filter-group">
                <label>Status Kesehatan</label>
                <div class="radio-chips">
                  <label class="chip" :class="{ active: activeFilters.health.includes('Steril') }">
                    <input type="checkbox" value="Steril" v-model="activeFilters.health">
                    <span>Sudah Steril</span>
                  </label>
                  <label class="chip" :class="{ active: activeFilters.health.includes('Vaksin') }">
                    <input type="checkbox" value="Vaksin" v-model="activeFilters.health">
                    <span>Sudah Vaksin</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="filter-actions">
              <button class="btn-reset" @click="resetFilters">Reset</button>
              <button class="btn-apply" @click="isFilterOpen = false">Tampilkan</button>
            </div>
          </div>
        </div>

        <div class="sub-controls">
          <label class="favorite-toggle-label">
              <input type="checkbox" v-model="showFavorites" class="favorite-checkbox">
              Tampilkan Favorit Saya
          </label>
        </div>

        <div class="cat-card-grid">
          <CatCard 
            v-for="cat in filteredCats" 
            :key="cat.id"
            :image="cat.image"
            :name="cat.name"
            :age="cat.age"
            :location="cat.location"
            :gender="cat.gender"
            :description="cat.description"
            :karakter="cat.karakter"
            :steril="cat.steril"
            :vaksin="cat.vaksin"
            @viewProfile="handleViewProfile(cat.id)"
          />

          <p v-if="filteredCats.length === 0" class="no-results">
              Tidak ada kucing yang cocok dengan kriteria filter.
          </p>
        </div>

        <button v-if="hasMore" @click="loadMore" class="load-more-btn">
          Muat Lebih Banyak
        </button>

      </div>
    </div>
  </div> 
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import CatCard from '../components/CatCard.vue' 
import BaseInput from '../components/BaseInput.vue' 

const router = useRouter()

// --- Data Kucing Dummy ---
const cats = ref([
    { id: 1, name: 'Lana', image: '/src/assets/cats/lana.png', age: 2, location: 'Jakarta Selatan', gender: 'Betina', description: 'cantik yang sangat manja dan cocok untuk pemula', karakter: ['Manja', 'Tenang'], steril: true, vaksin: true },
    { id: 2, name: 'Milo', image: '/src/assets/cats/milo.png', age: 3, location: 'Surabaya', gender: 'Jantan', description: 'dewasa yang mandiri dan cocok untuk yang sibuk', karakter: ['Mandiri', 'Tenang'], steril: true, vaksin: false },
    { id: 3, name: 'Bella', image: '/src/assets/cats/bella.png', age: 1, location: 'Bandung Kota', gender: 'Betina', description: 'muda yang sangat manja dan mudah dirawat', karakter: ['Manja', 'Aktif'], steril: false, vaksin: true },
    { id: 4, name: 'Toby', image: '/src/assets/cats/toby.png', age: 0.5, location: 'Jakarta Selatan', gender: 'Jantan', description: 'anak kucing yang sangat aktif dan lucu', karakter: ['Aktif', 'Manja'], steril: false, vaksin: true },
    { id: 5, name: 'Luna', image: '/src/assets/cats/luna.png', age: 4, location: 'Surabaya', gender: 'Betina', description: 'kucing senior yang tenang dan penyayang', karakter: ['Tenang', 'Mandiri'], steril: true, vaksin: true },
])

const searchQuery = ref('')
const showFavorites = ref(false)
const isFilterOpen = ref(false)

const activeFilters = reactive({
    location: 'Semua Lokasi',
    age: 'Semua Usia',
    gender: null,
    health: [], 
    character: [],
})

function resetFilters() {
    activeFilters.location = 'Semua Lokasi'
    activeFilters.age = 'Semua Usia'
    activeFilters.gender = null
    activeFilters.health = []
    activeFilters.character = []
}

const filteredCats = computed(() => {
    let results = cats.value

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        results = results.filter(cat => cat.name.toLowerCase().includes(query))
    }
    if (activeFilters.location && activeFilters.location !== 'Semua Lokasi') {
        results = results.filter(cat => cat.location === activeFilters.location)
    }
    if (activeFilters.age && activeFilters.age !== 'Semua Usia') {
        const ageFilter = activeFilters.age
        results = results.filter(cat => {
            if (ageFilter === '< 1 Tahun') return cat.age < 1
            if (ageFilter === '1-3 Tahun') return cat.age >= 1 && cat.age <= 3
            if (ageFilter === '> 3 Tahun') return cat.age > 3
            return true
        })
    }
    if (activeFilters.gender) {
        results = results.filter(cat => cat.gender === activeFilters.gender)
    }
    if (activeFilters.health.length > 0) {
        results = results.filter(cat => {
            return activeFilters.health.every(filter => {
                if (filter === 'Steril') return cat.steril
                if (filter === 'Vaksin') return cat.vaksin
                return true
            })
        })
    }
    if (showFavorites.value) {
        results = results.filter(cat => cat.id === 1) 
    }

    return results
})

const hasMore = computed(() => filteredCats.value.length < cats.value.length)

function handleViewProfile(catId) {
    router.push(`/adopsi/${catId}`)
}

function loadMore() {
    console.log('Memuat lebih banyak kucing...')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@600;700&display=swap');

.adoption-page-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 2rem;
  font-family: 'Inter', sans-serif;
}

.gallery-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}
.page-header h2 {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 0.5rem;
}
.page-header p {
  color: #666;
  font-size: 1rem;
}

/* --- SEARCH & FILTER --- */
.search-filter-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 1.5rem;
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

/* --- MODAL STYLES (Konsisten) --- */
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
}
.filter-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
}
.select-wrapper select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  background-color: #fff;
  cursor: pointer;
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

/* --- SUB CONTROLS --- */
.sub-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.favorite-toggle-label {
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    color: #374151;
    font-weight: 500;
    cursor: pointer;
}
.favorite-checkbox {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    accent-color: #0b4f4a;
}

/* --- GRID --- */
.cat-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 24px;
}
.no-results {
    grid-column: 1 / -1; 
    text-align: center;
    color: #6b7280;
    padding: 3rem 0;
    font-size: 1.1rem;
}
.load-more-btn {
  background-color: white;
  color: #0b4f4a;
  border: 1px solid #0b4f4a;
  font-weight: 600;
  padding: 0.6rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 3rem;
  width: 100%;
  max-width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.load-more-btn:hover {
  background-color: #0b4f4a;
  color: white;
}
</style>