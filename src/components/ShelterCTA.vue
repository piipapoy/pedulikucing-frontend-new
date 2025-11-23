<template>
  <section class="shelter-cta">
    <div class="cta-header">
      <h3>Daftarkan Shelter Anda Sebagai Mitra</h3>
      <p>
        Bergabung dengan jaringan pedulikucing dan dapatkan akses ke donatur, 
        volunteer, dan sistem terintegrasi untuk memaksimalkan impact penyelamatan.
      </p>
    </div>
    <div class="cta-features">
      <div class="feature-item">
        <span class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path>
          </svg>
        </span>
        <h4>Akses Donatur</h4>
        <p>Terhubung langsung dengan ribuan donatur aktif</p>
      </div>
      <div class="feature-item">
        <span class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>
          </svg>
        </span>
        <h4>Terintegrasi</h4>
        <p>Manajemen kucing, adopsi, dan donasi dalam satu platform</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ShelterCTA'
}
</script>
<style scoped>
:root {
  --primary-color: #0b4f4a;
  --text-color: #2d2d2d;
}
.shelter-cta {
  background-color: var(--primary-color);
  color: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin-top: 2rem; 
}
.cta-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.cta-header h3 {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}
.cta-header p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 500px;
  margin: 0 auto;
}
.cta-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}
@media (min-width: 768px) {
  .cta-features {
    flex-direction: row;
    justify-content: space-around;
  }
}
.feature-item {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.1);
  flex-basis: 50%; 
}
.feature-icon {
  display: block;
  color: white;
  margin-bottom: 0.75rem;
}
.feature-item h4 {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}
.feature-item p {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}
</style>