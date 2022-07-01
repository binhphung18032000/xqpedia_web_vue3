const state = () => ({
  isPlaying: false,
  menuIsOpen: false,
});

const mutations = {
  startPlay(state) {
    state.isPlaying = true;
  },
  stopPlay(state) {
    state.isPlaying = false;
  },
  toggleMenu(state) {
    state.menuIsOpen = !state.menuIsOpen;
  },
};

const getters = {
  menuIsOpen(state) {
    return state.menuIsOpen;
  },
};
// export const strict = false;

export const index = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
};
