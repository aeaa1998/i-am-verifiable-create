<template>
  <!-- Header  -->
  <div class="w-full relative">
    <div class="w-full h-64 rounded-b-lg" style="background-image: linear-gradient(to right top, #818cf8, #9ba3fb, #b5bbfd, #ced2fe, #e8eaff)" />
    <div class="w-full container mx-auto relative">
      <img :src="renap" class="p-icon" />
    </div>
    <div class="container mx-auto mt-12">
      <h1 class="text-3xl text-primary-800 font-semibold">I AM GT</h1>
      <p class="mt-2 text-sm max-w-[450px] md:max-w-[550px] mb-4 text-justify">
        Bienvenido al portal emitidor de credenciales para la demo I AM GT. Escoge el documento que desees emitir únicamente verificando que tengas todos los requisitos 😁 y disfruta del ya no tener
        más procesos complicados .
      </p>
      <hr class="mb-8" />
      <div class="flex flex-wrap gap-y-8 gap-x-4 md:gap-x-10 lg:gap-x-16 justify-center md:justify-start">
        <!-- Loader section -->
        <template v-if="isLoadingNfts">
          <credential-loader v-for="i in new Array(10).keys()" :key="i" />
        </template>
        <template v-else>
          <credential-card
            v-for="nft in nfts"
            :key="nft.mintAddress ? nft.mintAddress.toBase58() : nft.mint.address.toBase58()"
            :nft="nft"
            @click="router.push(`/credential/${nft.address.toBase58()}`)"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import renap from "@/assets/renap.png";
import { CredentialLoader, CredentialCard } from "@/components/credentials";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const isLoadingNfts = ref(false);

const nfts = computed(() => store.getters.nftsModels);
const router = useRouter();
async function fetchCredentials() {
  isLoadingNfts.value = true;
  await store.dispatch("getNftFromCreator", true);
  isLoadingNfts.value = false;
}

async function fetchMachines() {
  store.dispatch("getCandyMachines");
}

onMounted(async () => {
  fetchMachines();
  fetchCredentials();
});
</script>
<style lang="postcss" scoped>
.p-icon {
  @apply w-44 aspect-square rounded-lg absolute shadow-lg container;
  top: 100%;
  transform: translateY(-80%);
}
</style>