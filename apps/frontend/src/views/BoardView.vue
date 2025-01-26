<template>
  <div class="wrapper">
    <h1 class="title">Board</h1>
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading">Loading...</div>

      <!-- Error State -->
      <div v-if="error" class="error">
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
import { ref, onMounted, computed } from 'vue';
import Stage from '../app/components/Stage.vue';
import apiClient from '../app/api-client/client';
import { Task, TaskStatus } from '../app/types/types';

const tasks = ref<Task[]>([]);``
const loading = ref(true);
const error = ref(false);

const stages = [
  { id: 1, status: TaskStatus.Todo, title: 'TODO' },
  { id: 2, status: TaskStatus.InProgress, title: 'IN PROGRESS' },
  { id: 3, status: TaskStatus.Done, title: 'DONE' },
  { id: 4, status: TaskStatus.Archived, title: 'ARCHIVED' },
];

const getTasksByStatus = computed(() => {
  return (status: TaskStatus) => tasks.value.filter(task => task.status === status);
});


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
    console.log('Edit card', card);
    await apiClient.updateTask(card.id, card);
    const taskIndex = tasks.value.findIndex((task) => task.id === card.id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex].title = card.title;
    }
  } catch (error) {
    console.error('Failed to edit card:', error);
  }
};

const handleDelete = async (taskToDelete: Task) => {
  try {
    console.log('Delete card from BoardView', taskToDelete);
    await apiClient.deleteTask(taskToDelete.id);
    tasks.value = tasks.value.filter(task => task.id !== taskToDelete.id);
    console.log('card deleted');
  } catch (error) {
    console.error('Failed to delete card:', error);
  }
};

const onDrop = async (itemId: number, toStage: TaskStatus) => {
  try {
    const updateRes = await apiClient.updateTask(itemId, toStage);
    const taskIndex = tasks.value.findIndex((task) => task.id === updateRes.id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex].status = toStage;
    }
  } catch (error) {
    console.error('Failed to update card status:', error);
  }
};

const handleAdd = async (title: string) => {
  try {
    console.log('Adding new card:', title);
    const response = await apiClient.createTask(title);
    console.log('Add card response:', response);
    tasks.value.push(response);
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
