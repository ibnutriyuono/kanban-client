<template>
  <div>
    <navbar></navbar>
    <!-- <auth-page
      v-if="currentPage === 'auth'"
      :isLoggedIn="isLoggedIn"
    ></auth-page>
    <main-page v-if="currentPage === 'main'"></main-page> -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage.vue";
import MainPage from "./pages/MainPage.vue";

export default {
  name: "App",
  data() {
    return {
      currentPage: "auth",
      tasks: [],
    };
  },
  components: {
    Navbar,
    AuthPage,
    MainPage,
  },
  methods: {
    isLoggedIn(access_token) {
      // console.log(access_token);
      this.currentPage = "main";
      localStorage.setItem("access_token", access_token);
    },
  },
  // created() {
  //   console.log("called");
  //   if (localStorage.getItem("access_token")) {
  //     this.currentPage = "main";
  //   } else {
  //     this.currentPage = "auth";
  //   }
  // },
};
</script>

<style>
</style>