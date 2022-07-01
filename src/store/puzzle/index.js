import { PuzzleService } from "@/services/puzzle.service";

const state = () => ({
  isLoadingPuzzle: false,
  currentPuzzle: null,
  nextPuzzle: null,
});

const mutations = {
  async prepareNextPuzzle(state, payload) {
    if (state.nextPuzzle === null) {
      state.isLoadingPuzzle = true;
      let avoidResolved = true;
      let getPuzzleFull = false;
      let puzzleAvoids = [];
      if (payload) {
        if (payload["avoidResolved"]) {
          avoidResolved = payload.avoidResolved;
        }

        if (payload["puzzleAvoids"]) {
          puzzleAvoids = payload.puzzleAvoids;
        }

        if (payload["getPuzzleFull"]) {
          getPuzzleFull = payload.getPuzzleFull;
        }
      }
      state.nextPuzzle = await PuzzleService.randomNextPuzzle(
        avoidResolved,
        puzzleAvoids,
        getPuzzleFull
      );
      state.isLoadingPuzzle = false;
    }
  },

  async setCurrentPuzzle(state, payload) {
    state.currentPuzzle = null;
    let puzzle = payload;
    if (puzzle !== null) {
      PuzzleService.setCurrentPuzzle(puzzle);
      state.currentPuzzle = puzzle;
      state.nextPuzzle = null;
      this.commit("puzzle/prepareNextPuzzle", {
        avoidResolved: true,
        puzzleAvoids: [puzzle.id],
        getPuzzleFull: false,
      });
    }
  },

  async attemptPuzzle(state, payload) {
    await PuzzleService.attemptPuzzle(payload.code);
  },

  async resolvedPuzzle(state, payload) {
    await PuzzleService.resolvePuzzle(payload.id, payload.code);
  },

  async forceNewRushPuzzle(state, payload) {
    console.log(payload);
    const puzzle = await PuzzleService.randomNextPuzzle(false, [], true);
    PuzzleService.setCurrentPuzzle(puzzle);
    state.currentPuzzle = puzzle;
    state.nextPuzzle = null;
    this.commit("puzzle/prepareNextPuzzle", {
      avoidResolved: false,
      puzzleAvoids: [puzzle.id],
      getPuzzleFull: true,
    });
    return puzzle;
  },
  loadNextRushPuzzle(state, payload) {
    const puzzle = state.nextPuzzle;
    PuzzleService.setCurrentPuzzle(puzzle);
    state.currentPuzzle = puzzle;
    state.nextPuzzle = null;
    let puzzleAvoids = [];
    if (payload && payload["puzzleAvoids"]) {
      puzzleAvoids = payload.puzzleAvoids;
    }
    this.commit("puzzle/prepareNextPuzzle", {
      avoidResolved: false,
      puzzleAvoids: puzzleAvoids,
      getPuzzleFull: true,
    });
    return puzzle;
  },
};

const actions = {
  prepareNextPuzzle(context, payload) {
    context.commit("prepareNextPuzzle", payload);
  },
  forceNewRushPuzzle(context) {
    context.commit("forceNewRushPuzzle");
  },
  loadNextRushPuzzle(context) {
    context.commit("loadNextRushPuzzle");
  },
  setCurrentPuzzle(context, payload) {
    context.commit("setCurrentPuzzle", payload);
  },
  resolvedPuzzle(context, payload) {
    const id = payload.id;
    const code = payload.code;
    context.commit("resolvedPuzzle", { id: id, code: code });
  },
  attemptPuzzle(context, payload) {
    const code = payload.code;
    context.commit("attemptPuzzle", { code: code });
  },
};
const getters = {
  isLoadingPuzzle(state) {
    return state.isLoadingPuzzle;
  },
  currentPuzzle(state) {
    return state.currentPuzzle;
  },
  nextPuzzle(state) {
    return state.nextPuzzle;
  },
};

export const puzzle = {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations,
};
