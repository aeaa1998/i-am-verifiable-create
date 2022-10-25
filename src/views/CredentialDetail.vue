<template>
  <div class="container mx-auto flex flex-wrap py-8">
    <!-- NFT is fetching -->
    <div class="w-full" v-if="isFetchingNft">
      <lottie-player
        class="self-center mt-4 mx-auto"
        src="https://assets9.lottiefiles.com/packages/lf20_usmfx6bp.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
      <div class="text-xl font-semibold text-center mt-2">Cargando Credencial</div>
    </div>
    <!-- NFT not found -->
    <template v-else-if="!nft">
      <div class="mx-auto">
        <lottie-player
          class="self-center mt-4 mx-auto"
          src="https://assets4.lottiefiles.com/private_files/lf30_e3pteeho.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px"
          loop
          autoplay
        ></lottie-player>
        <div class="text-xl font-semibold text-center mt-2">Hubo un error al cargar la credencial por favor prueba de nuevo</div>
      </div>
    </template>

    <template v-else>
      <!-- Image and description -->
      <div class="flex flex-wrap w-full md:w-2/5 lg:w-2/6 gap-y-8">
        <img :src="imageSrc" v-if="imageSrc" class="credential-cover" />
        <div v-else class="credential-cover" />
        <!-- Description -->
        <div class="w-full rounded-lg border border-slate-300 overflow-clip">
          <div class="text-lg p-3 text-center font-bold border-b border-slate-300">Descripción</div>
          <div class="text-base p-3 w-full bg-slate-300/20">{{ nft.json.description }}</div>

          <div class="text-lg p-3 text-center font-bold border-y border-slate-300">Requisitos</div>
          <div class="text-base w-full bg-slate-300/20 p-3">
            <template v-if="isFetchingRequisited">Cargando requisitos</template>
            <ul class="list-disc list-outside px-3" v-else-if="requisites.length">
              <li v-for="requisite in requisites" :key="requisite.address.toBase58()">{{ requisite.name }}</li>
            </ul>
            <div v-else>No tiene requisitos</div>
          </div>
        </div>
      </div>
      <div class="px-8 w-full md:w-3/5 lg:w-4/6">
        <div class="flex flex-col gap-y-4">
          <h1 class="text-3xl font-bold">{{ nft.name }}</h1>
          <h1 class="text-base font-light">hecho por RENAP</h1>
          <div class="w-full rounded-lg border border-slate-300 overflow-clip">
            <h1 class="text-xl p-3 text-center font-bold border-b border-slate-300">Configuración</h1>
            <div class="text-base p-3 w-full bg-slate-300/20">{{ expirationText }}</div>
          </div>
          <div class="w-full rounded-lg border border-slate-300 overflow-clip">
            <div class="text-lg p-3 text-center font-bold border-b border-slate-300">Detalles de compra</div>
            <div class="text-base p-3 w-full bg-slate-300/20">
              <v-spinner v-if="isFetchingCandyMachines" />
              <div v-else-if="!candyMachines.length">No hay opciónes de compra por el momento</div>
              <div class="flex flex-wrap" v-else>
                <candy-machine-buy-row
                  :disabledExternal="disabledExternal"
                  class="border-b border-gray-300 last:border-b-0 md:w-full lg:w-1/2 xl:w-1/3"
                  v-for="candyMachine in candyMachines"
                  @purchase:started="disabledExternal = true"
                  @purchase:ended="disabledExternal = false"
                  @purchase:succeded="() => refreshCandyMachine(candyMachine)"
                  :key="candyMachine.address.toBase58()"
                  :candyMachine="candyMachine"
                  :nft="nft"
                  :requisites="nft.json.requisites ?? []"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { PublicKey } from "@solana/web3.js";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// import { useRequisites, useNftsOfUser } from "@/composables/useIAmVerifiable";
import { useRequisites, useNftsOfUser } from "i-am-verifiable-button/src/useIAmVerifiable";
import { CandyMachineBuyRow } from "@/components/candyMachine";
import { useWorkspace } from "@/composables/useWorkspace";

const route = useRoute();
const store = useStore();
const nftAddress = route.params.address;

const isFetchingNft = ref(false);
const disabledExternal = ref(false);
const isFetchingCandyMachines = ref(false);
const nft = computed(() => store.getters.nftsMapped[nftAddress]);
const { requisites, isFetchingRequisited } = useRequisites(nft);
const { nftsOfUser, isFetchingNftsOfUser } = useNftsOfUser();
const expirationText = computed(() => {
  if (nft.value.json && nft.value.json.expiration) {
    const expiration = nft.value.json.expiration;
    return `La credencial expira ${expiration.years} años, ${expiration.months} meses y ${expiration.days} días despues de su emisión`;
  }
  return "Esta credencial no expira";
});
const imageSrc = computed(() => {
  return nft.value && nft.value.json ? nft.value.json.image : null;
});

const candyMachinesMintMapped = computed(() => store.getters.candyMachinesMintMapped);
const candyMachines = computed(() => {
  if (nft.value) {
    const key = nft.value.mint.address.toBase58();
    if (key in candyMachinesMintMapped.value) {
      return candyMachinesMintMapped.value[key].filter((candyMachine) => {
        //Only where available
        return parseInt(candyMachine.itemsRemaining.toString()) > 0;
      });
    }
  }
  return [];
});

const refreshCandyMachine = async (candyMachine) => {
  const key = typeof candyMachine.collectionMintAddress == "string" ? candyMachine.collectionMintAddress : candyMachine.collectionMintAddress.toBase58();
  const { metaplex } = useWorkspace();
  const updated = metaplex.value.candyMachinesV2().refresh(candyMachine);
  store.dispatch("updateCandyMachine", updated);
};

const getNftFromMintAddress = async () => {
  isFetchingNft.value = true;
  await store.dispatch("getNftFromMintAddress", new PublicKey(nftAddress));
  isFetchingNft.value = false;
};

const fetchMachines = async () => {
  isFetchingCandyMachines.value = true;
  await store.dispatch("getCandyMachines", nftAddress);
  isFetchingCandyMachines.value = false;
};

onMounted(async () => {
  if (!nft.value) {
    await getNftFromMintAddress();
    fetchMachines();
  } else {
    fetchMachines();
  }
});
</script>
<style scoped lang="postcss">
.credential-cover {
  @apply rounded-lg w-full aspect-[8/9] object-contain bg-primary-200 shadow;
}
</style>