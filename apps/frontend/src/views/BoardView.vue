<template>
  <dev class="wrapper">
    <h1 class="title">Board</h1>
    <div class="container">
      <TodoStage
        title="Todo1"
        :cards="[
          { id: '1', title: 'Task 1', status: 'todo', updated: '2021-10-01' },
          { id: '2', title: 'Task 2', status: 'todo', updated: '2021-10-02' },
          { id: '3', title: 'Task 3', status: 'todo', updated: '2021-10-03' },
        ]"
        @edit="onEditCard"
        @delete="onDeleteCard"
      />
      <InProgressStage class="stage" title="In Progress" />
      <DoneStage class="stage" title="Done" />
      <ArchivedStage title="Archived" />
    </div>
  </dev>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TodoStage from '../app/components/todo.stage.vue';
import DoneStage from '../app/components/done.stage.vue';
import InProgressStage from '../app/components/inprogress.stage.vue';
import ArchivedStage from '../app/components/archived.stage.vue';
import apiClient from '../app/api-client/client';

const data = ref(null);

const onEditCard = async (card: any) => {
  try {
    console.log('Edit card', card);
    const response = await apiClient.post(`/cases`, {
      title: 'Card title yooooo',
    });
    data.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const onDeleteCard = (card?: any) => {};
</script>

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

@media (max-width: 1000px) {
  .container {
    flex-direction: column; /* Stack stages vertically on small screens */
  }
}
</style>
