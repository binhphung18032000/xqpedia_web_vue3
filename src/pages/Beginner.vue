<template>
  <div>
    <div class="flex justify-between">
      <h1 class="flex text-white text-3xl font-medium">
        <img src="/images/ama.svg" class="w-12 h-12" alt="Vô địch xóm" />
        <span class="ml-2">Vô địch xóm</span>
      </h1>
      <div
        class="flex justify-end flex-row flex-wrap w-2/5 sm:w-1/4 text-right"
      >
        <button
          title="Đi sau"
          class="p-1 m-2 w-10 h-10 bg-gray-600 rounded-md text-white text-center tracking-wide hover:bg-gray-500"
          @click="newGameOppo"
        >
          <img src="/images/exchange.svg" class="w-6 mx-auto" alt="Đi sau" />
        </button>
        <button
          title="Ván mới"
          class="p-1 ml-2 my-2 w-10 h-10 bg-gray-600 rounded-md text-white text-center tracking-wide hover:bg-gray-500"
          @click="newGame"
        >
          <img src="/images/reload.svg" class="w-8 mx-auto" alt="Ván mới" />
        </button>
      </div>
    </div>

    <client-only>
      <div class="flex flex-row flex-wrap mt-3 p-0 md:p-2">
        <chess
          class="w-full lg:w-3/5"
          @win="win"
          @draw="lose"
          @lose="lose"
        ></chess>
        <div class="w-full mt-3 lg:mt-0 lg:w-2/5 lg:pl-4 pb-3">
          <facebook></facebook>
        </div>
      </div>
    </client-only>

    <div
      :class="`modal ${
        !openModal && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div
        class="modal-container bg-red-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto border-8 border-red-800"
        :class="{ hidden: !openWin }"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">Chúc mừng</p>
          </div>

          <p>Bạn đã thắng vô địch xóm</p>
          <!--Footer-->
          <div class="flex justify-end pt-3">
            <button
              @click="retry"
              class="px-6 py-3 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-700 hover:text-gray-100 mr-2"
            >
              Đánh lại lần nữa
            </button>

            <button
              @click="next"
              class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
            >
              Chiến vô địch huyện
            </button>
          </div>
        </div>
      </div>

      <div
        class="modal-container bg-gray-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
        :class="{ hidden: !openLose }"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold"></p>
          </div>

          <p>Tiếc quá, bạn đã chơi rất tốt, bạn muốn thử lại?</p>
          <!--Footer-->
          <div class="flex justify-end pt-3">
            <button
              @click="startPuzzle"
              class="px-6 py-3 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-700 hover:text-gray-100 mr-2"
            >
              Về luyện lại
            </button>

            <button
              @click="retry"
              class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>

      <div
        class="modal-container bg-gray-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
        :class="{ hidden: !openNewGame }"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold"></p>
          </div>

          <p>Bạn muốn chơi ván mới?</p>
          <!--Footer-->
          <div class="flex justify-end pt-3">
            <button
              @click="closeModal"
              class="px-6 py-3 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-700 hover:text-gray-100 mr-2"
            >
              Không
            </button>

            <button
              @click="retry"
              class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
            >
              Có
            </button>
          </div>
        </div>
      </div>

      <div
        class="modal-container bg-gray-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
        :class="{ hidden: !openNewGameOppo }"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold"></p>
          </div>

          <p>Bạn muốn chơi ván mới và nhường đối thủ đi trước?</p>
          <!--Footer-->
          <div class="flex justify-end pt-3">
            <button
              @click="closeModal"
              class="px-6 py-3 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-700 hover:text-gray-100 mr-2"
            >
              Không
            </button>

            <router-link
              to="/xom-di-sau"
              class="px-6 py-3 bg-green-600 text-white rounded-md font-medium tracking-wide hover:bg-green-500"
            >
              Có
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openModal: false,
      openWin: false,
      openLose: false,
      openNewGame: false,
      openNewGameOppo: false,
      ignorePlaying: false,
    };
  },
  computed: {
    nextPuzzle() {
      return this.$store.getters["puzzle/nextPuzzle"];
    },
    currentPuzzle() {
      return this.$store.getters["puzzle/currentPuzzle"];
    },
    isPlaying() {
      return this.$store.getters["isPlaying"];
    },
  },
  methods: {
    win() {
      this.openModal = true;
      this.openWin = true;
    },
    lose() {
      this.openModal = true;
      this.openLose = true;
    },
    newGame() {
      if (this.isPlaying) {
        this.openModal = true;
        this.openNewGame = true;
      } else {
        this.retry();
      }
    },
    newGameOppo() {
      if (this.isPlaying) {
        this.openModal = true;
        this.openNewGameOppo = true;
        this.ignorePlaying = true;
      } else {
        this.$router.push({ name: "beginner-oppo" });
      }
    },
    retry() {
      this.closeModal();
      this.$router.go(this.$router.currentRoute);
      //this.$nuxt.refresh();
    },
    next() {
      this.closeModal();
      this.$router.push({ name: "semi" });
    },
    startPuzzle() {
      this.closeModal();
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
    },
    closeModal() {
      this.openModal = false;
      this.openWin = false;
      this.openLose = false;
      this.openNewGame = false;
      this.openNewGameOppo = false;
      this.ignorePlaying = false;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isPlaying && !this.ignorePlaying) {
      const answer = window.confirm("Bạn muốn bỏ ván đang chơi?");
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  head() {
    return {
      title: "Chiến cùng vô địch xóm | XQPedia",
      meta: [
        {
          property: "og:title",
          content: "Chiến cùng vô địch xóm | XQPedia",
        },
        {
          property: "og:description",
          content: "Chiến cùng vô địch xóm | XQPedia",
        },
        {
          property: "og:image",
          content: process.env.APP_URI + "images/logo-beginner.jpg",
        },
        {
          property: "og:url",
          content: process.env.APP_URI + this.$route.path.substr(1),
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
