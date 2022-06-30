<template>
  <div class="flex h-screen bg-gray-200">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main
        class="flex-1 overflow-x-hidden overflow-y-auto background text-white"
      >
        <div class="container mx-auto px-2 py-2 sm:px-6 sm:py-6">
          <Nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";

export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>
