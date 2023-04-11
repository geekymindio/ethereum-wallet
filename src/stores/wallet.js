import { defineStore } from 'pinia'
import { getBalance, getTransactions, sendNewTransaction } from '@/services/wallet.service'


export const useWalletStore = defineStore({
  id: 'wallet',
  state: () => ({
    privateWalletKey: '',
    publicWalletKey: '',
    decryptedKeystore: null,
    balance: 0.0,
    transactionHistory: []
  }),
  actions: {
    init() {
     getBalance(this.decryptedKeystore.address).then((amount) => this.balance = amount)
     getTransactions(this.privateWalletKey, this.decryptedKeystore.address).then((transactions) => {
      console.log('transactions', transactions)
      this.transactionHistory = transactions
     })
    },
    async parseEncryptedKeystore(keystore) {
      this.decryptedKeystore = keystore
      this.publicWalletKey = keystore.publicKey
      this.privateWalletKey = keystore.privateKey
    },
    sendTransaction(address, amount) {
      return sendNewTransaction(this.privateWalletKey, address, amount)
    }
  },
  getters: {
    getMyBalance: (state) => state.balance,
    orderTransactionsByLatest: (state) => state.transactionHistory.sort((x,y) =>  y.timestamp - x.timestamp )
  }
})