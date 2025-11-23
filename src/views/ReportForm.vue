<template>
  <div>
    <div class="page-container">
      
      <ReportSuccess v-if="formSubmitted" @later="resetForm" @register="handleRegister" />
      
      <div class="report-form-card" v-else>
        <div class="header-section">
          <img src="/src/assets/LogoReport.png" alt="Lonceng Alarm" class="header-icon-bell">
          <h1>Lapor Kucing Darurat</h1>
          <p>Setiap menit berharga. Tim relawan kami siap membantu 24/7.</p>
        </div>

        <div class="progress-info">
          <h2>Langkah {{ currentStep }}: {{ stepTitles[currentStep] }}</h2>
          <div class="section-line" :style="progressStyle"></div>
        </div>

        <div class="form-body">
          <StepUpload v-if="currentStep === 1" />
          <StepLocation v-else-if="currentStep === 2" />
          <StepCondition v-else-if="currentStep === 3" />
          <StepContact v-else-if="currentStep === 4" />
        </div>

        <div class="button-group">
          <BaseButton 
            v-if="currentStep > 1" 
            variant="outline" 
            @click="prevStep">
            Kembali
          </BaseButton>
          
          <div v-else></div> 

          <BaseButton 
            variant="default" 
            @click="nextStep">
            {{ currentStep === 4 ? 'Kirim Laporan' : 'Lanjut' }}
          </BaseButton>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import BaseButton from '../components/BaseButton.vue'
import StepUpload from '../components/StepUpload.vue'
import StepLocation from '../components/StepLocation.vue'
import StepCondition from '../components/StepCondition.vue'
import StepContact from '../components/StepContact.vue'
import ReportSuccess from '../components/ReportSuccess.vue'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 4
const formSubmitted = ref(false)

const stepTitles = {
    1: 'Upload Foto/Video', 
    2: 'Tandai Lokasi', 
    3: 'Deskripsi Kondisi', 
    4: 'Kontak Pelapor', 
}

// Logic Progress Bar (Persis AdoptionForm)
const progressStyle = computed(() => {
  const progress = (currentStep.value / totalSteps) * 100
  const visualProgress = Math.max(25, progress)
  return {
    background: `linear-gradient(
      to right,
      #0b4f4a 0%,
      #0b4f4a ${visualProgress}%,
      #b9ecec ${visualProgress}%,
      #b9ecec 100%
    )`
  }
})

function nextStep() {
    if (currentStep.value < 4) {
        currentStep.value++
    } else {
        formSubmitted.value = true
        window.scrollTo(0, 0) // Scroll ke atas saat sukses
    }
}

function prevStep() {
    if (currentStep.value > 1) {
        currentStep.value--
    }
}

function resetForm() {
    currentStep.value = 1
    formSubmitted.value = false
    router.push('/')
}

function handleRegister() {
    router.push('/register')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap');

/* Menggunakan style container yang sama dengan AdoptionForm */
.page-container {
  background-color: #f8f8f8;
  padding-top: 1px; 
  min-height: 90vh; 
  font-family: 'Noto Sans', sans-serif;
}

.report-form-card {
  max-width: 750px; 
  margin: 1.5rem auto 3rem; /* Centering menggunakan margin auto */
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);
  color: #666666;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.header-icon-bell {
  width: 40px;
  height: 40px;
  margin-bottom: 0.5rem;
}

.header-section h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 0.5rem;
}

.header-section p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

/* Progress Info */
.progress-info h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #222;
  text-align: left;
}

.section-line {
  height: 4px;
  width: 100%;
  border-radius: 2px;
  margin-top: 4px;
  margin-bottom: 2.5rem;
  transition: background 0.4s ease;
}

.form-body {
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  gap: 1rem;
}

/* Style tombol agar tidak terlalu lebar di desktop */
.button-group :deep(.base-button) {
  width: auto;
  min-width: 150px;
}
</style>