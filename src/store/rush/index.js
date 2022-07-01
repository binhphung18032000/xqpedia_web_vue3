import { RushService } from "@/services/rush.service";
import { AccountService } from "@/services/account.service";

const state = () => ({
  rush_3m: {},
  rush_5m: {},
  rush_10m: {},
  rush_survivor: {},
});

const mutations = {
  async loadRank(state, payload) {
    if (payload && payload["type"]) {
      if (parseInt(payload.type) === 3) {
        state.rush_3m = await RushService.getRank(3);
      }
      if (parseInt(payload.type) === 5) {
        state.rush_5m = await RushService.getRank(5);
      }
      if (parseInt(payload.type) === 10) {
        state.rush_10m = await RushService.getRank(10);
      }
      if (parseInt(payload.type) === 0) {
        state.rush_survivor = await RushService.getRank(0);
      }
    } else {
      state.rush_3m = await RushService.getRank(3);
      state.rush_5m = await RushService.getRank(5);
      state.rush_10m = await RushService.getRank(10);
      state.rush_survivor = await RushService.getRank(0);
    }
  },

  async submit(state, payload) {
    let account = AccountService.getAccount();
    let code = null;
    if (account) {
      code = account.code;
    }

    return await RushService.submitResult(
      code,
      payload.type,
      payload.score,
      payload.resolved,
      payload.total,
      payload.data
    );
  },
};

const actions = {
  loadRank(context, payload) {
    context.commit("loadRank", payload);
  },
  submit(context, payload) {
    context.commit("submit", payload);
  },
};

const getters = {
  rush_3m(state) {
    return state.rush_3m;
  },
  rush_5m(state) {
    return state.rush_5m;
  },
  rush_10m(state) {
    return state.rush_10m;
  },
  rush_survivor(state) {
    return state.rush_survivor;
  },
};

export const rush = {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations,
};
