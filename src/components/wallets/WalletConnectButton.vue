<template>
  <slot v-bind="scope">
    <v-primary-button class="swv-button swv-button-trigger rounded-full" :disabled="disabled || !wallet || connecting || connected" @click="onClick">
      <wallet-icon v-if="wallet" :wallet="wallet"></wallet-icon>
      <p v-text="content"></p>
    </v-primary-button>
  </slot>
</template>
<script>
import { computed, defineComponent, toRefs } from "vue";
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
    const { wallet, connect, connecting, connected } = useWallet();

    const content = computed(() => {
      if (connecting.value) return "Conectando ...";
      if (connected.value) return "Conectado";
      if (wallet.value) return "Conectar";
      return "Conectar billetera";
    });

    const onClick = (event) => {
      emit("click", event);
      if (event.defaultPrevented) return;
      connect().catch(() => {});
    };

    const scope = {
      wallet,
      disabled,
      connecting,
      connected,
      content,
      onClick,
    };

    return {
      scope,
      ...scope,
    };
  },
};
</script>
