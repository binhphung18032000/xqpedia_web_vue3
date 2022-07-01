import axios from "axios";
const RushService = {
  async submitResult(code, type, score, resolved, total, data) {
    const rush = {
      code: code,
      type: type,
      score: score,
      resolved: resolved,
      total: total,
      data: btoa(JSON.stringify(data)),
    };
    const url = process.env.API_URL + "api/v1/rush";
    return await axios
      .post(url, rush)
      .then(function () {
        return true;
      })
      .catch(function (error) {
        console.log("Submit rush result ", error);
        return false;
      });
  },

  async getRank(type) {
    let cache = sessionStorage.getItem("rank_" + type);
    if (cache) {
      cache = JSON.parse(cache);
      const minutes = (new Date() - new Date(cache.time)) / 1000 / 60;
      if (minutes < 5) {
        return cache;
      }
    }

    const url = process.env.API_URL + "api/v1/rush/rank/" + type;
    return await axios
      .get(url)
      .then(function (response) {
        let ranks = response.data;
        sessionStorage.setItem("rank_" + type, JSON.stringify(ranks));
        return ranks;
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  },
};

export { RushService };
