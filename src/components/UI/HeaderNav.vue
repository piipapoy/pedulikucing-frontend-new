<template>
  <nav class="header-nav">
    <div class="logo">
      <router-link to="/">Peduli Kucing</router-link> 
    </div>
    <div class="nav-links">
      <router-link to="/komunitas">Komunitas</router-link>
      <router-link to="/adopsi">Adopsi</router-link>
      <router-link to="/tentang-kami">Tentang Kami</router-link>
    </div>
    <div class="nav-actions">
      <router-link to="/" class="btn-donate">Donasi</router-link>
      <router-link to="/login" class="btn-login">Masuk / Daftar</router-link>
    </div>
  </nav>
</template>
<style scoped>
.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  border-bottom: 1px solid #eee;
}
.logo { font-size: 1.2rem; font-weight: bold; }
.logo a, .nav-links a {
  text-decoration: none;
  color: #333;
  margin: 0 10px;
}
.nav-actions .btn-donate, .nav-actions .btn-login {
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  color: white;
  background-color: #00796B;
  margin-left: 10px;
}
.nav-actions .btn-login {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}
</style>