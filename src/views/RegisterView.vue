<template>
  <div class="page-container">
    <div class="auth-layout">
      <div class="form-column">
        <div class="form-container">
          <h1 class="title">Selamat Datang 👋</h1>
          <p class="subtitle">Mulai perjalanan Anda dalam menyelamatkan kucing Indonesia.</p>
          
          <form @submit.prevent="handleRegister">
            <BaseInput
              id="name"
              label="Nama Lengkap"
              type="text"
              placeholder="Nama Panggilan / Lengkap"
              v-model="name"
            />

            <BaseInput
              id="email"
              label="Email"
              type="email"
              placeholder="Contoh@email.com"
              v-model="email"
            />
            
            <BaseInput
              id="password"
              label="Password"
              type="password"
              placeholder="Minimal 8 karakter"
              v-model="password"
            />
            
            <div class="spacer"></div>

            <BaseButton variant="default" type="submit">
              Daftar Sekarang
            </BaseButton>
          </form>
          
          <div class="separator">Or</div>
          
          <div class="social-buttons">
            <SocialButton>
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.657-3.657-11.303-8H6.306C9.656,35.663,16.318,40,24,40z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </template>
              Masuk dengan Google
            </SocialButton>
            <SocialButton>
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                  <path fill="#fff" d="M26.572,29.036h-5.457v-14.209h5.457c0,0,0-2.28,0-4.028c0-2.062,0.915-4.09,4.408-4.09h3.763v5.278h-2.373c-2.25,0-2.848,1.039-2.848,2.984V29.036z"></path>
                </svg>
              </template>
              Masuk dengan Facebook
            </SocialButton>
          </div>
          <p class="bottom-link">
            Sudah punya akun? <RouterLink to="/login">Masuk</RouterLink>
          </p>
        </div>
      </div>
      <div class="image-column">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import SocialButton from '../components/SocialButton.vue'

export default {
  name: 'RegisterView',
  components: {
    BaseInput,
    BaseButton,
    SocialButton,
    RouterLink
  },
  setup() {
    const router = useRouter()
    const name = ref('') // State Nama
    const email = ref('')
    const password = ref('')
    
    const handleRegister = () => {
      console.log('Registering:', name.value, email.value, password.value)
      // Simulasi sukses -> pindah ke login
      router.push('/login')
    }
    
    return {
      name,
      email,
      password,
      handleRegister
    }
  }
}
</script>

<style scoped>
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
  text-align: center;
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
  text-align: left;
}
.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #555;
  margin-bottom: 2.5rem;
  text-align: left;
  line-height: 1.6;
}
.spacer {
  height: 1.5rem;
}
.separator {
  font-family: 'Inter', sans-serif;
  color: #aaa;
  font-size: 0.875rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #ddd;
}
.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.bottom-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem; 
  color: #555;
  margin-top: 2.5rem;
}
.bottom-link a {
  color: var(--primary-color, #0b4f4a);
  font-weight: 600;
  text-decoration: none;
}
.bottom-link a:hover {
  text-decoration: underline;
}
</style>