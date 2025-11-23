<template>
  <nav class="navbar">
    
    <div class="navbar-left">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/Logo.png" alt="Peduli Kucing Logo" class="logo" />
      </router-link>
      
      <div :class="['nav-content-wrapper', { 'is-open': isMenuOpen }]">
          
          <ul class="navbar-links">
            <li><router-link to="/komunitas">Komunitas</router-link></li>
            <li><router-link to="/adopsi">Adopsi</router-link></li>
          </ul>

          <div class="navbar-right-mobile">
            <router-link to="/donasi" class="btn btn-mobile">Donasi</router-link>
            <div v-if="!authStore.isAuthenticated">
              <router-link to="/login" class="btn btn-mobile btn-outline">Masuk / Daftar</router-link>
            </div>
            <div v-else class="mobile-user-profile">
              <img :src="authStore.user?.avatar" alt="User" class="user-avatar-mobile">
              <span>{{ authStore.user?.name }}</span>
              <button @click="handleLogout" class="btn-logout-mobile">Keluar</button>
            </div>
          </div>
      </div>
    </div>
    
    <button class="hamburger-btn" @click="toggleMenu">
      &#9776; 
    </button>
    
    <div class="navbar-right">
      <router-link to="/donasi" class="btn">Donasi</router-link>
      
      <router-link v-if="!authStore.isAuthenticated" to="/login" class="btn btn-outline">
        Masuk / Daftar
      </router-link>

      <div v-else class="user-dropdown" @click="toggleDropdown">
        <img :src="authStore.user?.avatar" alt="User Avatar" class="user-avatar">
        <span class="user-name">{{ authStore.user?.name }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>

        <div v-if="isDropdownOpen" class="dropdown-menu">
          <div class="dropdown-header">
            <strong>{{ authStore.user?.name }}</strong>
            <span>{{ authStore.user?.email }}</span>
          </div>
          <hr>
          <router-link to="/profile" class="dropdown-item">Profil Saya</router-link>
          <button @click="handleLogout" class="dropdown-item text-red">Keluar</button>
        </div>
      </div>
    </div>

  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../store/authStore.js'

const router = useRouter()
const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleLogout = () => {
  authStore.logout()
  isDropdownOpen.value = false
  router.push('/login')
}
</script>

<style scoped>
:root {
  --primary-color: #0b4f4a;
  --text-color: #2d2d2d;
  --bg-color: #ffffff;
}

/* --- DEKSTOP STYLES --- */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-color);
  padding: 1rem 4rem; 
  font-family: 'Source Serif Pro', serif;
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.navbar-left {
  display: flex;
  align-items: center;
}
.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 3rem;
}
.logo {
  width: 120px;
  height: auto;
}
.nav-content-wrapper {
    display: flex;
    align-items: center;
}
.navbar-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding : 0;
}
.navbar-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s;
}
.navbar-links a:hover {
  color: var(--primary-color);
}
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.btn {
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  border-radius: 99px;
  font-weight: 600;
  color: #fff;
  background-color: var(--primary-color);
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  border: 1px solid var(--primary-color);
  cursor: pointer;
}
.btn:hover {
  background-color: #083b37;
}
.btn.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
}
.btn.btn-outline:hover {
  background-color: #f0fafa;
}

/* USER DROPDOWN */
.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 12px 4px 4px;
  border-radius: 99px;
  transition: background 0.2s;
  position: relative;
  border: 1px solid transparent;
}
.user-dropdown:hover {
  background-color: #f5f5f5;
  border-color: #eee;
}
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}
.user-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}
.chevron-icon {
  color: #666;
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 120%;
  right: 0;
  background: white;
  width: 220px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  padding: 8px 0;
  border: 1px solid #eee;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.dropdown-header {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
}
.dropdown-header strong {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #222;
}
.dropdown-header span {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #888;
  
  /* Tambahan untuk memotong teks panjang */
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 4px 0;
}
.dropdown-item {
  display: block;
  padding: 10px 16px;
  text-decoration: none;
  color: #444;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  transition: background 0.2s;
  text-align: left;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
}
.dropdown-item:hover {
  background-color: #f9f9f9;
  color: var(--primary-color);
}
.text-red:hover {
  color: #dc2626;
  background-color: #fee2e2;
}

.hamburger-btn, .navbar-right-mobile {
    display: none; 
}

/* --- MOBILE STYLES --- */
@media (max-width: 992px) {
    .navbar {
        padding: 1rem; 
    }
    .hamburger-btn {
        display: block; 
        background: none;
        border: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: var(--primary-color);
        padding: 0.5rem;
        order: 2; 
    }
    .navbar-right {
        display: none; 
    }
    .nav-content-wrapper {
        display: none; 
        position: absolute;
        top: 70px; 
        left: 0;
        width: 100%;
        background-color: var(--bg-color);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        flex-direction: column;
        z-index: 100;
        padding-bottom: 1rem;
    }
    .nav-content-wrapper.is-open {
        display: flex; 
    }
    .navbar-links {
        flex-direction: column;
        gap: 0; 
        width: 100%;
        border-bottom: 1px solid #f3f4f6;
        padding-top: 0.5rem;
    }
    .navbar-links li a {
        display: block;
        padding: 1rem;
    }
    .navbar-links li a:hover {
        background-color: #f9fafb;
    }
    
    .navbar-right-mobile {
        display: flex; 
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
        width: 100%;
        align-items: center;
    }
    .btn-mobile {
        width: 100%; 
        text-align: center;
        box-sizing: border-box;
    }
    
    .mobile-user-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 8px;
      justify-content: space-between;
    }
    .user-avatar-mobile {
      width: 40px; height: 40px; border-radius: 50%;
    }
    .btn-logout-mobile {
      background: none; border: 1px solid #ddd; padding: 5px 10px; border-radius: 6px; font-size: 0.8rem;
    }
}
</style>