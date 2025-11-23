<template>
  <div>
    <div class="filter-group">
      <h4 class="filter-label">Lokasi</h4>
      <div class="select-wrapper">
        <select class="custom-select" :value="filters.location" @change="updateFilter('location', $event.target.value)">
          <option value="Semua Lokasi">Semua Lokasi</option>
          <option value="Jakarta Selatan">Jakarta Selatan</option>
          <option value="Bandung Kota">Bandung Kota</option>
          <option value="Surabaya">Surabaya</option>
        </select>
        <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    <div class="filter-group">
      <h4 class="filter-label">Usia</h4>
      <div class="select-wrapper">
        <select class="custom-select" :value="filters.age" @change="updateFilter('age', $event.target.value)">
          <option value="Semua Usia">Semua Usia</option>
          <option value="< 1 Tahun">< 1 Tahun</option>
          <option value="1-3 Tahun">1-3 Tahun</option>
          <option value="> 3 Tahun">> 3 Tahun</option>
        </select>
        <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
    <div class="filter-group">
      <h4 class="filter-label">Jenis Kelamin</h4>
      <div class="toggle-group gender-group">
        <button :class="['toggle-btn', { active: filters.gender === 'Jantan' }]" @click="updateFilter('gender', filters.gender === 'Jantan' ? null : 'Jantan')">Jantan</button>
        <button :class="['toggle-btn', { active: filters.gender === 'Betina' }]" @click="updateFilter('gender', filters.gender === 'Betina' ? null : 'Betina')">Betina</button>
      </div>
    </div>
    <div class="filter-group">
      <h4 class="filter-label">Status Kesehatan</h4>
      <div class="toggle-group status-group">
        <button :class="['toggle-btn', { active: filters.health.includes('Steril') }]" @click="toggleArrayFilter('health', 'Steril')">Steril</button>
        <button :class="['toggle-btn', { active: filters.health.includes('Vaksin') }]" @click="toggleArrayFilter('health', 'Vaksin')">Vaksin</button>
        <button :class="['toggle-btn', { active: filters.health.includes('Sehat') }]" @click="toggleArrayFilter('health', 'Sehat')">Sehat</button>
        <button :class="['toggle-btn', { active: filters.health.includes('Butuh Perawatan') }]" @click="toggleArrayFilter('health', 'Butuh Perawatan')">Butuh Perawatan</button>
      </div>
    </div>
    <div class="filter-group">
      <h4 class="filter-label">Karakter</h4>
      <div class="toggle-group character-group">
        <button :class="['toggle-btn', { active: filters.character.includes('Manja') }]" @click="toggleArrayFilter('character', 'Manja')">Manja</button>
        <button :class="['toggle-btn', { active: filters.character.includes('Aktif') }]" @click="toggleArrayFilter('character', 'Aktif')">Aktif</button>
        <button :class="['toggle-btn', { active: filters.character.includes('Tenang') }]" @click="toggleArrayFilter('character', 'Tenang')">Tenang</button>
        <button :class="['toggle-btn', { active: filters.character.includes('Mandiri') }]" @click="toggleArrayFilter('character', 'Mandiri')">Mandiri</button>
      </div>
    </div>
    <button class="clear-filter-btn" @click="clearFilters">Reset Filter</button>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits(['update:filters']);
const filters = ref({
    location: 'Semua Lokasi', age: 'Semua Usia', gender: null, health: [], character: [],
});
watch(filters.value, (newFilters) => { emit('update:filters', newFilters); }, { deep: true });
function updateFilter(key, value) { filters.value[key] = value; }
function toggleArrayFilter(key, value) {
    const arr = filters.value[key];
    const index = arr.indexOf(value);
    if (index > -1) { arr.splice(index, 1); } else { arr.push(value); }
}
function clearFilters() {
    filters.value = { location: 'Semua Lokasi', age: 'Semua Usia', gender: null, health: [], character: [], };
}
</script>
<style scoped>
:root {
  --primary-color: #0b4f4a;
}
.filter-group {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1.5rem;
}
.filter-group:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
}
.filter-label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color, #2d2d2d);
  margin-bottom: 0.5rem;
  display: block;
}
.select-wrapper {
    position: relative;
}
.custom-select {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  appearance: none; 
  background-color: white;
}
.dropdown-arrow {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #888;
}
.toggle-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 0.5rem;
}
.toggle-group.status-group, .toggle-group.character-group {
    grid-template-columns: repeat(2, 1fr); 
}
.toggle-btn {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid #ddd;
  padding: 0.6rem 0.75rem; 
  border-radius: 8px; 
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}
.toggle-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}
.toggle-btn:hover:not(.active) {
    background-color: #f0fafa;
    border-color: var(--primary-color);
}
.clear-filter-btn {
    width: 100%;
    background: none;
    border: none;
    color: #888;
    font-size: 0.9rem;
    cursor: pointer;
    margin-top: 1rem;
    font-weight: 500;
}
.clear-filter-btn:hover {
    color: var(--primary-color);
}
</style>