<template>
  <div class="loader ease-linear rounded-full border-4 border-t-4 h-12 w-12 border-gray-400" :class="color"></div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "border-t-primary-400",
    },
  },
};
</script>
<style scoped >
.loader {
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
