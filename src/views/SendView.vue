<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useWalletStore } from "@/stores/wallet"

const wallet = useWalletStore()
const router = useRouter()
const address = ref('')
const amount = ref(0)

const goBack = () => {
  router.back()
}

const send = () => {
  const transaction = wallet.sendTransaction(address.value, amount.value).then((transaction) => {
    address.value = ''
    amount.value = 0
  });
}

</script>

<template>
  <div>
    <img class="wallet-logo" src="@/assets/images/logo.png" />

    <div class="wallet-buttons">
      <div class="input-group">
        <label>Receiver Address</label>
        <input v-model="address" class="input-control" placeholder="Enter receiver address..." />
      </div>
      <div class="input-group">
        <label>Amount (ETH):</label>
        <input type="number" step="0.1" v-model="amount" class="input-control" placeholder="Enter eth amount..." />
      </div>
      <button @click="send" class="send-wallet primary-btn">Send</button>
      <button @click="goBack" class="secondary-btn">Go Back</button>
    </div>
  </div>
</template>