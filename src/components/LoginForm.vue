<template>
  <div>
    <div id="login-container">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-6 auth-box">
            <form
              id="login-form"
              class="form auth-form"
              v-on:submit.prevent="handleLogin"
            >
              <h3 class="text-center text-info">Login</h3>
              <div class="form-group">
                <label for="email" class="text-info">Email:</label><br />
                <input
                  type="text"
                  name="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label><br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                />
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-primary" id="login-btn">
                  Login
                </button>
              </div>
            </form>
            <div class="d-flex justify-content-end">
              <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="onSuccess"
              ></GoogleLogin>
            </div>
          </div>
        </div>
        <div id="register-link" class="text-center mt-3">
          <a href="#" @click="showRegisterForm">Register here</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "492545537423-u7qvinekb1massbdduh5ka331t1q3aee.apps.googleusercontent.com",
      },
      renderParams: {},
    };
  },
  components: {
    GoogleLogin,
  },
  props: ["changePage", "isLoggedIn"],
  methods: {
    showRegisterForm() {
      this.changePage("register");
    },
    handleLogin() {
      let data = {
        email: this.email,
        password: this.password,
      };
      this.$emit("loginData", data);
      this.email = "";
      this.password = "";
    },
    onSuccess(googleUser) {
      const { id_token } = googleUser.Bc;
      this.$emit("googleToken", id_token);
    },
  },
};
</script>

<style>
</style>