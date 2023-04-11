<script setup>

import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { createWallet } from "@/services/wallet.service"

const password = ref()

const router = useRouter()

const route = useRoute()

const newWallet = async () => {
  if(confirm('Please save the file in safe place, if you lost it, you will never be able to access your funds, did you save it?')) {
    createWallet(password.value).then((json) => {
      password.value = ''
    })
  }
};


const goBack = () => {
  router.back()
}

</script>

<template>
  <div>
    <img class="wallet-logo" src="@/assets/images/logo.png" />

    <div class="wallet-buttons">
      <input type="password" v-model="password" class="input-control" placeholder="Enter your password..." />
      <button @click="newWallet" class="create-wallet primary-btn">Create Wallet</button>
      <button @click="goBack" class="secondary-btn">Go Back</button>
    </div>
  </div>
</template>