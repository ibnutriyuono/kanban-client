<template>
  <div>
    <section id="auth">
      <login-form
        v-if="currentPage === 'login'"
        :changePage="changePage"
        :isLoggedIn="isLoggedIn"
      ></login-form>
      <register-form
        v-if="currentPage === 'register'"
        :changePage="changePage"
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
  },
};
</script>

<style>
</style>