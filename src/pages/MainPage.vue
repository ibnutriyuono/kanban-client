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
          <div class="col task-container backlog">
            <h4>📚 Backlog</h4>
            <div class="card mt-3" style="width: 12rem">
              <div class="card-body">
                <h5 class="card-title">title</h5>
                <div class="card-text">
                  <p>category</p>
                </div>
                <button
                  type="button"
                  @click="editTaskById(task.id)"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#editTaskModal"
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MainPage",
};
</script>

<style>
</style>