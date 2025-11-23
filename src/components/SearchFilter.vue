<template>
  <div class="search-filter-container">
    <div class="search-input">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input 
        type="text" 
        placeholder="Cari kasus darurat..." 
        class="search-field"
        @input="$emit('search', $event.target.value)"
      >
    </div>
    <button class="filter-button" @click="$emit('toggle-filter')">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: 'SearchFilter',
  emits: ['toggle-filter', 'search']
}
</script>
<style scoped>
:root {
    --primary-color: #0b4f4a;
}
.search-filter-container {
  display: flex;
  gap: 0.75rem;
  max-width: 600px;
  margin: 0 auto 2.5rem auto; 
}
.search-input {
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.search-input svg {
  color: #888;
  flex-shrink: 0;
  margin-right: 0.5rem;
}
.search-field {
  flex-grow: 1;
  border: none;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color, #333);
}
.filter-button {
  width: 44px;
  height: 44px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.filter-button svg {
  color: var(--primary-color);
}
.filter-button:hover {
  background-color: #f0fafa;
  border-color: var(--primary-color);
}
</style>