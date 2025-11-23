<template>
  <div class="step-content">
    <div class="map-container">
      <div class="map-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="map-icon">
          <path fill-rule="evenodd" d="m11.54 22.351.07.039.08.041.066.027.073.027 1.34 3.737c.18.502.585.502.766 0l1.34-3.737c.073-.203.073-.417 0-.62l-.248-.68c-.686-1.879-1.92-3.41-3.41-4.408a6.762 6.762 0 0 0-3.136-1.12c-.524 0-1.047.078-1.558.236-1.396.446-2.617 1.314-3.55 2.518L.78 18.236a.75.75 0 0 0 .195.894l2.458 2.339c.51.485 1.25.485 1.76 0l2.457-2.339a.75.75 0 0 0 .195-.894l-1.07-1.284a5.262 5.262 0 0 1 2.366-3.085c.37.16.76.248 1.157.248 1.144 0 2.22-.38 3.107-1.09.435-.348.835-.747 1.196-1.187.36-.44.675-.92.93-1.42.08-.15.14-.3.18-.45.02-.08.03-.16.03-.24 0-.08-.01-.16-.03-.24s-.04-.15-.08-.23c-.255-.5-.57-1-.93-1.42-.36-.44-.76-.84-1.196-1.187a5.762 5.762 0 0 0-3.107-1.09c-.397 0-.787.088-1.157.248a5.262 5.262 0 0 1-2.366-3.085l1.07-1.284a.75.75 0 0 0-.195-.894L1.93 1.09a.75.75 0 0 0-1.76 0L1.75 3.429c-.51.485-1.25.485-1.76 0L.78 1.76A.75.75 0 0 0 .585.866l.738-3.593a3.5 3.5 0 0 0-1.071-3.567l-1.79-1.79a.75.75 0 0 0 .364-1.258l3.32-.964a3 3 0 0 0 2.115-.823l2.246-2.246a.75.75 0 0 0 1.06 0l2.246 2.246a3 3 0 0 0 2.115.823l3.32.964a.75.75 0 0 0 .364 1.258l-1.79 1.79a3.5 3.5 0 0 0-1.071 3.567l.738 3.593c.115.571-.05 1.201-.47 1.621l-3.974 3.974Z" clip-rule="evenodd" />
        </svg>
        <p class="map-text">Peta Interaktif</p>
      </div>
      <button @click="$emit('useCurrentLocation')" class="location-btn">
        Gunakan Lokasi Saat Ini
      </button>
    </div>
    
    <p class="separator-text">Atau ketik alamat lengkap</p>
    
    <div class="form-field">
        <input 
            type="text" 
            v-model="addressInput" 
            placeholder="Contoh: Jalan Melati No. 5, Kelurahan Mawar..."
            class="address-input form-input"
            @input="$emit('update:address', addressInput)"
        >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const addressInput = ref('')
</script>

<style scoped>
.step-content {
    display: flex;
    flex-direction: column;
    /* align-items: center; <-- Ini penting untuk flex column */
    width: 100%;
    text-align: center; /* Memastikan teks di dalamnya rata tengah */
}

.map-container {
    width: 100%;
    max-width: 450px;
    border: 1px dashed #d1d5db;
    border-radius: 12px;
    padding: 1.5rem;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    
    /* INI SOLUSINYA: Memaksa elemen block ke tengah */
    margin: 0 auto; 
}

.map-placeholder {
    border: 1px solid #e5e7eb; 
    border-radius: 8px;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.map-icon {
    width: 2rem;
    height: 2rem;
    color: #0f766e;
}

.map-text {
    font-size: 0.95rem;
    color: #6b7280;
    margin: 0;
}

.location-btn {
    background-color: #0f766e;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem; 
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    border: none;
    width: 100%; 
    max-width: 250px; 
}

.location-btn:hover {
    background-color: #0b4f4a;
}

.separator-text {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 1rem 0 0.5rem;
    text-align: center; /* Memastikan teks ini di tengah */
}

.form-field {
    width: 100%;
    display: flex;
    justify-content: center; 
}

.address-input {
    width: 100%;
    max-width: 450px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
    /* Tambahan margin auto untuk jaga-jaga */
    margin: 0 auto; 
}

.address-input:focus {
    border-color: #0f766e;
    box-shadow: 0 0 0 1px #0f766e;
}
</style>