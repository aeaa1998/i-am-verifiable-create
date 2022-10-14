<template>
  <div class="py-4 px-2">
    <h6 class="text-gray-500">Precio de este dispensador</h6>
    <h2 class="text-primary-700 font-bold text-3xl my-2">{{ amount }}</h2>
    <div class="mb-4">En este dispensador se poseen {{ candyMachine.itemsRemaining.toString() }} disponibles</div>
    <!-- <button
      class="py-3 px-8 rounded-lg text-white"
      :class="{
        'purchase-button': !isInValid,
        'purchase-button-disabled': isInValid,
      }"
      :disabled="isInValid"
      @click="purchaseNft"
    >
      {{ buttonText }}
    </button> -->
    <IAmVerifiableButton
      class="py-3 px-8 rounded-lg text-white"
      :class="{
        'purchase-button': !isInValid,
        'purchase-button-disabled': isInValid,
      }"
      :disabled="isInValid"
      v-model:isVerifying="isVerifying"
      @verification:failed="validationFailed"
      @verification:succeded="purchaseNft"
      :requisites="requisites ?? []"
    >
      {{ buttonText }}
    </IAmVerifiableButton>
  </div>
</template>
<script setup>
import { formatAmount } from "@metaplex-foundation/js";
import { computed, ref, toRefs } from "vue";
import { useIamVerification, useNftsOfUser, normalizeNft } from "i-am-verifiable-button/src/useIAmVerifiable";
import IAmVerifiableButton from "i-am-verifiable-button";
// import "i-am-verifiable-button/src/css/main.css";
import { useWorkspace, getKeyPair } from "@/composables/useWorkspace";
import { amountToNumber } from "@/composables/useAmount";
import { notify } from "@kyvg/vue3-notification";
import { useStore } from "vuex";
import { useWallet } from "solana-wallets-vue";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";

const emit = defineEmits(["purchase:started", "purchase:succeded", "purchase:ended"]);
const store = useStore();
const props = defineProps(["candyMachine", "requisites", "nft", "disabledExternal"]);
const { candyMachine, nft, disabledExternal } = toRefs(props);
const isVerifying = ref(false);
const isPurchasing = ref(false);
const amount = computed(() => formatAmount(candyMachine.value.price));
const { connected } = useWallet();
const { nftsOfUser, isFetchingNftsOfUser } = useNftsOfUser();
const nftsCollectionAddress = computed(() => (nftsOfUser.value ? nftsOfUser.value.map((n) => n.collection.address.toBase58()) : []));
const alreadyPurchased = computed(() => nftsCollectionAddress.value.includes(nft.value.address.toBase58()));
const isInValid = computed(() => isFetchingNftsOfUser.value || isVerifying.value || isPurchasing.value || !connected.value || alreadyPurchased.value || disabledExternal.value);
const verifyButton = async () => {
  isVerifying.value = true;
  const value = await useIamVerification(props.requisites ?? []);
  isVerifying.value = false;
  return value;
};

const validationFailed = () => {
  notify({
    type: "error",
    title: "No se poseen los requisitos necesarios para poder comprar esta credencial.",
  });
};

const purchaseNft = async () => {
  const { metaplex, connectionConfirm: connection } = useWorkspace();
  const { publicKey } = getKeyPair();
  isPurchasing.value = true;
  const { wallet, sendTransaction, publicKey: _walletPub } = useWallet();
  emit("purchase:started");
  // const isValid = await verifyButton();
  const isValid = true;
  if (isValid) {
    try {
      const userId = wallet.value;

      let transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: _walletPub.value,
          toPubkey: publicKey,
          //We the price in sols
          lamports: LAMPORTS_PER_SOL * amountToNumber(candyMachine.value.price),
          // lamports: 1,
        })
      );

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });

      const result = await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
      if (result.value.err) {
        notify({
          type: "error",
          title: "Ocurrio un error al generar la credencial si los problemas persisten refresca la página.",
        });
      } else {
        const response = await _axios.post("mint/nft", {
          candyMachine: candyMachine.value.address,
          wallet: _walletPub.value,
        });

        nftsOfUser.value.push(normalizeNft(response.data.nft));
        emit("purchase:succeded", candyMachine);
        notify({
          type: "success",
          title: "Se ha comprado con éxito la credencial.",
        });
      }
    } catch (error) {
      if (error.name && error.name.toLowerCase() == "metaplexerror" && error.cause.message.toLowerCase().includes("attempt to debit an account but found no record of a prior credit")) {
        notify({
          type: "error",
          title: "No se tiene el suficiente crédito para comprar la credencial.",
        });
      } else {
        notify({
          type: "error",
          title: "Ocurrio un error al generar la credencial si los problemas persisten refresca la página.",
        });
        //Refresh the candy machine
        const updatedCandyMachine = await metaplex.value.candyMachines().refresh(candyMachine.value).run();
        const key = updatedCandyMachine.address.toBase58();
        store.state.credentials.candyMachinesMapped[key] = updatedCandyMachine;
      }
    }
  } else {
    validationFailed();
  }
  isPurchasing.value = false;
  emit("purchase:ended");
};

const buttonText = computed(() => {
  if (alreadyPurchased.value) {
    return "Ya se tiene la credencial";
  }
  if (isVerifying.value) {
    return "Verificando";
  }
  if (isPurchasing.value) {
    return "Procesando";
  }
  return "Comprar credencial";
});
</script>
<style scoped lang="postcss">
.purchase-button {
  @apply bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-800 shadow-lg shadow-primary-500/50 dark:shadow-lg dark:shadow-primary-800/80;
}

.purchase-button-disabled {
  @apply bg-gray-400;
}
</style>