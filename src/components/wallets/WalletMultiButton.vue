<template>
  <wallet-multi-button-impl>
    <template #default="modalScope">
      <button v-if="!wallet" class="swv-button swv-button-trigger" @click="modalScope.openModal">Seleccionar billetera</button>
      <wallet-connect-button v-else-if="!publicKeyBase58"></wallet-connect-button>
      <div v-else class="swv-dropdown">
        <slot name="dropdown-button" v-bind="{ ...modalScope }">
          <v-primary-button
            class="swv-button swv-button-trigger rounded-full px-4"
            :style="{ pointerEvents: dropdownOpened ? 'none' : 'auto' }"
            :aria-expanded="dropdownOpened"
            :title="publicKeyBase58"
            @click="openDropdown"
          >
            <wallet-icon :wallet="wallet"></wallet-icon>
            <p v-text="publicKeyTrimmed"></p>
          </v-primary-button>
        </slot>
        <slot name="dropdown" v-bind="{ ...modalScope }">
          <ul aria-label="dropdown-list" class="swv-dropdown-list" :class="{ 'swv-dropdown-list-active': dropdownOpened }" ref="dropdownPanel" role="menu">
            <slot name="dropdown-list" v-bind="{ ...modalScope }">
              <li v-if="canCopy" @click="copyAddress" class="swv-dropdown-list-item" role="menuitem">
                {{ addressCopied ? "Copiado" : "Copiar dirección de la billetera" }}
              </li>
              <li
                @click="
                  modalScope.openModal();
                  closeDropdown();
                "
                class="swv-dropdown-list-item"
                role="menuitem"
              >
                Cambia de billetera
              </li>
              <li @click="disconnect" class="swv-dropdown-list-item" role="menuitem">Desconectar</li>
            </slot>
          </ul>
        </slot>
      </div>
    </template>
  </wallet-multi-button-impl>
</template>
<script>
import { useWallet, WalletIcon, WalletMultiButton } from "solana-wallets-vue";
import WalletConnectButton from "./WalletConnectButton.vue";
import { onClickOutside, useClipboard } from "@vueuse/core";
import { computed, ref } from "vue";
export default {
  inheritAttrs: false,
  components: {
    WalletIcon,
    WalletConnectButton,
    WalletMultiButtonImpl: WalletMultiButton,
  },
  setup() {
    //state
    const dropdownPanel = ref(null);
    const { publicKey, wallet, disconnect } = useWallet();

    const dropdownOpened = ref(false);
    const openDropdown = () => (dropdownOpened.value = true);
    const closeDropdown = () => (dropdownOpened.value = false);
    onClickOutside(dropdownPanel, closeDropdown);
    //Computed
    const publicKeyBase58 = computed(() => publicKey.value?.toBase58());
    const publicKeyTrimmed = computed(() => {
      if (!wallet.value || !publicKeyBase58.value) return null;
      return publicKeyBase58.value.slice(0, 4) + ".." + publicKeyBase58.value.slice(-4);
    });
    const { copy, copied: addressCopied, isSupported: canCopy } = useClipboard();
    const copyAddress = () => publicKeyBase58.value && copy(publicKeyBase58.value);

    return {
      wallet,
      disconnect,
      publicKey,
      publicKeyBase58,
      canCopy,
      publicKeyTrimmed,
      addressCopied,
      dropdownOpened,
      openDropdown,
      closeDropdown,
      copyAddress,
      dropdownPanel,
    };
  },
};
</script>