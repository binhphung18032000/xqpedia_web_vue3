<template>
  <div>
    <div class="flex justify-between">
      <h1 class="flex text-white text-3xl font-medium">
        <img src="/images/flash.svg" class="w-12 h-12" alt="Tốc chiến" />
        <span class="ml-2">Tốc chiến</span>
      </h1>

      <!--    <button  class="px-5 h-10 bg-gray-600 rounded-md text-white  tracking-wide hover:bg-gray-500" @click="win()">-->
      <!--      Win-->
      <!--    </button>-->
      <!--    <button  class="px-5 h-10 bg-gray-600 rounded-md text-white  tracking-wide hover:bg-gray-500" @click="lose()">-->
      <!--      Lose-->
      <!--    </button>-->
    </div>

    <div class="flex flex-wrap mt-3 lg:mt-6 text-center">
      <div class="w-full lg:w-1/5 px-2 py-2 bg-gray-900 rounded-md mb-1">
        <div class="py-2" v-show="viewMode === 'default'">
          <p class="text-xl">Thời gian:</p>
          <button
            class="px-4 py-3 w-32 m-2 rounded-md text-white font-medium tracking-wide hover:bg-green-500 focus:outline-none"
            :class="{
              'border-4 border-gray-200 bg-green-500': time === rushTime,
              'bg-gray-700': time !== rushTime,
            }"
            v-for="(time, index) in times"
            :key="index"
            @click="rushTime = time"
          >
            {{ time }} phút
          </button>

          <button
            class="px-4 py-3 w-32 m-2 rounded-md text-white font-medium tracking-wide hover:bg-green-500 focus:outline-none"
            :class="{
              'border-4 border-gray-200 bg-green-500': 0 === rushTime,
              'bg-gray-700': 0 !== rushTime,
            }"
            @click="rushTime = 0"
          >
            Sống còn
          </button>

          <hr class="my-3 w-32 mx-auto" />

          <button
            class="px-6 py-3 bg-red-800 w-32 m-2 rounded-md text-white font-semibold tracking-wide hover:bg-red-700 focus:outline-none"
            @click="start"
          >
            Chiến
          </button>
        </div>

        <div class="py-2" v-show="viewMode === 'gaming'">
          <p class="text-4xl sm:text-6xl" v-if="displayCountDown > 0">
            {{ displayCountDown }}
          </p>
          <p class="text-3xl sm:text-5xl">{{ displayTimeCountDown }}</p>
          <hr class="my-2 w-32 mx-auto" />
          <div v-show="puzzleResults.length > 0">
            <span v-for="(status, index) in puzzleResults" :key="index">
              <img
                src="/images/star-win.svg"
                alt="Win"
                v-if="status"
                class="m-1 w-6 inline-block"
              />
              <img
                src="/images/star-lose.svg"
                alt="Lost"
                v-if="!status"
                class="m-1 w-6 inline-block"
              />
            </span>
            <hr class="my-3 w-32 mx-auto" />
          </div>
          <button
            v-show="displayCountDown === 0 && rushTime > 0"
            class="px-5 h-10 bg-gray-600 rounded-md text-white tracking-wide hover:bg-gray-500"
            @click="lose()"
          >
            Bỏ qua
          </button>
        </div>

        <div class="py-2 text" v-show="viewMode === 'result'">
          <p class="text-xl">Kết quả:</p>
          <p class="text-3xl">{{ totalTime }}</p>
          <p class="text-4xl">{{ totalWin }} / {{ totalLose + totalWin }}</p>
          <hr class="my-3 w-32 mx-auto" />
          <span v-for="(status, index) in puzzleResults" :key="index">
            <img
              src="/images/star-win.svg"
              alt="Win"
              v-if="status"
              class="m-1 w-6 inline-block"
            />
            <img
              src="/images/star-lose.svg"
              alt="Lost"
              v-if="!status"
              class="m-1 w-6 inline-block"
            />
          </span>

          <hr class="my-3 w-32 mx-auto" />
          <button
            class="px-6 py-3 bg-green-600 w-32 m-2 rounded-md text-white font-semibold tracking-wide hover:bg-green-500 focus:outline-none"
            @click="retry"
          >
            Thử lại
          </button>
        </div>
      </div>

      <div class="w-full lg:w-4/5 lg:px-2 mt-3 lg:mt-0">
        <client-only>
          <div v-show="viewMode === 'default'" class="flex flex-wrap">
            <ranking
              class="w-full md:w-1/2 mt-3 md:mt-0"
              :view="rushTime"
            ></ranking>
            <div class="w-full md:w-1/2 mt-3 md:mt-0 md:pl-4 pb-3">
              <facebook :page-url="pageUrl"></facebook>
            </div>
          </div>
        </client-only>

        <client-only>
          <chess
            v-show="viewMode !== 'default'"
            :reload="triggerReload"
            mode="fen"
            :fen="fen"
            @win="win"
            @draw="lose"
            @lose="lose"
            @first-move="firstMove"
          ></chess>
        </client-only>
      </div>
    </div>

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
        <div class="modal-content py-4 text-center px-6">
          <!--Title-->
          <p class="text-2xl font-bold">
            {{ rushTime > 0 ? "Tốc chiến" : "Sống còn" }} {{ totalTime }}
          </p>
          <p class="text-4xl">{{ totalWin }} / {{ totalLose + totalWin }}</p>
          <hr class="my-3 w-32 mx-auto" />
          <span v-for="(status, index) in puzzleResults" :key="index">
            <img
              src="/images/star-win.svg"
              alt="Win"
              v-if="status"
              class="m-1 w-6 inline-block"
            />
            <img
              src="/images/star-lose.svg"
              alt="Lost"
              v-if="!status"
              class="m-1 w-6 inline-block"
            />
          </span>
          <!--Footer-->
          <div class="flex justify-center pt-5">
            <button
              @click="closeModal"
              class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
            >
              OK
            </button>
          </div>
        </div>
      </div>

      <div
        class="modal-container bg-gray-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto border-2 border-gray-700"
        :class="{ hidden: !openLose }"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold"></p>
          </div>

          <p>Rất tiếc, bạn đã thua 3 thế</p>
          <!--Footer-->
          <div class="flex justify-end pt-3">
            <button
              @click="closeModal"
              class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <account
      v-show="askAccount"
      @success="updateAccSucces"
      @cancel="cancelUpdateAcc"
    ></account> -->
  </div>
</template>

<script>
// import Account from "../components/Account.vue";
import Ranking from "../components/Ranking.vue";
import Facebook from "../components/Facebook.vue";
export default {
  name: "Rush",
  components: { Ranking, Facebook },
  data: function () {
    return {
      times: [3, 5, 10],
      rushTime: 3,
      viewMode: "default", // gaming, result
      startTime: new Date(),
      endTime: new Date(),
      displayCountDown: 0,
      displayTimeCountDown: "",
      totalTime: "",
      intervalCountDown: null,
      puzzleIds: [],
      puzzleResults: [],
      openModal: false,
      openWin: false,
      openLose: false,
      data: [],
      askAccount: false,
      triggerReload: 0,
      survivorTime: 0,
    };
  },
  watch: {},
  computed: {
    totalWin() {
      let total = 0;
      this.puzzleResults.forEach((e) => (e === 1 ? (total += 1) : 0));
      return total;
    },
    totalLose() {
      let total = 0;
      this.puzzleResults.forEach((e) => (e === 0 ? (total += 1) : 0));
      return total;
    },
    currentPuzzle() {
      return this.$store.getters["puzzle/currentPuzzle"];
    },
    nextPuzzle() {
      return this.$store.getters["puzzle/nextPuzzle"];
    },
    isLoadingPuzzle() {
      return this.$store.getters["puzzle/isLoadingPuzzle"];
    },
    fen() {
      if (this.viewMode !== "gaming" || this.displayCountDown > 0) {
        return "9/9/9/9/9/9/9/9/9/9 w";
      } else {
        if (this.currentPuzzle) {
          return this.currentPuzzle.fen;
        }
        return "";
      }
    },
    accountCode() {
      return this.$store.getters["account/code"];
    },
    pageUrl() {
      let mode = "song-con";
      if (this.rushTime > 0) {
        mode = this.rushTime + "-phut";
      }
      return this.$route.path + "/" + mode;
    },
  },
  methods: {
    start() {
      this.$store.dispatch("puzzle/forceNewRushPuzzle");
      this.displayCountDown = 3;
      this.viewMode = "gaming";
      this.displayTimeCountDown = "";
      this.triggerReload = new Date().getMilliseconds();
      let self = this;

      this.intervalCountDown = window.setInterval(function () {
        self.displayCountDown -= 1;

        if (self.displayCountDown === 0) {
          self.startPuzzle();
        }
      }, 1000);
    },
    startPuzzle() {
      clearInterval(this.intervalCountDown);

      this.puzzleIds = [];
      this.puzzleResults = [];
      this.data = [];
      this.startTime = new Date();

      let time = this.rushTime > 0 ? this.rushTime : 3;

      this.displayTimeCountDown = (time < 10 ? "0" + time : time) + ":00";
      this.displayCountDown = 0;
      this.totalTime = this.displayTimeCountDown;

      this.endTime = new Date();
      this.endTime.setMilliseconds(
        this.endTime.getMilliseconds() + time * 60 * 1000
      );
      let self = this;
      this.intervalCountDown = window.setInterval(function () {
        let now = new Date();
        if (now >= self.endTime) {
          self.stop();
        }
        let milisecond = self.endTime - now;
        if (milisecond > 0) {
          let minutes = Math.floor(milisecond / 1000 / 60);
          minutes = minutes < 10 ? "0" + minutes : "" + minutes;
          let seconds = Math.round((milisecond / 1000) % 60);
          seconds = seconds < 10 ? "0" + seconds : "" + seconds;
          self.displayTimeCountDown = minutes + ":" + seconds;
        } else {
          self.displayTimeCountDown = "00:00";
        }
      }, 1000);
    },
    stop(win = true) {
      clearInterval(this.intervalCountDown);
      if (this.rushTime === 0) {
        this.survivorTime = Math.floor((new Date() - this.startTime) / 1000);
        const minutes = Math.floor(this.survivorTime / 60);
        const seconds = this.survivorTime % 60;

        this.totalTime =
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds);
      }

      this.displayTimeCountDown = "";
      this.viewMode = "result";
      this.openModal = true;
      if (win) {
        this.openWin = true;
      } else {
        this.openLose = true;
      }

      if (this.accountCode === null || this.accountCode === "") {
        this.askAccount = true;
      } else {
        this.submitResult();
      }
    },
    firstMove() {
      this.$store.dispatch("puzzle/attemptPuzzle", this.currentPuzzle);
    },
    win() {
      this.puzzleIds.push(this.currentPuzzle.id);
      this.puzzleResults.push(1);
      this.data.push({
        p: this.currentPuzzle.id,
        t: (new Date() - this.startTime) / 1000,
        r: 1,
      });

      // Add 5 seconds for survivor mode
      if (this.rushTime === 0) {
        this.endTime.setMilliseconds(
          this.endTime.getMilliseconds() + 10 * 1000
        );
      }
      this.$store.dispatch("puzzle/resolvedPuzzle", this.currentPuzzle);
      this.$store.dispatch("puzzle/loadNextRushPuzzle", {
        puzzleAvoids: this.puzzleIds,
      });
    },
    lose() {
      if (this.rushTime === 0) {
        this.stop(true);
      } else {
        this.puzzleIds.push(this.currentPuzzle.id);
        this.puzzleResults.push(0);
        this.data.push({
          p: this.currentPuzzle.id,
          t: (new Date() - this.startTime) / 1000,
          r: 0,
        });
        this.$store.dispatch("puzzle/loadNextRushPuzzle", {
          puzzleAvoids: this.puzzleIds,
        });

        if (this.totalLose === 3) {
          this.stop(false);
        }
      }
    },
    retry() {
      this.$router.go(this.$router.currentRoute);
    },
    closeModal() {
      this.openModal = false;
      this.openWin = false;
      this.openLose = false;
    },

    updateAccSucces() {
      this.submitResult();
      this.askAccount = false;
    },

    cancelUpdateAcc() {
      if (this.accountCode !== null) {
        this.submitResult();
      }
      this.askAccount = false;
    },

    submitResult() {
      if (this.totalWin === 0) {
        return;
      }

      let score = this.totalWin;
      if (this.rushTime === 0) {
        score = this.survivorTime;
      }
      this.$store.dispatch("rush/submit", {
        type: this.rushTime,
        score: score,
        resolved: this.totalWin,
        total: this.totalWin + this.totalLose,
        data: this.data,
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.viewMode === "gaming") {
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
      title: "Tốc chiến | XQPedia",
      meta: [
        {
          property: "og:title",
          content: "Tốc chiến | XQPedia",
        },
        {
          property: "og:description",
          content: "Tốc chiến chiếm bảng xưng anh hùng | XQPedia",
        },
        {
          property: "og:image",
          content: process.env.APP_URI + "images/logo-rush.jpg",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
