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
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label><br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                />
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-primary" id="login-btn">
                  Login
                </button>
              </div>
            </form>
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
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  props: ["changePage", "isLoggedIn"],
  methods: {
    showRegisterForm() {
      // this.changePage("register");
      this.changePage("register");
    },
    handleLogin() {
      this.isLoggedIn("12314");
    },
  },
};
</script>

<style>
</style>