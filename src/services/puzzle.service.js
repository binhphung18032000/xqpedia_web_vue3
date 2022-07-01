import axios from "axios";

const PuzzleService = {
  getResolvedPuzzles() {
    let old_resolved = localStorage.getItem("resolved_puzzles");
    if (old_resolved) {
      var results = [];
      old_resolved.split(",").forEach((e) => results.push(parseInt(e)));
      return results;
    }
    return [];
  },

  async randomNextPuzzle(
    avoidResolved = true,
    puzzleAvoids = [],
    getFull = false
  ) {
    let avoids = [];
    if (avoidResolved) {
      avoids = this.getResolvedPuzzles();
    }
    puzzleAvoids.forEach((e) => avoids.push(parseInt(e)));
    avoids.push(0);

    let total = await this.getNumberOfPuzzle();
    let new_puzzle_id = 0;
    let check = true;
    do {
      new_puzzle_id = Math.round(Math.random() * total);
      if (avoids.includes(new_puzzle_id) === false) break;
    } while (check);

    let puzzle = null;
    if (getFull) {
      puzzle = await this.getPuzzleFromAPI(new_puzzle_id);
    } else {
      puzzle = await this.getPuzzleCodeFromAPI(new_puzzle_id);
    }
    if (puzzle != null) {
      sessionStorage.setItem("next_puzzle", JSON.stringify(puzzle));
    }
    return puzzle;
  },

  async getNumberOfPuzzle() {
    let cache = sessionStorage.getItem("total_puzzle");
    if (cache !== null) {
      return parseInt(cache);
    }
    const url = process.env.API_URL + "api/v1/puzzle-total";

    return await axios
      .get(url)
      .then(function (response) {
        sessionStorage.setItem("total_puzzle", response.data.total);
        return response.data.total;
      })
      .catch(function (error) {
        console.log(error);
        return 12356;
      });
  },

  async getPuzzleFromAPI(id) {
    const url = process.env.API_URL + "api/v1/puzzle/" + id;

    return await axios
      .get(url)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },

  async getPuzzleCodeFromAPI(id) {
    const url = process.env.API_URL + "api/v1/puzzle/" + id + "/url";

    return await axios
      .get(url)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },

  async attemptPuzzle(code) {
    const url = process.env.API_URL + "api/v1/puzzle/" + code + "/attempt";
    return await axios
      .post(url)
      .then(function () {
        return true;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  },

  async resolvePuzzle(puzzleId, code) {
    let resolved = localStorage.getItem("resolved_puzzles");
    if (resolved) {
      resolved += "," + puzzleId;
    } else {
      resolved = puzzleId;
    }
    localStorage.setItem("resolved_puzzles", resolved);

    const url = process.env.API_URL + "api/v1/puzzle/" + code + "/resolved";
    return await axios
      .post(url)
      .then(function () {
        return true;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  },

  async getPuzzle(code) {
    let next_puzzle = sessionStorage.getItem("current_puzzle");
    if (next_puzzle !== null) {
      let puzzle = JSON.parse(next_puzzle);
      if (puzzle && puzzle.code === code) {
        return puzzle;
      }
    }

    next_puzzle = sessionStorage.getItem("next_puzzle");
    if (next_puzzle !== null) {
      let puzzle = JSON.parse(next_puzzle);
      if (puzzle && puzzle.code === code) {
        return puzzle;
      }
    }

    let puzzle = await this.getPuzzleFromAPI(code);
    if (puzzle != null) {
      sessionStorage.setItem("next_puzzle", JSON.stringify(puzzle));
    }
    return puzzle;
  },

  setCurrentPuzzle(puzzle) {
    const text = JSON.stringify(puzzle);
    sessionStorage.setItem("current_puzzle", text);
  },
};

export { PuzzleService };
