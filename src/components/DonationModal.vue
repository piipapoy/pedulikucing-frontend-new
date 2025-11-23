<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <button v-if="currentStep !== 'showSuccess'" class="close-btn" @click="closeModal">
        X
      </button>

      <div v-if="currentStep === 'selectAmount'" class="step-container">
        <div class="modal-header">
          <i class="fas fa-hand-holding-heart"></i>
          <h2>Masukkan Nominal Donasi</h2>
        </div>
        <div class="steps">
          <span class="step active">1</span>
          <span class="step-divider"></span>
          <span class="step">2</span>
          <span class="step-divider"></span>
          <span class="step">3</span>
        </div>
        <div class="amount-options">
          <button class="amount-btn" :class="{ active: selectedAmount === 50000 }" @click="selectAmount(50000)">Rp 50.000</button>
          <button class="amount-btn" :class="{ active: selectedAmount === 100000 }" @click="selectAmount(100000)">Rp 100.000</button>
          <button class="amount-btn" :class="{ active: selectedAmount === 200000 }" @click="selectAmount(200000)">Rp 200.000</button>
          <button class="amount-btn" :class="{ active: selectedAmount === 500000 }" @click="selectAmount(500000)">Rp 500.000</button>
        </div>
        <input type="number" placeholder="Jumlah Lain (Rp)" class="custom-amount-input" v-model.number="customAmount" @input="handleCustomInput">
        <button class="btn btn-primary" @click="goToSelectMethod">Lanjutkan ke Pembayaran</button>
      </div>

      <div v-if="currentStep === 'selectMethod'" class="step-container">
        <div class="modal-header">
          <i class="fas fa-wallet"></i>
          <h2>Pilih Metode Pembayaran</h2>
        </div>
        <div class="steps">
          <span class="step complete">1</span>
          <span class="step-divider"></span>
          <span class="step active">2</span>
          <span class="step-divider"></span>
          <span class="step">3</span>
        </div>
        <div class="payment-options">
          <label class="payment-option"><input type="radio" name="payment" v-model="selectedPayment" value="transfer"><span>Transfer Bank</span></label>
          <label class="payment-option"><input type="radio" name="payment" v-model="selectedPayment" value="qris"><span>QRIS (GoPay, OVO, ShopeePay)</span></label>
          <label class="payment-option"><input type="radio" name="payment" v-model="selectedPayment" value="virtual"><span>Virtual Account</span></label>
        </div>
        <div class="donation-summary">
          <h4>Rincian Donasi</h4>
          <div class="summary-row"><span>Jumlah Donasi</span><strong>{{ formatCurrency(finalAmount) }}</strong></div>
          <div class="summary-row"><span>Biaya Administrasi</span><strong>Rp 0</strong></div>
          <div class="summary-row total"><span>Total Pembayaran</span><strong>{{ formatCurrency(finalAmount) }}</strong></div>
        </div>
        <div class="button-group">
          <button class="btn btn-secondary" @click="currentStep = 'selectAmount'">Kembali</button>
          <button class="btn btn-primary" @click="goToPaymentScreen">Lanjut</button>
        </div>
      </div>

      <div v-if="currentStep === 'showQRIS'" class="step-container">
        <div class="modal-header"><i class="fas fa-qrcode"></i><h2>Scan QR Code</h2></div>
        <div class="steps">
          <span class="step complete">1</span><span class="step-divider"></span>
          <span class="step complete">2</span><span class="step-divider"></span>
          <span class="step active">3</span>
        </div>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ContohDonasi" alt="QR Code Donasi" class="qr-code-image">
        <div class="summary-row total simple">
          <span>Ringkasan Donasi</span><strong>{{ formatCurrency(finalAmount) }}</strong>
        </div>
        <button class="btn btn-primary" @click="markAsPaid">Cek Status</button>
      </div>

      <div v-if="currentStep === 'selectBank'" class="step-container">
        <div class="modal-header"><i class="fas fa-university"></i>
          <h2>Pilih Bank {{ selectedPayment === 'virtual' ? 'Virtual Account' : 'Tujuan' }}</h2>
        </div>
        <div class="steps">
          <span class="step complete">1</span><span class="step-divider"></span>
          <span class="step complete">2</span><span class="step-divider"></span>
          <span class="step active">3</span>
        </div>
        <div class="payment-options">
          <button class="payment-option bank" @click="selectBank('BCA')">Bank BCA</button>
          <button class="payment-option bank" @click="selectBank('Mandiri')">Bank Mandiri</button>
          <button class="payment-option bank" @click="selectBank('BRI')">Bank BRI</button>
        </div>
        <div class="button-group">
          <button class="btn btn-secondary" @click="currentStep = 'selectMethod'">Kembali</button>
        </div>
      </div>

      <div v-if="currentStep === 'showInstructions'" class="step-container">
        <div class="modal-header"><i class="fas fa-file-invoice-dollar"></i><h2>Instruksi Pembayaran</h2></div>
        <div class="steps">
          <span class="step complete">1</span><span class="step-divider"></span>
          <span class="step complete">2</span><span class="step-divider"></span>
          <span class="step active">3</span>
        </div>
        <div v-if="selectedPayment === 'virtual'" class="payment-details">
          <p>Selesaikan pembayaran ke nomor Virtual Account di bawah ini:</p>
          <div class="payment-info-box">
            <span>{{ bankDetails[selectedBank]?.name }} Virtual Account</span>
            <strong>{{ bankDetails[selectedBank]?.vaNumber }}</strong>
          </div>
        </div>
        <div v-if="selectedPayment === 'transfer'" class="payment-details">
          <p>Mohon transfer manual ke rekening di bawah ini:</p>
          <div class="payment-info-box">
            <span>{{ bankDetails[selectedBank]?.name }}</span>
            <strong>{{ bankDetails[selectedBank]?.accountNumber }}</strong>
            <span>a/n Yayasan Peduli Kucing</span>
          </div>
        </div>
        <div class="donation-summary">
          <div class="summary-row total"><span>Total Pembayaran</span><strong>{{ formatCurrency(finalAmount) }}</strong></div>
        </div>
        <div class="button-group">
          <button class="btn btn-secondary" @click="currentStep = 'selectBank'">Pilih Bank Lain</button>
          <button class="btn btn-primary" @click="markAsPaid">Saya Sudah Bayar</button>
        </div>
      </div>

      <div v-if="currentStep === 'showSuccess'" class="step-container success-view">
        <div class="icon-wrapper-large">
           <img src="/src/assets/Ceklis.png" alt="Sukses" class="success-img" />
        </div>
        
        <h2 class="success-title">Donasi Berhasil Dikirim!</h2>
        
        <p class="success-description">
          Terima kasih atas donasi anonim Anda sebesar <strong>{{ formatCurrency(finalAmount) }}</strong> 
          untuk <strong>{{ donationModalStore.donation?.title || 'Kasus Ini' }}</strong>.
          Setiap rupiah yang Anda berikan akan langsung membantu proses penyembuhan.
        </p>

        <button class="btn btn-primary full-width" @click="closeModalAndNavigate">
          Bantu Kasus Lain
        </button>

        <div class="recommendation-box">
          <div class="rec-header">
              <img src="/src/assets/Saran.png" alt="Saran" class="icon-saran" />
              <h4>Saran untuk Anda</h4>
          </div>
          <p class="rec-text">
            Buat akun PeduliKucing untuk melacak status donasi Anda, 
            mendapat notifikasi update, dan menandai urgensi jika Anda ingin 
            menjadi donatur.
          </p>
          <div class="rec-buttons">
            <button class="btn btn-primary" @click="goToRegister">Daftar Akun</button>
            <button class="btn btn-secondary" @click="closeModal">Nanti Saja</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { donationModalStore } from '../store/donationModalStore.js';
import { useRouter } from 'vue-router';

const router = useRouter(); 
const currentStep = ref('selectAmount');
const selectedAmount = ref(100000);
const customAmount = ref(null);
const finalAmount = ref(0);
const selectedPayment = ref('qris'); 
const selectedBank = ref(null); 

const bankDetails = ref({
  'BCA': { name: 'Bank BCA', vaNumber: '8808 1234 5678', accountNumber: '123-456-7890' },
  'Mandiri': { name: 'Bank Mandiri', vaNumber: '9001 1234 5678', accountNumber: '456-789-0123' },
  'BRI': { name: 'Bank BRI', vaNumber: '7777 1234 5678', accountNumber: '789-012-3456' },
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(value);
};

const selectAmount = (amount) => {
  selectedAmount.value = amount;
  customAmount.value = null; 
};

const handleCustomInput = () => {
  selectedAmount.value = null; 
};

const goToSelectMethod = () => {
  const amount = selectedAmount.value || customAmount.value;
  if (amount && amount > 0) {
    finalAmount.value = amount;
    currentStep.value = 'selectMethod';
  } else {
    alert('Silakan masukkan nominal donasi');
  }
};

const goToPaymentScreen = () => {
  if (!selectedPayment.value) {
    alert('Silakan pilih metode pembayaran');
    return;
  }
  if (selectedPayment.value === 'qris') {
    currentStep.value = 'showQRIS';
  } else if (selectedPayment.value === 'transfer' || selectedPayment.value === 'virtual') {
    currentStep.value = 'selectBank';
  }
};

const selectBank = (bankName) => {
  selectedBank.value = bankName;
  currentStep.value = 'showInstructions';
};

const markAsPaid = () => {
  currentStep.value = 'showSuccess'; 
};

const closeModal = () => {
  donationModalStore.close();
  // Reset state
  setTimeout(() => {
    currentStep.value = 'selectAmount';
    selectedAmount.value = 100000;
    customAmount.value = null;
    finalAmount.value = 0;
    selectedPayment.value = 'qris';
    selectedBank.value = null;
  }, 300);
};

const closeModalAndNavigate = () => {
  closeModal(); 
  router.push('/donasi'); 
};

const goToRegister = () => {
  closeModal();
  router.push('/register'); 
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@600;700&display=swap');

/* Base Styles */
.modal-backdrop {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.6); display: flex;
  justify-content: center; align-items: center; z-index: 1000;
  backdrop-filter: blur(2px);
}
.modal-content {
  position: relative; background: white; padding: 24px 32px;
  border-radius: 16px; width: 90%; max-width: 450px;
  max-height: 90vh; overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
/* Sembunyikan scrollbar */
.modal-content::-webkit-scrollbar { display: none; }
.modal-content { -ms-overflow-style: none; scrollbar-width: none; }

.close-btn {
  position: absolute; top: 15px; right: 15px; background: none;
  border: none; font-size: 20px; color: #888; cursor: pointer; z-index: 1001;
}
.close-btn:hover { color: #333; }

.step-container {
  display: flex; flex-direction: column;
  align-items: center; gap: 20px; width: 100%;
}

/* Header */
.modal-header { text-align: center; }
.modal-header i { font-size: 32px; color: #0b4f4a; margin-bottom: 10px; }
.modal-header h2 { margin: 0; font-family: 'Source Serif Pro', serif; font-size: 1.5rem; color: #2d2d2d; }

/* Stepper */
.steps { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.step {
  width: 28px; height: 28px; border-radius: 50%;
  background-color: #f0f0f0; color: #999;
  display: grid; place-items: center; font-weight: 600; font-size: 0.85rem;
}
.step.active { background-color: #0b4f4a; color: white; }
.step.complete { background-color: #0b4f4a; color: white; opacity: 0.8; }
.step-divider { width: 40px; height: 2px; background-color: #f0f0f0; }

/* Amount Options */
.amount-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
.amount-btn {
  padding: 12px; border: 1px solid #e0e0e0;
  background-color: white; border-radius: 8px; cursor: pointer;
  font-size: 0.9rem; font-weight: 500; transition: all 0.2s;
}
.amount-btn.active, .amount-btn:hover {
  border-color: #0b4f4a; background-color: #f0fafa;
  color: #0b4f4a; font-weight: 600;
}
.custom-amount-input {
  width: 100%; padding: 12px; border: 1px solid #e0e0e0;
  border-radius: 8px; font-size: 0.95rem; outline: none;
}
.custom-amount-input:focus { border-color: #0b4f4a; }

/* Buttons */
.btn {
  width: 100%; padding: 12px; border-radius: 999px;
  font-size: 1rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; font-family: 'Inter', sans-serif;
}
.btn-primary {
  background-color: #0b4f4a; color: white; border: none;
}
.btn-primary:hover { background-color: #083b37; }
.btn-secondary {
  background-color: white; color: #0b4f4a;
  border: 2px solid #0b4f4a;
}
.btn-secondary:hover { background-color: #f0fafa; }

/* Payment Options */
.payment-options { width: 100%; display: flex; flex-direction: column; gap: 10px; }
.payment-option {
  width: 100%; padding: 14px; border: 1px solid #e0e0e0;
  border-radius: 8px; display: flex; align-items: center; gap: 10px; cursor: pointer;
}
.payment-option:hover { background-color: #f9f9f9; border-color: #bbb; }
.payment-option input[type="radio"] { accent-color: #0b4f4a; width: 18px; height: 18px; }
.payment-option span { font-weight: 500; color: #333; }
.payment-option.bank { justify-content: center; font-weight: 600; color: #0b4f4a; }

/* Summary & Details */
.donation-summary {
  width: 100%; padding: 16px; background-color: #f9f9f9;
  border-radius: 8px; border: 1px solid #eee;
}
.donation-summary h4 {
  margin: 0 0 10px 0; padding-bottom: 10px;
  border-bottom: 1px dashed #ddd; font-size: 0.95rem; color: #555;
}
.summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: #666; }
.summary-row.total { font-weight: 700; font-size: 1rem; margin-top: 10px; color: #0b4f4a; border-top: 1px solid #eee; padding-top: 10px; }

.qr-code-image {
  width: 180px; height: 180px; border: 1px solid #eee;
  border-radius: 8px; padding: 10px;
}

.payment-info-box {
  width: 100%; padding: 16px; border: 1px dashed #0b4f4a;
  background-color: #f0fafa; border-radius: 8px; text-align: center;
}
.payment-info-box span { display: block; font-size: 0.85rem; color: #666; }
.payment-info-box strong { font-size: 1.2rem; color: #0b4f4a; margin: 5px 0; display: block; }

/* --- SUCCESS STEP STYLING --- */
.success-view {
  text-align: center;
  padding-top: 1rem;
}
.icon-wrapper-large {
  width: 80px; height: 80px; margin: 0 auto 1rem;
  display: flex; align-items: center; justify-content: center;
}
.success-img { width: 100%; height: 100%; object-fit: contain; }

.success-title {
  font-family: 'Source Serif Pro', serif; font-size: 1.75rem;
  font-weight: 700; color: #2d2d2d; margin: 0 0 0.5rem 0;
}
.success-description {
  font-family: 'Inter', sans-serif; font-size: 0.95rem;
  color: #555; line-height: 1.6; margin-bottom: 1.5rem;
}
.success-description strong { color: #0b4f4a; }

.full-width { width: 100%; }

.recommendation-box {
  width: 100%; background-color: #E0F2F1; /* Warna teal muda */
  border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem;
  text-align: center;
}
.rec-header {
  display: flex; align-items: center; justify-content: center;
  gap: 0.5rem; margin-bottom: 0.5rem;
}
.icon-saran { width: 24px; height: 24px; }
.rec-header h4 {
  margin: 0; font-size: 1rem; font-weight: 700; color: #00695C;
}
.rec-text {
  font-size: 0.85rem; color: #004D40; line-height: 1.5; margin-bottom: 1.25rem;
}
.rec-buttons {
  display: flex; gap: 10px;
}
.rec-buttons .btn { font-size: 0.9rem; padding: 10px; }
</style>