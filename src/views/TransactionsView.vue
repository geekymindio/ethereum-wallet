<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useWalletStore } from "@/stores/wallet"
import { ethers } from "ethers"

const wallet = useWalletStore()
const router = useRouter();

const balance = ref(0)


const goToSend = () => { router.push({ name: 'send'}) }
const goToReceive = () => { router.push({ name: 'receive'}) }

onMounted(() => {
  wallet.init()
})

</script>

<template>
  <div>

    <div class="wallet-header">
      <img class="wallet-logo" src="@/assets/images/logo.png" />
      
      <div class="balance-info">
          <h1>{{ Number(wallet.getMyBalance).toFixed(4) }} ETH</h1>
      </div>
    </div>

    <div class="transaction-buttons">
      <button @click="goToSend" class="create-wallet primary-btn">Send</button>
      <button @click="goToReceive" class="secondary-btn">Receive</button>
    </div>

    <div class="transactions-list">
      <ul>
        <li v-for="(transaction, key) in wallet.orderTransactionsByLatest" :key="key">
          <div class="transaction">
            <div class="transaction-meta">
              <h2>{{ transaction.from == wallet.decryptedKeystore.address ?  'SENT' : 'RECEIVED' }}</h2>
              <p>{{  transaction.hash  }}</p>
            </div>
            <div class="transaction-value">{{ Number(ethers.utils.formatEther(transaction.value)).toFixed(4) }} ETH</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>