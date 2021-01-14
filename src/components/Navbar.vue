<template>
  <div>
    <nav class="navigation">
      <ul>
        <li><a href="#">Kanban</a></li>
        <li>
          <a href="#">soon mail</a>
        </li>
        <li>
          <a href="#" @click="handleLogout">Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["isLoggedOut"],
  methods: {
    handleLogout() {
      this.isLoggedOut();
    },
  },
};
</script>

<style>
</style>