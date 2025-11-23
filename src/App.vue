<template>
  <Navbar />

  <RouterView />

  <ChatWidget v-if="authStore.isAuthenticated" />

</template>

<script>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import ChatWidget from './components/ChatWidget.vue'
import { authStore } from './store/authStore.js'

export default {
  components: {
    RouterView,
    Navbar,
    ChatWidget
  },
  setup() {
    return { authStore }
  }
}
</script>

<style>
/* CSS Global */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Source Serif Pro', serif;
  background-color: #f8f9fa;
}

:root {
  --primary-color: #0b4f4a; 
  --text-color: #2d2d2d;
  --bg-color: #ffffff;
  --bg-color-light: #f8f9fa;
}
</style>