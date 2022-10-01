<template>
  <slot v-bind="scope">
    <v-primary-button class="swv-button swv-button-trigger rounded-full" :disabled="disabled || disconnecting || !wallet" @click="handleClick">
      <wallet-icon v-if="wallet" :wallet="wallet"></wallet-icon>
      <p v-text="content"></p>
    </v-primary-button>
  </slot>
</template>
<script>
import { useWallet, WalletIcon } from "solana-wallets-vue";
export default {
  components: {
    WalletIcon,
  },
  props: {
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const { disabled } = toRefs(props);
    const { wallet, disconnect, disconnecting } = useWallet();

    const content = computed(() => {
      if (disconnecting.value) return "Desconectando ...";
      if (wallet.value) return "Desconectar";
      return "Desconectar la billetera";
    });

    const handleClick = (event) => {
      emit("click", event);
      if (event.defaultPrevented) return;
      disconnect().catch(() => {});
    };

    const scope = {
      wallet,
      disconnecting,
      disabled,
      content,
      handleClick,
    };

    return {
      scope,
      ...scope,
    };
  },
};
</script>