<template>
  <div>
    <div class="task-container backlog">
      <h4>{{ category }}</h4>
      <div v-for="task in filterTasks" :key="task.id">
        <task-card
          :category="task.category"
          :title="task.title"
          :taskId="task.id"
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
    return {};
  },
  components: { TaskCard },
  props: ["category", "tasks"],
  computed: {
    filterTasks() {
      return this.tasks.filter((e) => e.category === this.category);
    },
  },
};
</script>

<style>
</style>