<template>
  <div class="mt-3 mb-3">
    <div @dragover.prevent="" @drop="drop">
      <div class="task-container backlog">
        <h4>{{ category.name }}</h4>
        <task-card
          v-for="task in filterTasks"
          :key="task.id"
          :task="task"
          :categories="categories"
          @deleteTask="deleteTask"
          @updateTask="updateTask"
        ></task-card>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./TaskCard.vue";

export default {
  name: "Category",
  data() {
    return {
      taskById: "",
    };
  },
  components: { TaskCard },
  props: ["category", "tasks", "categories"],
  methods: {
    drop(e) {
      const taskId = e.dataTransfer.getData("task_id");
      this.$emit("patchTaskData", {
        taskId,
        category: this.category,
      });
    },
    deleteTask(val) {
      this.$emit("deleteTask", val);
    },
    updateTask(val) {
      this.$emit("updateTask", val);
    },
  },
  computed: {
    filterTasks() {
      return this.tasks.filter((e) => e.Category.name === this.category.name);
    },
  },
};
</script>

<style>
</style>