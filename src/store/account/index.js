import { AccountService } from "@/services/account.service";

const state = () => ({
  code: null,
  name: null,
  email: null,
  phone: null,
});

const mutations = {
  loadAccount(state, payload) {
    console.log(payload);
    let acc = AccountService.getAccount();
    if (acc) {
      state.code = acc.code;
      state.name = acc.name;
      state.email = acc.email;
      state.phone = acc.phone;
    }
  },

  async submit(state, payload) {
    let code = null;
    if (payload["code"]) {
      code = payload.code;
    }

    const account = await AccountService.submit(
      code,
      payload.name,
      payload.email,
      payload.phone
    );
    if (account) {
      state.code = account.code;
      state.name = account.name;
      state.email = account.email;
      state.phone = account.phone;
      return true;
    }
    return false;
  },

  update(state, payload) {
    state.code = payload.code;
    state.name = payload.name;
    state.email = payload.email;
    state.phone = payload.phone;
  },
};

const actions = {
  loadAccount(context) {
    context.commit("loadAccount");
  },
  submit(context, payload) {
    context.commit("submit", payload);
  },
  update(context, payload) {
    context.commit("update", payload);
  },
};

const getters = {
  name(state) {
    return state.name;
  },
  code(state) {
    return state.code;
  },
  email(state) {
    return state.email;
  },
  phone(state) {
    return state.phone;
  },
};

export const account = {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations,
};
