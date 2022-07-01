import { createStore } from "vuex";
import { account } from "./account";
import { index } from "./menu";
import { puzzle } from "./puzzle";
import { rush } from "./rush";

const store = createStore({
  modules: {
    account,
    index,
    puzzle,
    rush,
  },
});

export default store;
