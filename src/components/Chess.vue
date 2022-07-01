<template>
  <div id="xiangqi_game">
    <div id="board" style="width: 400px; height: 400px"></div>
    <div style="display: none">
      <!-- Try to preload sounds -->
      <audio preload="auto" src="/res/capture.wav" id="sndCapture"></audio>
      <audio preload="auto" src="/res/check.wav" id="sndCheck"></audio>
      <audio preload="auto" src="/res/move.wav" id="sndMove"></audio>
    </div>
  </div>
</template>

<script>
import XiangQi from "@/plugins/chess/app";

export default {
  name: "Chess",
  data: function () {
    return {
      xiangqiBoard: null,
    };
  },
  props: {
    redFirst: {
      type: Number,
      default: 1, // or 0 ~ computer go first
    },
    mode: {
      type: String,
      default: "default", // 'default' or 'fen'
    },
    level: {
      type: Number,
      default: 0, // 0: beginner, 1: semi, 2: pro, 3: master
    },
    fen: {
      type: String,
      default: "",
    },
    reload: {
      type: Number,
    },
  },
  watch: {
    fen: function (newVal, oldVal) {
      // watch it
      // console.log('fen changed', newVal);
      this.$store.commit("stopPlay");
      if (this.mode === "fen") {
        if (this.xiangqiBoard == null) {
          this.xiangqiBoard = new XiangQi();
          this.xiangqiBoard.setCallBack(
            () => {
              this.win();
            },
            () => {
              this.lose();
            },
            () => {
              this.draw();
            },
            () => {
              this.firstMove();
            }
          );
          this.xiangqiBoard.start(this.redFirst, this.level, newVal);
        } else {
          this.xiangqiBoard.restart(newVal);
        }
      }
    },
    reload: function (newVal, oldVal) {
      let self = this;
      window.setTimeout(function () {
        self.reloadLayout();
      }, 50);
    },
  },
  mounted() {
    this.$store.commit("stopPlay");
    if (this.xiangqiBoard == null) {
      this.xiangqiBoard = new XiangQi();
      this.xiangqiBoard.setCallBack(
        () => {
          this.win();
        },
        () => {
          this.lose();
        },
        () => {
          this.draw();
        },
        () => {
          this.firstMove();
        }
      );
    }

    if (this.mode === "default") {
      this.xiangqiBoard.start(this.redFirst, this.level);
    } else {
      let startFen = "9/9/9/9/9/9/9/9/9/9 w";
      if (this.fen !== "") {
        startFen = this.fen;
      }
      this.xiangqiBoard.start(this.redFirst, this.level, startFen);
    }
  },
  methods: {
    win() {
      this.$store.commit("stopPlay");
      this.$emit("win");
    },
    draw() {
      this.$store.commit("stopPlay");
      this.$emit("draw");
    },
    lose() {
      this.$store.commit("stopPlay");
      this.$emit("lose");
    },
    firstMove() {
      this.$store.commit("startPlay");
      this.$emit("firstMove");
    },
    reloadLayout() {
      if (this.xiangqiBoard) {
        this.xiangqiBoard.resize();
      }
    },
  },
};
</script>
