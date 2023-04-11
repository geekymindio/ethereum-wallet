<script setup>
import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

const accessWallet = () => {
    router.push({
      name: 'access-wallet',
      query: {
        ...route.query,
      },
    })

}

const createWallet = () => {
    router.push({
      name: 'create-wallet',
      query: {
        ...route.query,
      },
    })
}

</script>

<template>
  <div>
    <img class="wallet-logo" src="@/assets/images/logo.png" />

    <div class="wallet-buttons">
      <button @click="accessWallet" class="access-wallet primary-btn">Access Wallet</button>
      <button @click="createWallet" class="create-wallet secondary-btn">Create Wallet</button>
    </div>
  </div>
</template>