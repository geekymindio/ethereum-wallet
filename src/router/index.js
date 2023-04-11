import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateWalletView from '../views/CreateWalletView.vue'
import AccessWalletView from '../views/AccessWalletView.vue'
import TransactionsView from '../views/TransactionsView.vue'
import ReceiveView from '../views/ReceiveView.vue'
import SendView from '../views/SendView.vue'
import { useWalletStore } from '../stores/wallet'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false },
      beforeEnter() {
        const wallet = useWalletStore()
        if (wallet.privateWalletKey && wallet.publicWalletKey && wallet.decryptedKeystore) {
          return {name: 'transactions'}
        }
      }
    },
    {
      path: '/create-wallet',
      name: 'create-wallet',
      component: CreateWalletView,
      meta: { requiresAuth: false },
      beforeEnter() {
        const wallet = useWalletStore()
        if (wallet.privateWalletKey && wallet.publicWalletKey && wallet.decryptedKeystore) {
          return {name: 'transactions'}
        }
      }
    },
    {
      path: '/access-wallet',
      name: 'access-wallet',
      component: AccessWalletView,
      meta: { requiresAuth: false },
      beforeEnter() {
        const wallet = useWalletStore()
        if (wallet.privateWalletKey && wallet.publicWalletKey && wallet.decryptedKeystore) {
          return {name: 'transactions'}
        }
      }
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/send',
      name: 'send',
      component: SendView,
      meta: { requiresAuth: true }
    },
    {
      path: '/receive',
      name: 'receive',
      component: ReceiveView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from) => {
  const wallet = useWalletStore()
  if (to.meta.requiresAuth && !wallet.privateWalletKey && !wallet.publicWalletKey) {
    return {name: 'access-wallet'}
  }
})


export default router
