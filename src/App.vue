<template>
  <div>
    <notifications />
    <NavBar class="w-full" />
    <router-view />
  </div>
</template>
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { initWorkspace } from "./composables/useWorkspace";
import { NavBar } from "./components/navbar";

import { initWallet, useWallet } from "solana-wallets-vue";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { initIamVerifiable } from "@/composables/useIAmVerifiable";
import { onMounted, watch } from "vue-demi";
const walletOptions = {
  wallets: [new PhantomWalletAdapter()],
  autoConnect: true,
};

initWallet(walletOptions);
initIamVerifiable();
initWorkspace();
const { wallet, connected } = useWallet();
watch(
  connected,
  async (newValue) => {
    // if (newValue) {
    try {
      // const response = await _axios.post("/validate/requisites", {
      //   wallet: "FfJYJ3FpckJh8d5E4uc3JLuBxx4a3tcbZehWiZGB2PRj",
      // });
    } catch (error) {
      console.log(error);
    }
    // }
  },
  { immediate: true }
);
</script>
<style lang="postcss">
body {
  @apply bg-primary-100/50;
}
</style>
