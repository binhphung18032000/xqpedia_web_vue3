import Vue from "vue";
import XiangQi from "@/plugins/chess/app";
// import * as notify from "@/plugins/chess/notify";
// import Board from "@/plugins/chess/board";

if (process.client) {
  Vue.use(new XiangQi());
}
