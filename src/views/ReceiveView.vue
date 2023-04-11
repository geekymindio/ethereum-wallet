<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useWalletStore } from "@/stores/wallet"

const router = useRouter();

const goBack = () => {
  router.back();
}

const wallet = useWalletStore()
const publicWalletKey = wallet.decryptedKeystore.address

const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(publicWalletKey);
      alert('Copied');
    } catch($e) {
      alert('Cannot copy');
    }
}


</script>

<template>
  <div>
    <div class="wallet-header">
    <img class="" :src="['https://chart.googleapis.com/chart?chs=220x220&cht=qr&chl=' + publicWalletKey]" />
    {{ publicWalletKey.length }}
    <div class="wallet-buttons">
      <div class="input-group">
        <label>Your wallet address:</label>
        <input class="input-control" readonly :value="publicWalletKey" />
      </div>
      <button @click="copyWallet" class="primary-btn">Copy the wallet address</button>
      <button @click="goBack" class="secondary-btn">Go Back</button>
    </div>
  </div>
  </div>
</template>s