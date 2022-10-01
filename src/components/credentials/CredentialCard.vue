<template>
  <div
    @click="(e) => (isAvailable ? $emit('click', e) : e)"
    class="w-64 h-72 rounded-lg flex flex-col bg-white/60 backdrop-filter backdrop-blur-lg shadow"
    :class="{
      'cursor-pointer': nft.model != 'metadata' && isAvailable,
      'cursor-not-allowed': !isAvailable,
    }"
  >
    <img :src="imageSrc" v-if="imageSrc" class="rounded-t-lg h-48 w-full object-contain bg-primary-200" />
    <div v-else class="rounded-t-lg bg-gray-500 h-48 w-full" />

    <div class="text-black text-gray px-1 py-1">
      <div class="text-sm font-bold h-8 flex flex-col">
        {{ nft.name }}
      </div>
      <div v-if="description" class="text-xs">
        {{ description }}
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRef, toRefs } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useWorkspace } from "@/composables/useWorkspace";
export default {
  props: ["nft"],
  setup(props) {
    const store = useStore();
    const { nft } = toRefs(props);
    const json = computed(() => nft.value.json);
    const isLoadingMetadata = ref(false);
    const isLoadingTransactions = ref(false);
    const { wallet } = useWorkspace();
    const styleBg = computed(() => {
      //If the json is ther
      if (nft.value.json) {
        return {
          "background-image": `url(${nft.value.json.image})`,
        };
      }
      return {};
    });

    const imageSrc = computed(() => {
      return nft.value.json ? nft.value.json.image : null;
    });

    const description = computed(() => (json.value ? json.value.description : null));

    const isAvailable = computed(() => wallet.value != null && wallet.value != undefined);

    return {
      styleBg,
      description,
      imageSrc,
      description,
      nft,
      isAvailable,
    };
  },
};
</script>