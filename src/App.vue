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
      @postData="handlePostTask"
      @deleteTask="handleDeleteTask"
      @updateTask="handleUpdateTask"
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
      categories: ["Backlog", "ToDo", "Done", "Completed"],
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
        url: `${this.baseUrl}/login`,
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
        url: `${this.baseUrl}/register`,
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
        url: `${this.baseUrl}/tasks`,
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
    handlePostTask(payload) {
      axios({
        url: `${this.baseUrl}/tasks`,
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      })
        .then((res) => {
          console.log(res.data);
          this.checkAuth();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    handleUpdateTask(payload) {
      axios({
        url: `${this.baseUrl}/tasks/${payload.id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: payload.title,
          category: payload.category,
        },
      })
        .then((res) => {
          console.log(res.data);
          this.checkAuth();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    handleDeleteTask(payload) {
      console.log(payload);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((res) => {
          if (res) {
            return axios({
              method: "DELETE",
              url: `${this.baseUrl}/tasks/${payload}`,
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            });
          }
        })
        .then((res) => {
          this.checkAuth();
          swal(res.data.message, {
            icon: "success",
          });
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