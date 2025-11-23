<template>
  <div>
    <p class="story-text">{{ displayedText }}</p>
    <a 
      v-if="isLongText" 
      href="#" 
      class="read-more-link" 
      @click.prevent="toggleExpansion"
    >
      {{ isExpanded ? 'Tutup' : 'Baca Selengkapnya' }}
    </a>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  maxWords: {
    type: Number,
    default: 30, 
  },
});
const isExpanded = ref(false);
const words = computed(() => props.text.split(' '));
const isLongText = computed(() => {
  return words.value.length > props.maxWords;
});
const displayedText = computed(() => {
  if (!isLongText.value || isExpanded.value) {
    return props.text;
  }
  return words.value.slice(0, props.maxWords).join(' ') + '...';
});
const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
<style scoped>
.story-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-light, #777);
  margin: 0;
  white-space: pre-wrap;
}
.read-more-link {
  text-decoration: none;
  color: var(--primary-color, #008080);
  font-weight: bold;
  margin-top: 10px;
  display: inline-block;
}
</style>