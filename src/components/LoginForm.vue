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
      this.changePage("register");
    },
    handleLogin() {
      axios({
        method: "POST",
        url: `http://localhost:3000/login`,
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          this.isLoggedIn(res.data.access_token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style>
</style>