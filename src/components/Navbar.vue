<template>
  <div>
    <nav class="navigation">
      <ul>
        <li><a href="#">Kanban</a></li>
        <li>
          <div>
            <a href="#" v-if="currentPage === 'main'">{{ userData }}</a>
          </div>
        </li>
        <li>
          <a href="#" v-if="currentPage === 'main'" @click="handleLogout"
            >Logout</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  props: ["currentPage", "userData"],
  methods: {
    handleLogout() {
      this.$emit("isLoggedOut", true);
    },
  },
};
</script>

<style>
</style>