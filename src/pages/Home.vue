<template>
  <div>
    <div class="flex flex-wrap justify-between">
      <div class="w-full sm:w-1/2 flex content-center px-3">
        <div class="mx-auto my-auto max-w-sm">
          <h1 class="text-white text-4xl font-medium text-center font-semibold">
            Nâng cao kỳ nghệ cùng XQPedia
          </h1>
          <div class="flex flex-wrap mt-6 text-center">
            <div class="w-1/2">
              <a
                @click="startPuzzle"
                class="cursor-pointer block hover:bg-gray-900 rounded-md p-4"
              >
                <img
                  src="/images/prac.svg"
                  class="block max-w-xs"
                  alt="Cờ thế"
                />
                <p class="mt-2 font-semibold text-lg">Cờ thế</p>
              </a>
            </div>
            <div class="w-1/2">
              <route-link
                to="/toc-chien"
                class="block hover:bg-gray-900 rounded-md p-4"
              >
                <img src="/images/flash.svg" class="block" alt="Tốc chiến" />
                <p class="mt-2 font-semibold text-lg">Tốc chiến</p>
              </route-link>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden sm:block sm:w-1/2">
        <img src="/logo.jpg" alt="XQPEDIA" class="mx-auto max-w-sm w-full" />
      </div>
    </div>

    <div class="mt-8 text-center bg-gray-900 rounded-md px-3 py-5">
      <p class="text-xl uppercase">Khiêu chiến</p>
      <div class="flex flex-wrap mt-5 max-w-3xl mx-auto">
        <div class="w-1/2 md:w-1/4">
          <route-link to="/xom" class="block hover:bg-gray-700 rounded-md p-4">
            <img
              src="/images/ama.svg"
              class="block max-w-xs"
              alt="Vô địch xóm"
            />
            <p class="mt-2 font-semibold text-lg">Vô địch xóm</p>
          </route-link>
        </div>
        <div class="w-1/2 md:w-1/4">
          <route-link
            to="/huyen"
            class="block hover:bg-gray-700 rounded-md p-4"
          >
            <img
              src="/images/semi.svg"
              class="block max-w-xs"
              alt="Vô địch huyện"
            />
            <p class="mt-2 font-semibold text-lg">Vô địch huyện</p>
          </route-link>
        </div>
        <div class="w-1/2 md:w-1/4">
          <route-link to="/tinh" class="block hover:bg-gray-700 rounded-md p-4">
            <img
              src="/images/pro.svg"
              class="block max-w-xs"
              alt="Vô địch tỉnh"
            />
            <p class="mt-2 font-semibold text-lg">Vô địch tỉnh</p>
          </route-link>
        </div>
        <div class="w-1/2 md:w-1/4">
          <route-link
            to="/doc-co-cau-bai"
            class="block hover:bg-gray-700 rounded-md p-4"
          >
            <img
              src="/images/master.svg"
              class="block max-w-xs"
              alt="Độc cô cầu bại"
            />
            <p class="mt-2 font-semibold text-lg">Độc cô cầu bại</p>
          </route-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    isLoadingPuzzle() {
      return this.$store.getters["puzzle/isLoadingPuzzle"];
    },
    nextPuzzle() {
      return this.$store.getters["puzzle/nextPuzzle"];
    },
    currentPuzzle() {
      return this.$store.getters["puzzle/currentPuzzle"];
    },
  },
  methods: {
    startPuzzle() {
      if (this.currentPuzzle) {
        this.$router.push({
          name: "practice",
          params: { code: this.currentPuzzle.code },
        });
      } else if (this.nextPuzzle) {
        this.$router.push({
          name: "practice",
          params: { code: this.nextPuzzle.code },
        });
      } else {
        alert("Xin lỗi, hệ thống bị lỗi, bạn vui lòng thử lại sau.");
      }
    },
  },
  mounted() {
    this.$store.dispatch("puzzle/prepareNextPuzzle");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
