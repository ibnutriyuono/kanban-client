<template>
  <div>
    <navbar
      @isLoggedOut="isLoggedOut"
      :currentPage="currentPage"
      :userData="userEmailData"
    ></navbar>
    <auth-page
      v-if="currentPage === 'auth'"
      @loginData="handleLogin"
      @registerData="handleRegister"
    ></auth-page>
    <main-page
      v-if="currentPage === 'main'"
      :tasks="tasks"
      :categories="categories"
    ></main-page>
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
      baseUrl: "http://localhost:3000",
      currentPage: "auth",
      categories: ["Backlog", "Todo", "Done", "Completed"],
      tasks: [],
      userEmailData: "",
    };
  },
  components: {
    Navbar,
    AuthPage,
    MainPage,
  },
  methods: {
    isLoggedIn(access_token, email) {
      this.currentPage = "main";
      this.userEmailData = email;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("email", email);
    },
    isLoggedOut(status) {
      if (status) {
        this.currentPage = "auth";
        localStorage.clear();
      }
    },
    checkAuth() {
      if (localStorage.getItem("access_token")) {
        this.currentPage = "main";
        this.getAllTasks();
      } else {
        this.currentPage = "auth";
      }
    },
    handleLogin(payload) {
      axios({
        method: "POST",
        url: `http://localhost:3000/login`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((res) => {
          this.isLoggedIn(res.data.access_token, res.data.email);
          this.checkAuth();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    handleRegister(payload) {
      axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          email: payload.email,
          password: payload.password,
          first_name: payload.first_name,
          last_name: payload.last_name,
        },
      })
        .then((res) => {
          this.checkAuth();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getAllTasks() {
      axios({
        url: `http://localhost:3000/tasks`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>

<style>
</style>