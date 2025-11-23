import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <-- IMPOR INI
// import pinia (nanti)

// Impor CSS Global lo (kalo ada, misal tempat nyimpen variabel warna)
// import './assets/main.css' 

const app = createApp(App)

app.use(router) // <-- PAKE INI
// app.use(pinia) (nanti)

app.mount('#app')