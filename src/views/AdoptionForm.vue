<script setup>
import { ref, computed } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import Step1 from './AdoptStep1.vue'
import Step2 from './AdoptStep2.vue'
import Step3 from './AdoptStep3.vue'
import Step4 from './AdoptStep4.vue'
import AdoptSuccess from './AdoptSuccess.vue'

const isSubmitted = ref(false)
const currentStep = ref(1)
const totalSteps = 4
const formData = ref({
  // Step 1
  namaLengkap: '',
  nomorTelepon: '',
  nomorKTP: '',
  mediaSosial: '',
  // Step 2
  tipeTempatTinggal: '',
  izinHewan: null,
  tinggalBersama: [],
  usiaAnak: '',
  punyaPeliharaanLain: null,
  deskripsiPeliharaanLain: '',
  // Step 3
  pernahPelihara: null,
  alasanAdopsi: '',
  bersediaBiaya: null,
  rencanaPindah: '',
  // Step 4
  persetujuan: [],
})

const isStepValid = computed(() => {
  if (currentStep.value === 4) {
    return formData.value.persetujuan.length === 4
  }
  return true 
})

const steps = [
  Step1,
  Step2,
  Step3,
  Step4
]

const currentStepComponent = computed(() => steps[currentStep.value - 1])

const currentTitle = computed(() => {
  if (currentStep.value === 1) return 'Data Diri'
  if (currentStep.value === 2) return 'Kondisi Tempat Tinggal'
  if (currentStep.value === 3) return 'Pengalaman & Komitmen'
  if (currentStep.value === 4) return 'Persetujuan & Konfirmasi'
  return 'Review'
})

const progressStyle = computed(() => {
  const progress = (currentStep.value / totalSteps) * 100
  const visualProgress = Math.max(25, progress)
  return {
    background: `linear-gradient(
      to right,
      #004c46 0%,
      #004c46 ${visualProgress}%,
      #b9ecec ${visualProgress}%,
      #b9ecec 100%
    )`
  }
})

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  } else {
    submitForm()
  }
}

function submitForm() {
  console.log('Form disubmit!', JSON.stringify(formData.value, null, 2))
  isSubmitted.value = true 
  window.scrollTo(0, 0)
}

function handleBackClick() {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    window.history.back()
  }
}
</script>

<template>
  <div>
    <Navbar/>

    <div class="page-container">

      <div v-if="!isSubmitted">
        <div class="step" :class="{ active: currentStep >= 1 }"></div>
        <div class="step" :class="{ active: currentStep >= 2 }"></div>
        <div class="step" :class="{ active: currentStep >= 3 }"></div>
        <div class="step" :class="{ active: currentStep >= 4 }"></div>

        <div class="adoption-form">
          <h2>Bagian {{ currentStep }}: {{ currentTitle }}</h2>
          <div class="section-line" :style="progressStyle"></div>
          <keep-alive>
            <component :is="currentStepComponent" v-model="formData" />
          </keep-alive>
          <div class="button-group">
            <BaseButton 
              variant="outline" 
              color="primary"
              @click="handleBackClick">
              Kembali
            </BaseButton>
            <BaseButton 
              color="primary"
              @click="nextStep"
              :disabled="!isStepValid">
              {{ currentStep === totalSteps ? 'Selesai' : 'Lanjutkan' }}
            </BaseButton>
          </div>
        </div>
      </div>

      <AdoptSuccess v-if="isSubmitted" :catName="adoptedCatName" />

    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600&display=swap');

:root {
  --primary-color: #0b4f4a;
  --primary-light: #b9ecec;
  --text-dark: #222;
  --text-light: #666666;
}

* {
  box-sizing: border-box;
}

.page-container {
  background-color: #f8f8f8;
  padding-top: 1px; 
  min-height: 90vh; 
}

/* Progress Bar Atas */
.progress-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  max-width: 750px;
  margin: 2rem auto 0;
}
.progress-indicator .step {
  height: 10px;
  flex-grow: 1;
  background-color: #e0e0e0;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.progress-indicator .step.active {
  background-color: var(--primary-color);
}

/* Layout Form */
.adoption-form {
  max-width: 750px; 
  margin: 1.5rem auto 3rem;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);

  font-family: 'Noto Sans', sans-serif;
  color: var(--text-light);
}

.adoption-form h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.section-line {
  height: 4px;
  width: 100%;
  border-radius: 2px;
  margin-top: 4px;
  margin-bottom: 2.5rem;
  transition: background 0.4s ease;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  gap: 1rem;
}

.btn-primary.btn-outline:hover {
  background-color: #1a5e5a !important;
  color: white !important;
}

.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
}

.form-field label.field-label {
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--text-light);
  font-size: 0.95rem;
}

.radio-group, .checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
}
</style>