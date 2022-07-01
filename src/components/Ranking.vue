<template>
  <div class="rounded-md w-full lg:max-w-full bg-gray-900 text-white pt-2">
    <div class="">
      <p class="text-2xl">Chiến thần "{{ board }}"</p>
    </div>
    <div class="grid grid-cols-2 gap-0 text-left">
      <div class="">
        <h3 class="text-center py-2">24h</h3>
        <ul>
          <li
            v-for="(item, index) in ranking.last24h"
            :key="index"
            class="flex justify-between px-1 py-2 bg-green-500"
            :class="{
              'bg-opacity-100 text-lg': index === 0,
              'bg-opacity-75 text-lg': index === 1,
              'bg-opacity-50': index === 2,
              'bg-opacity-25': index > 2,
            }"
          >
            <div class="whitespace-no-wrap overflow-hidden px-1">
              {{ item.name }}
            </div>
            <div class="px-1 bg-green-600 px-2 rounded">
              {{ formatScore(item.score) }}
            </div>
          </li>
        </ul>
      </div>
      <div class="">
        <h3 class="text-center py-2">1 Tuần</h3>
        <ul>
          <li
            v-for="(item, index) in ranking.last1w"
            :key="index"
            class="flex justify-between px-1 py-2 bg-teal-700"
            :class="{
              'bg-opacity-100 text-lg': index === 0,
              'bg-opacity-75 text-lg': index === 1,
              'bg-opacity-50': index === 2,
              'bg-opacity-25': index > 2,
            }"
          >
            <div class="whitespace-no-wrap overflow-hidden px-1">
              {{ item.name }}
            </div>
            <div class="px-1 bg-teal-600 px-2 rounded">
              {{ formatScore(item.score) }}
            </div>
          </li>
        </ul>
      </div>
      <div class="">
        <h3 class="text-center py-2">1 Tháng</h3>
        <ul>
          <li
            v-for="(item, index) in ranking.last1m"
            :key="index"
            class="flex justify-between px-1 py-2 bg-pink-700"
            :class="{
              'bg-opacity-100 text-lg': index === 0,
              'bg-opacity-75 text-lg': index === 1,
              'bg-opacity-50': index === 2,
              'bg-opacity-25': index > 2,
            }"
          >
            <div class="whitespace-no-wrap overflow-hidden px-1">
              {{ item.name }}
            </div>
            <div class="px-1 bg-pink-600 px-2 rounded">
              {{ formatScore(item.score) }}
            </div>
          </li>
        </ul>
      </div>
      <div class="">
        <h3 class="text-center py-2">1 Năm</h3>
        <ul>
          <li
            v-for="(item, index) in ranking.last1y"
            :key="index"
            class="flex justify-between px-1 py-2 bg-red-700"
            :class="{
              'bg-opacity-100 text-lg': index === 0,
              'bg-opacity-75 text-lg': index === 1,
              'bg-opacity-50': index === 2,
              'bg-opacity-25': index > 2,
            }"
          >
            <div class="whitespace-no-wrap overflow-hidden px-1">
              {{ item.name }}
            </div>
            <div class="px-1 bg-red-600 px-2 rounded">
              {{ formatScore(item.score) }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    view: Number,
  },
  watch: {
    view: function (newVal) {
      this.$store.dispatch("rush/loadRank", { type: newVal });
    },
  },
  computed: {
    // ranking() {
    //   switch (this.view) {
    //     case 3:
    //       return this.$store.getters["rush/rush_3m"];
    //     case 5:
    //       return this.$store.getters["rush/rush_5m"];
    //     case 10:
    //       return this.$store.getters["rush/rush_10m"];
    //     case 0:
    //       return this.$store.getters["rush/rush_survivor"];
    //   }
    // },
    // board() {
    //   switch (this.view) {
    //     case 3:
    //       return "3 phút";
    //     case 5:
    //       return "5 phút";
    //     case 10:
    //       return "10 phút";
    //     case 0:
    //       return "Sống Còn";
    //   }
    // },
    rush_3m() {
      return this.$store.getters["rush/rush_3m"];
    },
    rush_5m() {
      return this.$store.getters["rush/rush_5m"];
    },
    rush_10m() {
      return this.$store.getters["rush/rush_10m"];
    },
    rush_survivor() {
      return this.$store.getters["rush/rush_survivor"];
    },
  },
  methods: {
    formatScore(score) {
      if (this.view > 0) {
        return score;
      }
      let seconds = score % 60;
      return (
        Math.floor(score / 60) + ":" + (seconds < 10 ? "0" + seconds : seconds)
      );
    },
  },
  mounted() {
    this.$store.dispatch("rush/loadRank");
  },
};
</script>
