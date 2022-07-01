<template>
  <div class="flex bg-gray-100 rounded-md">
    <div
      class="fb-comments"
      :data-href="url"
      data-numposts="5"
      data-width="100%"
      data-colorscheme="light"
    ></div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      url: process.env.APP_URI + this.$route.path.substr(1),
    };
  },
  props: {
    pageUrl: String,
  },
  watch: {
    pageUrl: function (newVal) {
      var path = newVal.charAt(0) === "/" ? newVal.substr(1) : newVal;
      if (path.startsWith("http") === true) {
        this.url = path;
      } else {
        this.url = process.env.APP_URI + path;
      }

      // this.reloadFacebook();
    },
  },
  methods: {
    // reloadFacebook() {
    //   if (process.client) {
    //     window.setTimeout(() => {
    //       if (typeof FB !== "undefined") {
    //         FB.XFBML.parse();
    //       }
    //     }, 100);
    //   }
    // },
  },
  mounted() {
    // this.reloadFacebook();
  },
};
</script>
