<template>
  <div>
    <section id="main">
      <div class="container">
        <div class="row mb-3">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#addTaskModal"
          >
            Add New Task
          </button>
        </div>
        <div class="row">
          <div v-for="(category, index) in categories" :key="index">
            <category :category="category" :tasks="tasks"></category>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Category from "../components/Category.vue";
export default {
  name: "MainPage",
  props: ["tasks", "categories"],
  components: {
    Category,
  },
};
</script>

<style>
</style>