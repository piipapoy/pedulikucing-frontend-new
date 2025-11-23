import { reactive } from 'vue'

export const chatStore = reactive({
  isOpen: false,
  selectedRoom: null,

  // Fungsi untuk membuka widget, opsional langsung masuk ke room chat
  openChat(roomData = null) {
    this.isOpen = true
    if (roomData) {
      // Simulasi: Menyiapkan data room chat
      this.selectedRoom = {
        id: roomData.id || 99, // ID dummy jika baru
        name: roomData.name || 'Admin',
        avatar: roomData.avatar || '/src/assets/cats/shelter-1.png',
        lastMessage: 'Halo, ada yang bisa kami bantu?',
        time: 'Baru saja',
        unread: 0
      }
    }
  },

  closeChat() {
    this.isOpen = false
  },

  closeRoom() {
    this.selectedRoom = null
  }
})