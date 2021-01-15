<template>
  <div>
    <div class="card mt-3" style="width: 12rem">
      <div class="card-body">
        <h5 class="card-title">{{ task.title }}</h5>
        <div class="card-text">
          <p>{{ task.category }}</p>
        </div>
        <button
          type="button"
          class="btn btn-danger"
          @click="deleteTask(task.id)"
        >
          Delete
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#editTaskModal"
          @click="openModal()"
        >
          Show Details
        </button>
      </div>
    </div>
    <edit-task-modal v-if="showModal">
      <h3 slot="header" class="modal-title">Edit {{ task.title }}</h3>

      <div slot="body">
        <div>
          <form method="POST" v-on:submit.prevent="handleEditData">
            <div class="modal-body">
              <div class="form-group">
                <label for="title">Title:</label><br />
                <input
                  type="text"
                  name="title"
                  v-model="editTitle"
                  id="edit-title"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="category">Category:</label><br />
                <select v-model="editCategory" class="custom-select">
                  <option value="Backlog">Backlog</option>
                  <option value="ToDo">ToDo</option>
                  <option value="Done">Done</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div slot="footer">
              <button
                type="button"
                class="btn btn-outline-info"
                @click="closeModal()"
              >
                Close
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </edit-task-modal>
  </div>
</template>

<script>
import EditTaskModal from "./EditTaskModal.vue";
export default {
  components: { EditTaskModal },
  name: "TaskCard",
  data() {
    return {
      editTitle: this.task.title,
      editCategory: this.task.category,
      editTaskId: this.task.id,
      showModal: false,
    };
  },
  props: ["task"],
  methods: {
    handleEditData() {
      let title = this.editTitle;
      let category = this.editCategory;
      let id = this.editTaskId;
      let data = {
        title,
        category,
        id,
      };
      this.$emit("updateTask", data);
      this.showModal = false;
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
</style>