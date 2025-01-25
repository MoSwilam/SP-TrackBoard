<template>
  <h1 class="title">
    Board
  </h1>
  <Wrapper v-slot="{ tasks, loading, error }">
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
  </Wrapper>
</template>

<script setup lang="ts">
import Stage from '../app/components/Stage.vue';
import apiClient from '../app/api-client/client';
import Wrapper from '../app/components/Wrapper.vue';
import { TaskStatus } from '../app/types/types';



// Define stages
const stages = [
  { id: 1, status: TaskStatus.Todo, title: 'TODO' },
  { id: 2, status: TaskStatus.InProgress, title: 'IN PROGRESS' },
  { id: 3, status: TaskStatus.Done, title: 'DONE' },
  { id: 4, status: TaskStatus.Archived, title: 'ARCHIVED' },
];

// Handle card edit
const handleEdit = async (card: any) => {
  try {
    console.log('Edit card', card);
    const response = await apiClient.updateTask(card.id, card.status);
    console.log('Edit card response:', response);
  } catch (error) {
    console.error('Failed to edit card:', error);
  }
};

// Handle card delete
const handleDelete = async (card: any) => {
  try {
    console.log('Delete card', card);
    const response = await apiClient.deleteTask(card.id);
    console.log('Delete card response:', response);
  } catch (error) {
    console.error('Failed to delete card:', error);
  }
};

// Handle card drop (status update)
const onDrop = async (itemId: number, toStage: TaskStatus) => {
  try {
    console.log('Updating card status:', itemId, toStage);
    const response = await apiClient.updateTask(itemId, toStage);
    console.log('Update card status response:', response);
  } catch (error) {
    console.error('Failed to update card status:', error);
  }
};

// Handle adding a new card
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
  font-weight: 600;
  color: #535457;
  align-self: flex-start;
}

@media (max-width: 1000px) {
  .container {
    flex-direction: column; /* Stack stages vertically on small screens */
  }
}
</style>
