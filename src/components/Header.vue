<template>
  <header
    class="flex justify-between items-center py-1 px-6 bg-gray-900 lg:hidden"
  >
    <div class="flex items-center">
      <button @click="toggleMenu" class="text-white focus:outline-none">
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="flex mx-4 lg:mx-0">
        <img src="/icon.svg" class="w-8" alt="XQPedia" />

        <span class="text-white text-xl mx-2 my-auto font-semibold"
          >XQPEDIA</span
        >
      </div>
    </div>

    <div class="flex items-center"></div>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>
