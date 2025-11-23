import { reactive } from 'vue'

const API_URL = '/api'

export const authStore = reactive({
  isAuthenticated: false,
  user: null,
  token: null,

  // Cek apakah ada token tersimpan saat aplikasi dibuka
  init() {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      this.token = storedToken
      this.user = JSON.parse(storedUser)
      this.isAuthenticated = true
    }
  },

  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal')
      }

      // Simpan data dari backend
      this.token = data.token
      this.user = data.user
      this.isAuthenticated = true

      // Simpan ke storage browser
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      return true // Berhasil
    } catch (error) {
      console.error('Login Error:', error)
      throw error // Lempar error biar bisa ditangkap di View
    }
  },

  async register(fullName, email, password) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registrasi gagal')
      }

      return true // Berhasil
    } catch (error) {
      console.error('Register Error:', error)
      throw error
    }
  },

  logout() {
    this.isAuthenticated = false
    this.user = null
    this.token = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
})