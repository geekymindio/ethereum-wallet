<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useWalletStore } from "@/stores/wallet";
import { ethers } from "ethers";

const router = useRouter();
const keystore = ref();
const password = ref();
const wallet = useWalletStore();
const decryptedKeystore = ref("");

const goBack = () => {
  router.back();
};


onMounted(async () => {
  window.navigator.vibrate([200, 100, 200]);
})


const handleKeystoreFile = async () => {
  const reader = new FileReader();
  reader.onload = async (res) => {
    const json = res.target.result;
    const encryptedWallet = await ethers.Wallet.fromEncryptedJsonSync(
      json,
      password.value
    );
    await wallet.parseEncryptedKeystore(encryptedWallet);
    password.value = "";


    router.replace('/transactions')
  };

  reader.readAsText(keystore.value.files[0]);
};


</script>

<template>
  <div>
    <img class="wallet-logo" src="@/assets/images/logo.png" />


    <div class="wallet-buttons">
      <input v-model="password" type="password" class="input-control" placeholder="Enter your password..." />
      <input
        name="keystore"
        @change="handleKeystoreFile()"
        ref="keystore"
        class="input-control"
        type="file"
        accept=".json"
        placeholder="Enter your keystore..."
      />
      <button @click="goBack" class="secondary-btn">Go back</button>
    </div>
  </div>
</template>