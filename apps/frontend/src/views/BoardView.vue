<template>
  <dev class="wrapper">
    <h1 class="title">
      Board
    </h1>
    <div class="container">
      <TodoStage
        id="1"
        class="drop-zone"
        :status="TaskStatus.Todo"
        title="Todo"
        :cases="tasks.filter((task: any) => task.status === TaskStatus.Todo)"
        @edit="onEditCard"
        @delete="onDeleteCard"
        @drop="onDrop"
        @dragenter.prevent
        @dragover.prevent
      />
      <InProgressStage 
        id="2"
        class="drop-zone"
        :status="TaskStatus.InProgress"
        title="In Progress"
        :cases="tasks.filter((task: any) => task.status === TaskStatus.InProgress)"
        @drop="onDrop"
        @dragenter.prevent
        @dragover.prevent
      />
      <DoneStage
        id="3"
        class="drop-zone"
        :status="TaskStatus.Done"
        title="Done"
        :cases="tasks.filter((task: any) => task.status === TaskStatus.Done)"
        @drop="onDrop"
        @dragenter.prevent
        @dragover.prevent
      />
      <!--  <ArchivedStage
        id="4"
        class="drop-zone"
        title="Archieved"
        :status="TaskStatus.Archived"
        :cases="tasks.filter((task: any) => task.status === TaskStatus.Archived)"
        @drop="onDrop"
        @dragenter.prevent
        @dragover.prevent
      /> -->
    </div>
  </dev>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TodoStage from '../app/components/todo.stage.vue';
import DoneStage from '../app/components/done.stage.vue';
import InProgressStage from '../app/components/inprogress.stage.vue';
import ArchivedStage from '../app/components/archived.stage.vue';
import apiClient from '../app/api-client/client';

// Local state for tasks
const tasks = ref([
  { id: 1, title: 'Case 1', status: TaskStatus.Todo, updated: '2021-10-01' },
  { id: 2, title: 'Case 2', status: TaskStatus.Done, updated: '2021-11-01' },
  { id: 3, title: 'Case 3', status: TaskStatus.InProgress, updated: '2021-11-01' },
  { id: 4, title: 'Case 4', status: TaskStatus.InProgress, updated: '2021-11-01' },
  { id: 5, title: 'Case 5', status: TaskStatus.InProgress, updated: '2021-11-01' },
]);


const onEditCard = async (card: any) => {
  try {
    console.log('Edit card', card);
    const response = await apiClient.patch(`/cases`, {
      card,
    });``
    console.log('Edit card response:', response);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  console.log('Tasks:', tasks.value);
});


const onDrop = (itemId: number, toStage: TaskStatus) => {
  const taskIndex = tasks.value.findIndex((task) => task.id === +itemId);

  console.log('taskIndex', taskIndex);

  if (taskIndex !== -1) {
    const task = tasks.value[taskIndex];
    // log info
    console.log({
      itemToUpdate: task,
      toStage,
      itemId
    })
    tasks.value[taskIndex].status = toStage;
    console.log('Updated tasks:', tasks.value);

    // updateTaskStatus(itemId, toStage);
  }
}

const updateTaskStatus = async (cardId: number, newStatus: string) => {
  try {
    console.log('Edit card', cardId);
    const response = await apiClient.post(`/cases`, {
      title: 'Card title yooooo',
    });
    console.log('Edit card response:', response);
  } catch (error) {
    console.error('Failed to update task status:', error);
  }
};

</script>

<script lang="ts">
export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
  Archived = 'archived',
}

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
