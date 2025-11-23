import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import AdoptionDetailView from '../views/AdoptionDetailView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import CommunityView from '../views/CommunityView.vue'
import AdoptionForm from '../views/AdoptionForm.vue'
import AdoptionGallery from '../views/AdoptionGallery.vue'
import ReportForm from '../views/ReportForm.vue'
import DonationPage from '../views/DonationPage.vue'
import DonationDetail from '../views/DonationDetail.vue'
import ClosestClinicView from '../views/ClosestClinicView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ProfileView from '../views/ProfileView.vue'
import EditProfileView from '../views/EditProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/profile/edit',
      name: 'edit-profile',
      component: EditProfileView
    },
    {
      path: '/adopsi',
      name: 'adoption-gallery',
      component: AdoptionGallery
    },
    {
      path: '/adopsi/:id',
      name: 'adoption-detail',
      component: AdoptionDetailView
    },
    {
      path: '/adopsi/:id/form',
      name: 'adoption-form',
      component: AdoptionForm
    },
    {
      path: '/lapor',
      name: 'report-form',
      component: ReportForm
    },
    {
      path: '/klinik-terdekat',
      name: 'closest-clinic',
      component: ClosestClinicView
    },
    {
      path: '/donasi',
      name: 'donation-page',
      component: DonationPage
    },
    {
      path: '/donasi/:id',
      name: 'donation-detail',
      component: DonationDetail
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/lupa-sandi',
      name: 'forgot-password',
      component: ForgotPasswordView
    },
    {
      path: '/komunitas',
      name: 'community',
      component: CommunityView
    }
  ]
})
export default router