<template>
  <div class="image-gallery">
    <div class="main-image-container">
      <img :src="images[currentImageIndex]" alt="Main Cat Image" class="main-image">
      
      <!-- Tombol Love: Gunakan isLiked dari Props -->
      <button 
        @click.stop="$emit('toggle-love')" 
        :class="['love-button', { 'loved': isLiked }]"
        aria-label="Add to favorites"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          :fill="isLiked ? '#0b4f4a' : 'none'" 
          :stroke="isLiked ? '#0b4f4a' : 'currentColor'" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.31l-0.77-0.73a5.4 5.4 0 0 0-7.65 0C1.83 7.03 1.83 11.23 4.28 13.68L12 22l7.72-8.32c2.45-2.45 2.45-6.65 0-9.1Z"/>
        </svg>
      </button>
    </div>
    <div class="thumbnail-gallery">
      <img 
        v-for="(image, index) in images" 
        :key="index" 
        :src="image" 
        :class="{ 'thumbnail': true, 'active': index === currentImageIndex }"
        @click="currentImageIndex = index"
        alt="Cat Thumbnail"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    isLiked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-love'],
  data() {
    return {
      currentImageIndex: 0
    };
  }
};
</script>

<style scoped>
:root {
  --primary-color: #0b4f4a; 
}
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.main-image-container {
  position: relative; 
  width: 100%;
  padding-top: 75%;
  background-color: #ffffff;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #eee;
}
.main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumbnail-gallery {
  display: flex;
  gap: 0.75rem; 
  justify-content: flex-start; 
  overflow-x: auto; 
  padding-bottom: 0rem;
}
.thumbnail {
  width: 80px; 
  height: 60px; 
  object-fit: cover;
  border-radius: 0.375rem; 
  cursor: pointer;
  border: 2px solid transparent; 
  transition: border-color 0.2s ease-in-out;
}
.thumbnail.active {
  border-color: #0b4f4a; 
}
.love-button {
  position: absolute;
  top: 1rem; 
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.9); 
  border: none;
  border-radius: 50%;
  width: 40px; 
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15); 
  transition: transform 0.2s ease-in-out;
  z-index: 10;
  padding: 0; 
}
.love-button:hover {
  transform: scale(1.1); 
}
.love-button svg {
  width: 22px; 
  height: 22px;
  transition: fill 0.2s ease-in-out;
  color: #555; /* Default color sebelum liked */
}
</style>