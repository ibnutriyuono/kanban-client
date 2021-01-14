<template>
  <div>
    <div id="register-container">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-6 auth-box">
            <form id="register-form" class="form auth-form" method="post">
              <h3 class="text-center text-info">Register</h3>
              <div class="form-group">
                <label for="email" class="text-info">Email:</label><br />
                <input
                  type="text"
                  name="email"
                  id="register-email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="firstName" class="text-info">First Name:</label
                ><br />
                <input
                  type="text"
                  name="firstName"
                  id="register-firstName"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="lastName" class="text-info">Last Name:</label><br />
                <input
                  type="text"
                  name="lastName"
                  id="register-lastName"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label><br />
                <input
                  type="password"
                  name="password"
                  id="register-password"
                  class="form-control"
                />
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-primary" id="register-btn">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="login-link" class="text-center mt-3">
          <a href="#" @click="showLoginForm">Login here</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {};
  },
  props: ["changePage"],
  methods: {
    showLoginForm() {
      this.changePage("login");
    },
  },
};
</script>

<style>
</style>