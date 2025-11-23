<template>
  <div class="step-content">
    <div class="upload-area" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop" @click="triggerFileInput">
      <div class="upload-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="upload-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
      </div>
      <p class="upload-text">Klik untuk upload foto</p>
      <p class="upload-subtext">atau drag and drop foto di sini</p>
      <input type="file" multiple accept="image/*,video/*" ref="fileInput" @change="handleFileChange" style="display: none;">
    </div>
    <div v-if="uploadedFiles.length" class="file-list">
        <span class="file-count">{{ uploadedFiles.length }} dari 5 foto terunggah.</span>
    </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const fileInput = ref(null)
const uploadedFiles = ref([])
const MAX_FILES = 5;
function triggerFileInput() {
  fileInput.value.click()
}
function handleFileChange(event) {
  processFiles(event.target.files)
}
function handleDragOver(event) {
  event.target.classList.add('drag-over')
}
function handleDragLeave(event) {
    event.target.classList.remove('drag-over')
}
function handleDrop(event) {
  processFiles(event.dataTransfer.files)
  event.target.classList.remove('drag-over')
}
function processFiles(files) {
  const remainingSlots = MAX_FILES - uploadedFiles.value.length;
  if (remainingSlots <= 0) {
    alert(`Maksimal ${MAX_FILES} file telah tercapai.`);
    return;
  }
  const filesToUpload = Array.from(files).slice(0, remainingSlots);
  filesToUpload.forEach(file => {
      if (uploadedFiles.value.length < MAX_FILES) {
          uploadedFiles.value.push(file)
      }
  })
  if (fileInput.value) {
      fileInput.value.value = '';
  }
  console.log('Files siap diunggah:', uploadedFiles.value);
}
</script>
<style scoped>
.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 3rem 1rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
  cursor: pointer;
  background-color: #f9fafb;
  transition: border-color 0.2s, background-color 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.upload-area:hover, .upload-area.drag-over {
  border-color: #0f766e;
  background-color: #ecfdf5;
}
.upload-icon-wrapper {
  background-color: #e5e7eb;
  border-radius: 50%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
}
.upload-icon {
  width: 32px;
  height: 32px;
  color: #6b7280;
}
.upload-text {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}
.upload-subtext {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0.2rem 0 0;
}
.file-list {
    margin-top: -0.5rem;
}
.file-count {
    font-size: 0.85rem;
    color: #0f766e;
    font-weight: 500;
}
</style>