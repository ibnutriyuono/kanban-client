<template>
  <div>
    <section id="auth">
      <login-form
        v-if="currentPage === 'login'"
        :changePage="changePage"
        :isLoggedIn="isLoggedIn"
        @loginData="handleLogin"
      ></login-form>
      <register-form
        v-if="currentPage === 'register'"
        :changePage="changePage"
        @registerData="handleRegister"
      ></register-form>
    </section>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
export default {
  name: "AuthPage",
  data() {
    return {
      currentPage: "login",
    };
  },
  props: ["isLoggedIn"],
  components: {
    LoginForm,
    RegisterForm,
  },
  methods: {
    changePage(payload) {
      this.currentPage = payload;
    },
    handleLogin(value) {
      this.$emit("loginData", value);
    },
    handleRegister(value) {
      this.$emit("registerData", value);
    },
  },
};
</script>

<style>
</style>