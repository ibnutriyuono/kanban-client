<template>
  <div>
    <div class="card mt-3" style="width: 12rem">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <div class="card-text">
          <p>{{ category }}</p>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#editTaskModal"
        >
          Show Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["category", "title", "taskId"],
};
</script>

<style>
</style>