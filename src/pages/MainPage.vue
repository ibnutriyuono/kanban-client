<template>
  <div>
    <section id="main">
      <div class="container">
        <div class="row mb-3">
          <button
            type="button"
            class="btn btn-primary mr-3"
            data-toggle="modal"
            data-target="#addTaskModal"
          >
            Add New Task
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#addCategoryModal"
          >
            Add New Category
          </button>
        </div>
        <div class="row">
          <div v-for="(category, index) in categories" :key="index">
            <category
              :category="category"
              :categories="categories"
              :tasks="tasks"
              @deleteTask="deleteTask"
              @updateTask="updateTask"
              @patchTaskData="patchTaskData"
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
                <select v-model="addNewCategory" class="custom-select">
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
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
    <div
      class="modal fade"
      id="addCategoryModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCategoryModalLabel">
              Add new category
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form method="POST" v-on:submit.prevent="handleAddNewCategory">
            <div class="modal-body">
              <div class="form-group">
                <label for="category">Category Name:</label><br />
                <input
                  type="text"
                  name="category"
                  v-model="categoryName"
                  id="add-category"
                  class="form-control"
                />
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
      categoryName: "",
    };
  },
  props: ["tasks", "categories"],
  components: {
    Category,
  },
  methods: {
    addNewTask() {
      let title = this.addNewTitle;
      let CategoryId = this.addNewCategory;
      let data = {
        title,
        CategoryId,
      };
      this.$emit("postData", data);
      $("#addTaskModal").modal("toggle");
      this.addNewTitle = "";
      this.addNewCategory = "";
    },
    deleteTask(val) {
      this.$emit("deleteTask", val);
    },
    updateTask(val) {
      this.$emit("updateTask", val);
    },
    patchTaskData(val) {
      this.$emit("patchTaskData", val);
    },
    handleAddNewCategory() {
      $("#addCategoryModal").modal("toggle");
      this.$emit("categoryName", this.categoryName);
      this.categoryName = "";
    },
  },
};
</script>

<style>
</style>