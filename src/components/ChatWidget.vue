<template>
  <div class="chat-widget-container">
    
    <button v-if="!chatStore.isOpen" class="chat-bubble-btn" @click="chatStore.isOpen = true">
      <span class="notification-badge">2</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span class="label">Chat</span>
    </button>

    <div v-else class="chat-window">
      
      <div v-if="!chatStore.selectedRoom" class="view-list h-full flex-col">
        <div class="chat-header">
          <h3>Pesan</h3>
          <button class="close-chat" @click="chatStore.isOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="chat-room-list">
          <div 
            v-for="room in chatRooms" 
            :key="room.id" 
            class="chat-room-item" 
            :class="{ 'unread': room.unread > 0 }"
            @click="chatStore.openChat(room)"
          >
            <img :src="room.avatar" alt="Avatar" class="room-avatar">
            <div class="room-info">
              <div class="room-top">
                <h4 class="room-name">{{ room.name }}</h4>
                <span class="room-time">{{ room.time }}</span>
              </div>
              <div class="room-bottom">
                <p class="room-preview">{{ room.lastMessage }}</p>
                <span v-if="room.unread > 0" class="unread-badge">{{ room.unread }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="view-room h-full flex-col">
        <div class="chat-header room-header">
          <button class="back-btn" @click="chatStore.selectedRoom = null">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div class="header-info">
            <h4 class="header-name">{{ chatStore.selectedRoom.name }}</h4>
            <span class="header-status">Online</span>
          </div>
          <button class="close-chat" @click="chatStore.isOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div v-if="currentStatus" class="status-banner" :class="currentStatus.style">
          <span class="status-icon">
            <i v-if="currentStatus.style === 'success'" class="fas fa-check-circle"></i> <i v-else class="fas fa-info-circle"></i> <svg v-if="currentStatus.style === 'success'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </span>
          <div class="status-content">
            <strong>{{ currentStatus.title }}</strong>
            <span>{{ currentStatus.desc }}</span>
          </div>
        </div>

        <div class="messages-area" ref="messagesContainer">
          <template v-if="activeMessages.length > 0">
             <div 
                v-for="(msg, index) in activeMessages" 
                :key="index" 
                :class="['message-bubble', msg.sender === 'me' ? 'my-message' : 'their-message']"
             >
                <p>{{ msg.text }}</p>
                <span class="msg-time">{{ msg.time }}</span>
             </div>
          </template>
          <div v-else class="empty-chat-state">
             <p>Ketik <strong>"1"</strong> untuk mulai simulasi Adopsi.</p>
          </div>
        </div>

        <div class="input-area">
          <input 
            type="text" 
            v-model="newMessage" 
            placeholder="Ketik pesan..." 
            @keyup.enter="sendMessage"
          >
          <button class="send-btn" @click="sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed, reactive } from 'vue'
import { chatStore } from '../store/chatStore.js'

const newMessage = ref('')
const messagesContainer = ref(null)

const chatRooms = ref([
  {
    id: 1,
    name: 'Rumah Kucing Jakarta',
    avatar: '/src/assets/cats/shelter-1.png',
    lastMessage: 'Halo kak, apakah Bella masih tersedia?',
    time: '10:30',
    unread: 2
  },
  {
    id: 2,
    name: 'Klinik Hewan Sehat',
    avatar: '/src/assets/cats/shelter-2.png',
    lastMessage: 'Jadwal vaksinasi Toby dikonfirmasi.',
    time: 'Kemarin',
    unread: 0
  },
  {
    id: 3,
    name: 'Komunitas Peduli',
    avatar: '/src/assets/cats/shelter-3.png',
    lastMessage: 'Terima kasih atas donasinya!',
    time: 'Kemarin',
    unread: 0
  }
])

// State Status per Room
const roomStatuses = reactive({
  1: { title: 'Menunggu Respon', desc: 'Pengajuan adopsi sedang ditinjau.', style: 'warning' },
  2: { title: 'Reservasi Dikonfirmasi', desc: 'Datang sesuai jadwal ya.', style: 'info' }
})

const currentStatus = computed(() => {
  if (!chatStore.selectedRoom) return null
  return roomStatuses[chatStore.selectedRoom.id] || null
})

const dummyMessages = ref({
  1: [
    { sender: 'me', text: 'Halo, selamat pagi.', time: '10:00' },
    { sender: 'me', text: 'Saya tertarik dengan Bella.', time: '10:01' },
    { sender: 'them', text: 'Halo kak! Terima kasih sudah menghubungi kami.', time: '10:05' },
  ]
})

const activeMessages = computed(() => {
  if (!chatStore.selectedRoom) return []
  return dummyMessages.value[chatStore.selectedRoom.id] || []
})

function sendMessage() {
  const text = newMessage.value.trim()
  if (!text) return
  
  const roomId = chatStore.selectedRoom.id
  if (!dummyMessages.value[roomId]) dummyMessages.value[roomId] = []
  
  // 1. Push Pesan User
  dummyMessages.value[roomId].push({
    sender: 'me',
    text: text,
    time: getCurrentTime()
  })
  
  newMessage.value = ''
  scrollToBottom()
  
  // 2. LOGIKA SIMULASI STATUS
  setTimeout(() => {
    let responseText = '';

    if (text === '1') {
      roomStatuses[roomId] = { title: 'Tahap Screening', desc: 'Admin sedang memeriksa profil Anda.', style: 'info' }
      responseText = 'Halo Kak! 👋 Boleh tau di rumah ada hewan peliharaan lain?';
    } else if (text === '2') {
      roomStatuses[roomId] = { title: 'Interview Terjadwal', desc: 'Sabtu, 10:00 WIB via Google Meet.', style: 'warning' }
      responseText = 'Jadwal interview sudah kami set ya kak. Link akan dikirim nanti.';
    } else if (text === '3') {
      roomStatuses[roomId] = { title: 'Menunggu Meet & Greet', desc: 'Silakan datang ke shelter untuk kenalan.', style: 'warning' }
      responseText = 'Wawancara lancar! Kapan bisa main ke shelter buat liat Bella?';
    } else if (text === '4') {
      roomStatuses[roomId] = { title: 'ADOPSI DISETUJUI 🎉', desc: 'Selamat! Dokumen adopsi telah siap.', style: 'success' }
      responseText = 'Selamat ya kak! Pengajuan adopsi kakak untuk Bella sudah kami setujui.';
    } else {
      responseText = 'Terima kasih, pesan kakak sudah kami terima (Auto-reply).';
    }

    dummyMessages.value[roomId].push({
      sender: 'them',
      text: responseText,
      time: getCurrentTime()
    })
    scrollToBottom()
  }, 600)
}

function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.chat-widget-container {
  position: fixed; bottom: 30px; right: 30px; z-index: 9999; font-family: 'Inter', sans-serif;
}
.h-full { height: 100%; }
.flex-col { display: flex; flex-direction: column; }

/* Bubble Button */
.chat-bubble-btn {
  background-color: #0b4f4a; color: white; border: none; border-radius: 99px; padding: 12px 24px;
  display: flex; align-items: center; gap: 10px; cursor: pointer;
  box-shadow: 0 4px 15px rgba(11, 79, 74, 0.3); transition: transform 0.2s;
}
.chat-bubble-btn:hover { transform: scale(1.05); }
.label { font-weight: 600; font-size: 1rem; }
.notification-badge {
  position: absolute; top: -5px; right: -5px; background-color: #dc2626; color: white;
  font-size: 0.75rem; font-weight: 700; width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; border: 2px solid white;
}

/* Chat Window */
.chat-window {
  background-color: white; width: 360px; height: 500px; border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15); overflow: hidden; border: 1px solid #eee;
  display: flex; flex-direction: column; animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* Header */
.chat-header {
  background-color: #0b4f4a; color: white; padding: 16px;
  display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
}
.chat-header h3 { margin: 0; font-size: 1.1rem; font-weight: 600; }
.close-chat, .back-btn { background: none; border: none; color: white; cursor: pointer; opacity: 0.9; padding: 0; }
.room-header { padding: 12px 16px; gap: 10px; }
.header-info { flex: 1; overflow: hidden; }
.header-name { margin: 0; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.header-status { font-size: 0.75rem; opacity: 0.8; display: block; }

/* STATUS BANNER */
.status-banner {
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}
.status-banner.warning { background-color: #fff7ed; border-left: 4px solid #f97316; }
.status-banner.info { background-color: #eff6ff; border-left: 4px solid #3b82f6; }
.status-banner.success { background-color: #ecfdf5; border-left: 4px solid #10b981; }

.status-icon { font-size: 1.2rem; display: flex; align-items: center; }
.warning .status-icon { color: #f97316; }
.info .status-icon { color: #3b82f6; }
.success .status-icon { color: #10b981; }

.status-content { display: flex; flex-direction: column; }
.status-content strong { font-size: 0.85rem; color: #333; }
.status-content span { font-size: 0.75rem; color: #666; }

/* List Chat */
.chat-room-list { flex: 1; overflow-y: auto; background-color: #fff; }
.chat-room-item { display: flex; gap: 12px; padding: 16px; border-bottom: 1px solid #f5f5f5; cursor: pointer; }
.chat-room-item:hover { background-color: #f9fafb; }
.room-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1px solid #eee; }
.room-info { flex: 1; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
.room-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
.room-name { margin: 0; font-size: 0.95rem; font-weight: 600; color: #333; }
.room-time { font-size: 0.75rem; color: #888; }
.room-bottom { display: flex; justify-content: space-between; align-items: center; }
.room-preview { margin: 0; font-size: 0.85rem; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
.unread .room-name { font-weight: 700; }
.unread-badge { background-color: #dc2626; color: white; font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 99px; }

/* Messages Area */
.messages-area {
  flex: 1; padding: 16px; background-color: #f0f2f5;
  overflow-y: auto; display: flex; flex-direction: column; gap: 10px;
}
.empty-chat-state { text-align: center; color: #888; font-size: 0.9rem; margin-top: 20px; }

/* Bubbles */
.message-bubble {
  max-width: 75%; padding: 10px 14px; border-radius: 12px;
  font-size: 0.9rem; line-height: 1.4; position: relative; word-wrap: break-word;
}
.message-bubble p { margin: 0; }
.msg-time { font-size: 0.65rem; display: block; margin-top: 4px; text-align: right; opacity: 0.7; }

.my-message { align-self: flex-end; background-color: #dcf8c6; color: #333; border-bottom-right-radius: 2px; }
.their-message { align-self: flex-start; background-color: white; color: #333; border-bottom-left-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }

/* Input */
.input-area { padding: 12px; background-color: white; border-top: 1px solid #eee; display: flex; gap: 10px; align-items: center; }
.input-area input { flex: 1; padding: 10px 14px; border-radius: 20px; border: 1px solid #ddd; font-size: 0.95rem; outline: none; background-color: #f9f9f9; }
.input-area input:focus { background-color: white; border-color: #0b4f4a; }
.send-btn { background-color: #0b4f4a; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
</style>