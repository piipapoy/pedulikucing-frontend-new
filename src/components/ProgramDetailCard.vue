<template>
  <div class="program-detail-card">
    <div class="card-image-container">
      <img :src="program.imageUrl" :alt="program.title">
      <span class="card-tag">
        <i class="fas fa-sync-alt"></i> Program Rutin
      </span>
    </div>
    <div class="card-content">
      <h4>{{ program.title }}</h4>
      <p class="program-description">
        Bantuan pakan rutin untuk shelter dan foster parent yang membutuhkan
      </p>
      <ul class="program-perks">
        <li>
            <i class="fas fa-heart"></i> 
            <span><strong>Manfaat:</strong> {{ program.manfaat }}</span>
        </li>
        <li>
            <i class="fas fa-circle"></i> 
            <span><strong>Dampak:</strong> {{ program.dampak }}</span>
        </li>
      </ul>
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <div class="progress-labels">
        <div class="progress-label-left">
          <span>Terkumpul</span>
          <strong>{{ formatCurrency(program.terkumpul) }}</strong>
        </div>
        <div class="progress-label-right">
          <span>{{ progressPercent.toFixed(0) }}%</span>
          <span>Target {{ formatCurrency(program.target) }}</span>
        </div>
      </div>
      <button class="btn btn-primary">Dukung Program Ini</button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  program: {
    type: Object,
    required: true
  }
});
const progressPercent = computed(() => {
  if (props.program.target === 0) return 0;
  return (props.program.terkumpul / props.program.target) * 100;
});
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
</script>
<style scoped>
.program-detail-card {
  width: 100%; 
  max-width: 500px; 
  margin: 40px auto; 
  border: 1px solid var(--primary-color, #008080);
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); 
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.card-image-container {
  position: relative;
}
.program-detail-card img {
  width: 100%;
  height: 250px; 
  object-fit: cover;
  display: block;
}
.card-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--primary-dark, #0A5C5C);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
}
.card-tag i {
  font-size: 12px;
}
.card-content {
  padding: 24px; 
  background-color: var(--secondary-color, #BFEFEA); 
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.card-content h4 {
  font-size: 24px; 
  margin: 0 0 12px 0;
  color: var(--text-color, #333);
}
.program-description {
  font-size: 15px;
  color: var(--text-light, #777);
  margin: 0 0 20px 0;
}
.program-perks {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  font-size: 15px;
  color: var(--text-light, #777);
}
.program-perks li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}
.program-perks li i {
  color: var(--primary-color, #008080); 
  margin-right: 10px;
  margin-top: 4px;
  width: 20px;
  font-size: 18px;
}
.program-perks li:nth-child(2) i {
  font-size: 16px; 
  border: 2px dashed var(--primary-color, #008080);
  border-radius: 50%;
  padding: 2px;
  background-color: transparent;
  color: transparent; 
}
.program-perks li strong {
  color: var(--text-color, #333);
}
.progress-bar {
  background-color: #F0F0F0;
  border-radius: 10px;
  height: 10px; 
  width: 100%;
  overflow: hidden;
  margin-bottom: 12px;
}
.progress-bar-fill {
  background-color: var(--primary-dark, #0A5C5C);
  height: 100%;
  border-radius: 10px;
}
.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 24px;
}
.progress-label-left span,
.progress-label-right span {
  display: block;
  color: var(--text-light, #777);
}
.progress-label-left strong {
  font-size: 18px; 
  color: var(--text-color, #333);
}
.progress-label-right {
  text-align: right;
}
.progress-label-right span:first-child {
  color: var(--primary-color, #008080);
  font-weight: bold;
  font-size: 16px; 
}
.btn-primary {
  background-color: var(--primary-dark, #0A5C5C);
  color: white;
  border: none;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  border-radius: 8px;
  padding: 12px 20px; 
  font-weight: bold;
  font-size: 16px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  margin-top: auto;
}
.btn-primary:hover {
  background-color: #004d4d;
}
</style>