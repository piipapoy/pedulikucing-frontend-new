<template>
  <div class="page-container">
    
    <div class="content-wrapper">
      <div class="edit-card mb-4">
        <div class="header-section">
          <h1 class="title">Edit Profil</h1>
          <p class="subtitle">Perbarui informasi pribadi Anda.</p>
        </div>
        
        <div class="avatar-section">
          <img :src="form.avatar" alt="Avatar" class="current-avatar">
          <button class="change-photo-text">Ubah Foto Profil</button>
        </div>

        <form @submit.prevent="saveProfile" class="edit-form">
          <BaseInput 
            id="name" 
            label="Nama Lengkap" 
            v-model="form.name" 
            placeholder="Nama Lengkap Anda"
          />
          
          <BaseInput 
            id="email" 
            label="Email" 
            type="email" 
            v-model="form.email" 
            placeholder="email@contoh.com"
          />

          <BaseInput 
            id="phone" 
            label="Nomor Telepon" 
            type="tel"
            v-model="form.phone" 
            placeholder="0812..."
          />

          <div class="button-group">
            <BaseButton variant="outline" type="button" @click="cancelEdit">
              Batal
            </BaseButton>
            <BaseButton variant="default" type="submit">
              Simpan Profil
            </BaseButton>
          </div>
        </form>
      </div>

      <div class="edit-card">
        <div class="header-section left-align">
          <h2 class="section-title">Keamanan Akun</h2>
          <p class="subtitle">Ubah kata sandi Anda secara berkala.</p>
        </div>

        <form @submit.prevent="changePassword" class="password-form">
          <BaseInput 
            id="oldPassword" 
            label="Kata Sandi Lama" 
            type="password" 
            v-model="passwordForm.old" 
            placeholder="Masukkan sandi lama"
          />
          
          <BaseInput 
            id="newPassword" 
            label="Kata Sandi Baru" 
            type="password" 
            v-model="passwordForm.new" 
            placeholder="Minimal 8 karakter"
          />

          <BaseInput 
            id="confirmPassword" 
            label="Konfirmasi Sandi Baru" 
            type="password" 
            v-model="passwordForm.confirm" 
            placeholder="Ulangi sandi baru"
          />

          <div class="button-group right-align">
            <BaseButton variant="default" type="submit">
              Update Kata Sandi
            </BaseButton>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { authStore } from '../store/authStore.js'

const router = useRouter()

// Form Data Diri
const form = reactive({
  name: '',
  email: '',
  phone: '',
  avatar: ''
})

// Form Password
const passwordForm = reactive({
  old: '',
  new: '',
  confirm: ''
})

onMounted(() => {
  if (authStore.user) {
    form.name = authStore.user.name
    form.email = authStore.user.email
    form.avatar = authStore.user.avatar
    form.phone = '081234567890' 
  }
})

const saveProfile = () => {
  if (authStore.user) {
    authStore.user.name = form.name
    authStore.user.email = form.email
  }
  alert('Profil berhasil diperbarui!')
  router.push('/profile')
}

const changePassword = () => {
  if (!passwordForm.old || !passwordForm.new || !passwordForm.confirm) {
    alert('Mohon lengkapi semua kolom password.')
    return
  }
  if (passwordForm.new !== passwordForm.confirm) {
    alert('Konfirmasi kata sandi tidak cocok!')
    return
  }
  // Simulasi ganti password
  alert('Kata sandi berhasil diubah!')
  // Reset form
  passwordForm.old = ''
  passwordForm.new = ''
  passwordForm.confirm = ''
}

const cancelEdit = () => {
  router.back()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@600;700&display=swap');

.page-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  padding-bottom: 3rem;
}

.content-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.edit-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.mb-4 {
  margin-bottom: 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.header-section.left-align {
  text-align: left;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0 0 0.5rem 0;
}

.section-title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d2d2d;
  margin: 0 0 0.3rem 0;
}

.subtitle {
  color: #666;
  font-size: 0.95rem;
  margin: 0;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.current-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f0fafa;
}

.change-photo-text {
  background: none;
  border: none;
  color: #0b4f4a;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}
.change-photo-text:hover {
  text-decoration: underline;
}

/* Form Styles */
.edit-form, .password-form {
  display: flex;
  flex-direction: column;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.button-group > * {
  flex: 1;
}

/* Khusus tombol password biar ga full width (opsional, atau biarin full) */
.button-group.right-align {
  justify-content: flex-end;
}
</style>