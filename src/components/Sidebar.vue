<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="toggleMenu"
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="flex flex-col fixed z-30 inset-y-0 left-0 w-56 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <router-link to="/" class="flex content-center">
            <img src="/icon.svg" class="w-10" alt="XQPedia" />
            <span class="text-white text-2xl mx-2 my-auto font-semibold"
              >XQPEDIA</span
            >
          </router-link>
        </div>
      </div>

      <nav class="mt-3 flex-grow">
        <p class="mt-1 lg:mt-4 py-2 px-8 text-gray-200 text-sm">Luyện tập</p>
        <a
          to="/"
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4 cursor-pointer"
          :class="[$route.name === 'practice' ? activeClass : inactiveClass]"
          @click="startPuzzle"
        >
          <img src="/images/prac.svg" class="w-8" alt="Cờ thế" />
          <span class="mx-2">Cờ thế</span>
        </a>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'rush' ? activeClass : inactiveClass]"
          to="/toc-chien"
        >
          <img src="/images/flash.svg" class="w-8" alt="Tốc chiến" />
          <span class="mx-2">Tốc chiến</span>
        </router-link>

        <p class="mt-1 lg:mt-4 py-2 px-8 text-gray-200 text-sm">Thách đấu</p>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'beginner' ? activeClass : inactiveClass]"
          to="/xom"
        >
          <img src="/images/ama.svg" class="w-8" alt="Vô địch xóm" />
          <span class="mx-2">Vô địch xóm</span>
        </router-link>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'semi' ? activeClass : inactiveClass]"
          to="/huyen"
        >
          <img src="/images/semi.svg" class="w-8" alt="Vô địch huyện" />
          <span class="mx-2">Vô địch huyện</span>
        </router-link>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'pro' ? activeClass : inactiveClass]"
          to="/tinh"
        >
          <img src="/images/pro.svg" class="w-8" alt="Vô địch tỉnh" />
          <span class="mx-2">Vô địch tỉnh</span>
        </router-link>

        <router-link
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4"
          :class="[$route.name === 'master' ? activeClass : inactiveClass]"
          to="/doc-co-cau-bai"
        >
          <img src="/images/master.svg" class="w-8" alt="Độc cô cầu bại" />
          <span class="mx-2">Đại sư</span>
        </router-link>

        <p class="mt-1 lg:mt-4 py-2 px-8 text-gray-200 text-sm">Cập nhật</p>
        <a
          href="https://blog.xqpedia.com"
          target="_blank"
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4 border-gray-900 text-gray-400 hover:bg-gray-600 hover:bg-opacity-25 hover:text-white"
        >
          <img src="/images/radio.svg" class="w-6" alt="Blog" />
          <span class="mx-2">Tin tức</span>
        </a>

        <a
          href="https://chessdb.xqpedia.com"
          target="_blank"
          class="flex items-center mt-1 lg:mt-4 py-2 px-6 border-l-4 border-gray-900 text-gray-400 hover:bg-gray-600 hover:bg-opacity-25 hover:text-white"
        >
          <img src="/images/cloud.svg" class="w-6" alt="Dữ liệu đám mây" />
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
            >
              <path
                d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                fill="currentColor"
              />
              <path
                d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
                fill="currentColor"
              />
            </svg>

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
            >
              <path
                d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
                fill="currentColor"
              />
              <path
                d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
                fill="currentColor"
              />
              <path
                d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
                fill="currentColor"
              />
              <path
                d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
                fill="currentColor"
              />
            </svg>

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
            >
              <path
                d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
                fill="currentColor"
              />
              <path
                d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
                fill="currentColor"
              />
              <path
                d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
                fill="currentColor"
              />
            </svg>

            <span class="mx-4">Tables</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Forms' ? activeClass : inactiveClass]"
            to="/forms"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="mx-4">Forms</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Cards' ? activeClass : inactiveClass]"
            to="/cards"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="mx-4">Cards</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Modal' ? activeClass : inactiveClass]"
            to="/modal"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
              />
            </svg>

            <span class="mx-4">Modal</span>
          </router-link>

          <router-link
            class="flex items-center mt-4 py-2 px-6 border-l-4"
            :class="[$route.name === 'Blank' ? activeClass : inactiveClass]"
            to="/blank"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
              />
            </svg>

            <span class="mx-4">Blank</span>
          </router-link>
        </div>
      </nav>

      <a
        class="items-center mt-4 py-2 px-6 my-auto text-white bg-gray-800 block cursor-pointer hover:bg-gray-700"
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
        class="items-center mt-4 py-2 px-6 my-auto w-full text-white bg-gray-800 block cursor-pointer hover:bg-gray-700 overflow-hidden whitespace-no-wrap"
        :class="{ hidden: name === null }"
        @click="updateAccount"
      >
        <img src="/images/officer.svg" class="w-8 inline-block" alt="Sĩ quan" />
        <span class="mx-2">{{ name }}</span>
      </a>
    </div>

    <!-- <account
      v-show="openAccountModal"
      @success="updateAccountSuccess"
      @cancel="cancelUpdateAccount"
    ></account> -->
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
  // components: { Account },
  computed: {
    isOpen() {
      return this.$store.getters["menuIsOpen"];
    },
    isLoadingPuzzle() {debugger
      return this.$store.getters["puzzle/isLoadingPuzzle"];
    },
    nextPuzzle() {debugger
      return this.$store.getters["puzzle/nextPuzzle"];
    },
    currentPuzzle() {debugger
      return this.$store.getters["puzzle/currentPuzzle"];
    },
    code() {debugger
      return this.$store.getters["account/code"];
    },
    name() {debugger
      return this.$store.getters["account/name"];
    },
  },
  methods: {
    startPuzzle() {
      // console.log(this.$router);
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
