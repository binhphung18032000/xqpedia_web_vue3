<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="toggleMenu"
      class="
        fixed
        z-20
        inset-0
        bg-black
        opacity-50
        transition-opacity
        lg:hidden
      "
    ></div>
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="
        flex flex-col
        fixed
        z-30
        inset-y-0
        left-0
        w-56
        transition
        duration-300
        transform
        bg-gray-900
        overflow-y-auto
        lg:translate-x-0 lg:static lg:inset-0
      "
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <router-link to="/" class="flex content-center">
            <img src="../static/icon.svg" class="w-10" alt="XQPedia" />
            <span class="text-white text-2xl mx-2 my-auto font-semibold"
              >XQPEDIA</span
            >
          </router-link>
        </div>
      </div>

      <nav class="mt-3 flex-grow">
        <p class="mt-1 lg:mt-4 py-2 px-8 text-gray-200 text-sm">Luyện tập</p>
        <router-link
          to="/"
          class="
            flex
            items-center
            mt-1
            lg:mt-4
            py-2
            px-6
            border-l-4
            cursor-pointer
          "
          :class="[$route.name === 'practice' ? activeClass : inactiveClass]"
          @click="startPuzzle"
        >
          <img src="../static/images/prac.svg" class="w-8" alt="Cờ thế" />
          <span class="mx-2">Cờ thế</span>
        </router-link>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'rush' ? activeClass : inactiveClass]"
          to="/toc-chien"
        >
          <img src="../static/images/flash.svg" class="w-8" alt="Tốc chiến" />
          <span class="mx-2">Tốc chiến</span>
        </router-link>

        <p class="mt-1 lg:mt-4 py-2 px-8 text-gray-200 text-sm">Thách đấu</p>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'beginner' ? activeClass : inactiveClass]"
          to="/xom"
        >
          <img src="../static/images/ama.svg" class="w-8" alt="Vô địch xóm" />
          <span class="mx-2">Vô địch xóm</span>
        </router-link>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'semi' ? activeClass : inactiveClass]"
          to="/huyen"
        >
          <img
            src="../static/images/semi.svg"
            class="w-8"
            alt="Vô địch huyện"
          />
          <span class="mx-2">Vô địch huyện</span>
        </router-link>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'pro' ? activeClass : inactiveClass]"
          to="/tinh"
        >
          <img src="../static/images/pro.svg" class="w-8" alt="Vô địch tỉnh" />
          <span class="mx-2">Vô địch tỉnh</span>
        </router-link>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'master' ? activeClass : inactiveClass]"
          to="/doc-co-cau-bai"
        >
          <img
            src="../static/images/master.svg"
            class="w-8"
            alt="Độc cô cầu bại"
          />
          <span class="mx-2">Đại sư</span>
        </router-link>

        <p class="mt-1 lg:mt-4 py-2 px-8 text-gray-200 text-sm">Cập nhật</p>
        <a
          href="https://blog.xqpedia.com"
          target="_blank"
          class="
            flex
            items-center
            mt-1
            lg:mt-4
            py-2
            px-6
            border-l-4 border-gray-900
            text-gray-400
            hover:bg-gray-600 hover:bg-opacity-25 hover:text-white
          "
        >
          <img src="../static/images/radio.svg" class="w-6" alt="Blog" />
          <span class="mx-2">Tin tức</span>
        </a>

        <a
          href="https://chessdb.xqpedia.com"
          target="_blank"
          class="
            flex
            items-center
            mt-1
            lg:mt-4
            py-2
            px-6
            border-l-4 border-gray-900
            text-gray-400
            hover:bg-gray-600 hover:bg-opacity-25 hover:text-white
          "
        >
          <img
            src="../static/images/cloud.svg"
            class="w-6"
            alt="Dữ liệu đám mây"
          />
          <span class="mx-2">Dữ liệu đám mây</span>
        </a>

        <div class="hidden">
          <p class="mt-4 py-2 px-8 text-gray-200 text-sm">Template</p>
          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]"
            to="/dashboard"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>

            <span class="mx-4">Dashboard</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[
              $route.name === 'UIElements' ? activeClass : inactiveClass,
            ]"
            to="/ui-elements"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>

            <span class="mx-4">UI Elements</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Tables' ? activeClass : inactiveClass]"
            to="/tables"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>

            <span class="mx-4">Tables</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Forms' ? activeClass : inactiveClass]"
            to="/forms"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"></svg>

            <span class="mx-4">Forms</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Cards' ? activeClass : inactiveClass]"
            to="/cards"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"></svg>

            <span class="mx-4">Cards</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Modal' ? activeClass : inactiveClass]"
            to="/modal"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"></svg>

            <span class="mx-4">Modal</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Blank' ? activeClass : inactiveClass]"
            to="/blank"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"></svg>

            <span class="mx-4">Blank</span>
          </router-link>
        </div>
      </nav>

      <a
        class="
          items-center
          mt-4
          py-2
          px-6
          my-auto
          text-white
          bg-gray-800
          block
          cursor-pointer
          hover:bg-gray-700
        "
        :class="{ hidden: name !== null }"
        @click="updateAccount"
      >
        <img
          src="/images/soldier.svg"
          class="w-8 inline-block"
          alt="Tân binh"
        />
        <span class="mx-2 whitespace-nowrap">Tân binh</span>
      </a>

      <a
        class="
          items-center
          mt-4
          py-2
          px-6
          my-auto
          w-full
          text-white
          bg-gray-800
          block
          cursor-pointer
          hover:bg-gray-700
          overflow-hidden
          whitespace-no-wrap
        "
        :class="{ hidden: name === null }"
        @click="updateAccount"
      >
        <img src="/images/officer.svg" class="w-8 inline-block" alt="Sĩ quan" />
        <span class="mx-2">{{ name }}</span>
      </a>
    </div>

    <account
      v-show="openAccountModal"
      @success="updateAccountSuccess"
      @cancel="cancelUpdateAccount"
    ></account>
  </div>
</template>

<script>
// import Account from "./Account.vue";

export default {
  data() {
    return {
      openAccountModal: false,
      activeClass:
        "bg-gray-600 bg-opacity-25 text-white border-gray-100 font-semibold",
      inactiveClass:
        "border-gray-900 text-gray-400 hover:bg-gray-600 hover:bg-opacity-25 hover:text-white",
    };
  },
  methods: {
    startPuzzle() {
      if (this.$route.name !== "practice") {
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
        }
      }
    },

    updateAccount() {
      this.openAccountModal = true;
    },
    updateAccountSuccess() {
      this.openAccountModal = false;
    },
    cancelUpdateAccount() {
      this.openAccountModal = false;
    },
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
  mounted() {
    this.$store.dispatch("puzzle/prepareNextPuzzle");
    this.$store.dispatch("account/loadAccount");
  },
};
</script>
