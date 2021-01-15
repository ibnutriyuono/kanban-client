<template>
  <div>
    <div class="task-container backlog">
      <h4>{{ category }}</h4>
      <task-card
        v-for="task in filterTasks"
        :key="task.id"
        :task="task"
        @deleteTask="deleteTask"
        @updateTask="updateTask"
      ></task-card>
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
  props: ["category", "tasks"],
  methods: {
    deleteTask(val) {
      this.$emit("deleteTask", val);
    },
    updateTask(val) {
      this.$emit("updateTask", val);
    },
  },
  computed: {
    filterTasks() {
      return this.tasks.filter((e) => e.category === this.category);
    },
  },
};
</script>

<style>
</style>