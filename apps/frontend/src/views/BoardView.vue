<template>
  <div class="wrapper">
    <h1 class="title">
      Board
    </h1>
    <div class="container">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="loading"
      >
        Loading...
      </div>

      <!-- Error State -->
      <div
        v-if="error"
        class="error"
      >
        Failed to load tasks. Please try again later.
      </div>

    
      <!-- Render Stages -->
      <Stage
        v-for="stage in stages"
        :id="stage.id"
        :key="stage.id"
        class="drop-zone"
        :status="stage.status"
        :title="stage.title"
        :cases="tasks.filter((task: any) => task.status === stage.status)"
        @edit="handleEdit"
        @delete="handleDelete"
        @drop="onDrop"
        @dragenter.prevent
        @dragover.prevent
        @add="handleAdd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Stage from '../app/components/Stage.vue';
import apiClient from '../app/api-client/client';
import Wrapper from '../app/components/Wrapper.vue';
import { Task, TaskStatus } from '../app/types/types';

const tasks = ref<Task[]>([]);
const loading = ref(true);
const error = ref(false);

const stages = [
  { id: 1, status: TaskStatus.Todo, title: 'TODO' },
  { id: 2, status: TaskStatus.InProgress, title: 'IN PROGRESS' },
  { id: 3, status: TaskStatus.Done, title: 'DONE' },
  { id: 4, status: TaskStatus.Archived, title: 'ARCHIVED' },
];

const emit = defineEmits(['update-card']);

const fetchTasks = async () => {
  try {
    loading.value = true;
    error.value = false;

    const response = await apiClient.getTasks();
    console.log('Fetched tasks:', response);
    tasks.value = response;
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTasks();
});

const handleEdit = async (card: any) => {
  try {
    await apiClient.updateTask(card.id, card.status);
    emit('update-card');
  } catch (error) {
    console.error('Failed to edit card:', error);
  }
};

const handleDelete = async (card: any) => {
  try {
    console.log('Delete card', card);
    const response = await apiClient.deleteTask(card.id);
    console.log('Delete card response:', response);
  } catch (error) {
    console.error('Failed to delete card:', error);
  }
};

const onDrop = async (itemId: number, toStage: TaskStatus) => {
  try {
    const updateRes = await apiClient.updateTask(itemId, toStage);
    // Update the task status in the local state
    const taskIndex = tasks.value.findIndex((task) => task.id === updateRes.id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex].status = toStage;
    }
  } catch (error) {
    console.error('Failed to update card status:', error);
  }
};

const handleAdd = async () => {
  try {
    const newTask = {
      title: 'New Case',
      status: TaskStatus.Todo,
    };
    console.log('Adding new card:', newTask);
    const response = await apiClient.createTask(newTask.title);
    console.log('Add card response:', response);
  } catch (error) {
    console.error('Failed to add card:', error);
  }
};

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

.title {
  margin: 1rem;
  font-size: 2rem;
  font-weight: 600;
  color: #535457;
  align-self: flex-start;
}

.container {
  flex-grow: 1;
  display: flex;
  gap: 1rem; /* Add spacing between the components */
  width: 100%;
  max-width: 1200px; /* Adjust as needed */
  padding: 1rem;
}

@media (max-width: 1000px) {
  .container {
    flex-direction: column; /* Stack stages vertically on small screens */
  }
}
</style>
