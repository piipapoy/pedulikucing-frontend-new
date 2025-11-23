import { reactive } from 'vue'

export const donationModalStore = reactive({
  isOpen: false,
  donation: null,

  open(data) {
    this.donation = data
    this.isOpen = true
  },

  close() {
    this.isOpen = false
    this.donation = null
  }
})