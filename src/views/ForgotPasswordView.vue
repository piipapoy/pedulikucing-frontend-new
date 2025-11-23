<template>
  <div class="page-container">
    <div class="auth-layout">
      
      <div class="form-column">
        <div class="form-container">
          
          <div v-if="step === 1">
            <h1 class="title">Lupa Kata Sandi? 🔒</h1>
            <p class="subtitle">
              Jangan khawatir. Masukkan email yang terdaftar dan kami akan mengirimkan kode verifikasi.
            </p>
            <form @submit.prevent="handleSendCode">
              <BaseInput
                id="email"
                label="Email"
                type="email"
                placeholder="Contoh@email.com"
                v-model="form.email"
              />
              <div class="spacer"></div>
              <BaseButton variant="default" type="submit">
                Kirim Kode
              </BaseButton>
            </form>
          </div>

          <div v-if="step === 2">
            <h1 class="title">Reset Password 🔑</h1>
            <p class="subtitle">
              Kode verifikasi telah dikirim ke <strong>{{ form.email }}</strong>.
            </p>
            <form @submit.prevent="handleReset">
              <BaseInput
                id="otp"
                label="Kode Verifikasi"
                type="text"
                placeholder="Contoh: 1234"
                v-model="form.otp"
              />
              <BaseInput
                id="newPassword"
                label="Kata Sandi Baru"
                type="password"
                placeholder="Minimal 8 karakter"
                v-model="form.newPassword"
              />
              <div class="spacer"></div>
              <BaseButton variant="default" type="submit">
                Simpan Kata Sandi
              </BaseButton>
            </form>
          </div>

          <div v-if="step === 3" class="success-wrapper">
            <div class="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="check-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 class="title center">Berhasil!</h1>
            <p class="subtitle center">
              Kata sandi Anda telah berhasil diperbarui. Silakan masuk menggunakan kata sandi baru.
            </p>
            <div class="spacer"></div>
            <BaseButton variant="default" @click="goToLogin">
              Masuk Sekarang
            </BaseButton>
          </div>

          <p v-if="step !== 3" class="bottom-link">
            <RouterLink to="/login">← Kembali ke Halaman Login</RouterLink>
          </p>

        </div>
      </div>

      <div class="image-column"></div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const step = ref(1)
const form = reactive({
  email: '',
  otp: '',
  newPassword: ''
})

const handleSendCode = () => {
  if (!form.email) return alert('Mohon isi email Anda')
  // Simulasi kirim kode
  console.log('Mengirim kode ke:', form.email)
  step.value = 2
}

const handleReset = () => {
  if (!form.otp || !form.newPassword) return alert('Mohon lengkapi data')
  // Simulasi reset password
  console.log('Password berhasil direset')
  step.value = 3
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* Menggunakan style yang konsisten dengan Login/Register View */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@700&display=swap');

.page-container {
  background-color: #f8f9fa; 
  min-height: 100vh;
}

.auth-layout {
  display: grid;
  grid-template-columns: 1fr; 
  min-height: 100vh;
}

@media (min-width: 1024px) {
  .auth-layout {
    grid-template-columns: 1fr 1fr; 
  }
}

.form-column {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
}

.form-container {
  max-width: 420px;
  width: 100%;
  text-align: left; /* Default rata kiri */
}

.image-column {
  display: none;
  background-color: #eee;
  background-image: url('/src/assets/cats/register-login-bg.png');
  background-size: cover;
  background-position: center;
  border-radius: 2rem;
  margin: 2rem;
}

@media (min-width: 1024px) {
  .image-column {
    display: block; 
  }
}

.title {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem; 
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 0.5rem;
}

.title.center {
  text-align: center;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #555;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.subtitle.center {
  text-align: center;
}

.spacer {
  height: 1.5rem;
}

.bottom-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem; 
  color: #555;
  margin-top: 2rem;
  text-align: center;
}

.bottom-link a {
  color: var(--primary-color, #0b4f4a);
  font-weight: 600;
  text-decoration: none;
}

.bottom-link a:hover {
  text-decoration: underline;
}

/* Styling Khusus State Sukses */
.success-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon-circle {
  width: 80px;
  height: 80px;
  background-color: #0b4f4a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.check-icon {
  width: 40px;
  height: 40px;
}
</style>