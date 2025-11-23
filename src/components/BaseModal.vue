<template>
  <Transition name="fade">
    <div 
      v-if="show" 
      class="modal-backdrop" 
      @click.self="$emit('close')"
    >
      <div class="modal-content" @click.stop>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: Boolean
  },
  emits: ['close']
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  
  /* UBAH DI SINI: */
  align-items: flex-start; /* Supaya mulai dari atas, bukan tengah */
  padding-top: 6rem;       /* Beri jarak dari atas (di bawah navbar) */
  
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 90%;
  
  /* Sesuaikan max-height agar muat dengan padding atas baru */
  max-height: 85vh; 
  
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
}
.modal-content::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>