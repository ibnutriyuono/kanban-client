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
            <category
              :category="category"
              :tasks="tasks"
              @deleteTask="deleteTask"
              @updateTask="updateTask"
            ></category>
          </div>
        </div>
      </div>
    </section>
    <div
      class="modal fade"
      id="addTaskModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addTaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTaskModalLabel">Add new task</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form method="POST" v-on:submit.prevent="addNewTask">
            <div class="modal-body">
              <div class="form-group">
                <label for="title">Title:</label><br />
                <input
                  type="text"
                  name="title"
                  v-model="addNewTitle"
                  id="add-title"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="category">Category:</label><br />
                <!-- <input type="text" name="category" id="edit-category" class="form-control"> -->
                <select v-model="addNewCategory" class="custom-select">
                  <option value="Backlog">Backlog</option>
                  <option value="ToDo">ToDo</option>
                  <option value="Done">Done</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "../components/Category.vue";
export default {
  name: "MainPage",
  data() {
    return {
      addNewTitle: "",
      addNewCategory: "",
    };
  },
  props: ["tasks", "categories"],
  components: {
    Category,
  },
  methods: {
    addNewTask() {
      let title = this.addNewTitle;
      let category = this.addNewCategory;
      let data = {
        title,
        category,
      };
      this.$emit("postData", data);
      $("#addTaskModal").modal("toggle");
    },
    deleteTask(val) {
      this.$emit("deleteTask", val);
    },
    updateTask(val) {
      this.$emit("updateTask", val);
    },
  },
};
</script>

<style>
</style>