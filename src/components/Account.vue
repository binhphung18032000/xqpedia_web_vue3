<template>
  <div
    class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center text-white"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container bg-gray-900 w-11/12 md:max-w-sm mx-auto rounded-md shadow-lg z-50 overflow-y-auto shadow-md"
      :class="{ hidden: view !== 'form' }"
    >
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 px-6">
        <div class="flex justify-center items-center">
          <img src="/icon.svg" class="w-10" alt="XQPedia" />

          <span class="ml-1 font-semibold text-2xl">XQPEDIA</span>
        </div>

        <form class="mt-4" @submit.prevent="submit">
          <label class="block">
            <span class="text-sm">Tên <span class="text-red-500">*</span></span>
            <input
              type="text"
              class="bg-gray-800 form-input mt-1 block w-full rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
              :class="{ 'border-1 border-red-700': nameError }"
              v-model="name"
              v-on:keydown.enter.prevent="submit"
            />
          </label>

          <label class="block mt-3">
            <span class="text-sm">Email</span>
            <input
              type="email"
              class="bg-gray-800 form-input mt-1 block w-full rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
              v-model="email"
              v-on:keydown.enter.prevent="submit"
            />
          </label>

          <label class="block mt-3">
            <span class="text-sm">Số điện thoại</span>
            <input
              type="text"
              class="bg-gray-800 form-input mt-1 block w-full rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
              v-model="phone"
              v-on:keydown.enter.prevent="submit"
            />
          </label>

          <div class="flex justify-end pt-6">
            <button
              @click.prevent="cancel"
              class="px-6 py-3 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-700 hover:text-gray-100 mr-2"
            >
              Bỏ qua
            </button>

            <button
              type="submit"
              :disabled="name == null || name === ''"
              class="py-2 px-4 text-center rounded-md tracking-wide text-white text-sm"
              :class="{
                'bg-gray-600 hover:bg-gray-500 pointer-events-none ':
                  name === null || name === '',
                'bg-green-500 hover:bg-green-600 cursor-pointer':
                  name !== null && name !== '',
              }"
            >
              {{ mode }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      class="modal-container bg-gray-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
      :class="{ hidden: view !== 'success' }"
    >
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold"></p>
        </div>

        <p>Bạn đã cập nhật thông tin thành công</p>
        <!--Footer-->
        <div class="flex justify-end pt-3">
          <button
            @click="success"
            class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
          >
            Ok
          </button>
        </div>
      </div>
    </div>

    <div
      class="modal-container bg-gray-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
      :class="{ hidden: view !== 'fail' }"
    >
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold"></p>
        </div>

        <p>Có lỗi xảy ra, bạn vui lòng thử lại sau</p>
        <!--Footer-->
        <div class="flex justify-end pt-3">
          <button
            @click="view = 'form'"
            class="px-6 py-3 bg-green-600 rounded-md text-white font-medium tracking-wide hover:bg-green-500"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AccountService } from "../services/account.service";

export default {
  data() {
    return {
      name: null,
      email: null,
      phone: null,
      view: "form", // success, fail,
      nameError: false,
    };
  },
  watch: {
    name: function (newVal, oldVal) {
      if (oldVal != null && (newVal == null || newVal === "")) {
        this.nameError = true;
      } else {
        this.nameError = false;
      }
    },
  },

  computed: {
    code() {
      return this.$store.getters["account/code"];
    },
    mode() {
      if (this.code != null && this.code != "") {
        return "Cập nhật";
      }
      return "Đăng kí";
    },
  },
  methods: {
    submit: async function () {
      if (this.name !== null && this.name !== "") {
        const account = await AccountService.submit(
          this.code,
          this.name,
          this.email,
          this.phone
        );
        if (account) {
          this.$store.dispatch("account/update", account);
          this.view = "success";
        } else {
          this.view = "fail";
        }
      }
    },
    cancel: function () {
      this.$emit("cancel");
      this.view = "form";
    },
    success: function () {
      this.$emit("success");
      this.view = "form";
    },
  },
  mounted() {
    this.name = this.$store.getters["account/name"];
    this.email = this.$store.getters["account/email"];
    this.phone = this.$store.getters["account/phone"];
  },
};
</script>
