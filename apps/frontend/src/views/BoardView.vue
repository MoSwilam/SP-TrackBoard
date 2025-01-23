<script setup lang="ts">
import TodoStage from '../app/components/todo.stage.vue';
import DoneStage from '../app/components/done.stage.vue';
import InProgressStage from '../app/components/inprogress.stage.vue';
import ArchivedStage from '../app/components/archived.stage.vue';
</script>

<template>
  <dev class="wrapper">
    <h1 class="title">
      Board
    </h1>
    <div class="container">
      <TodoStage
        class="stage"
        title="To Do"
      />
      <InProgressStage
        class="stage"
        title="In Progress"
      />
      <DoneStage
        class="stage"
        title="Done"
      />
      <ArchivedStage title="Archived" />
    </div>
  </dev>
</template>

<script></script>

<style scoped lang="scss">

.wrapper {
  // border: 4px solid #494949;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.container {
  flex-grow: 1;
  display: flex;
  gap: 1rem; /* Add spacing between the components */
  width: 100%;
  max-width: 1200px; /* Adjust as needed */
  padding: 1rem;
}

.title {
  margin: 1rem;
  font-size: 2rem;
  color: #535457;
  align-self: flex-start;
}

.stage {
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  padding: 1rem;
  flex: 1;
  width: 100%;
  min-width: 200px;
}

@media (max-width: 1000px) {
  .container {
    flex-direction: column; /* Stack stages vertically on small screens */
  }
}
</style>