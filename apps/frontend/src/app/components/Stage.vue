<template>
  <div
    class="stage" 
    @drop="handleDrop"
    @dragenter.prevent 
    @dragover.prevent
  >
    <h1 class="stage-title">
      {{ title }}
    </h1>
    <div class="stage-cards">
      <Card
        v-for="card in cases"
        
        :id="card.id"
        :key="card.id"
        :title="card.title"
        :status="card.status"
        :updated="card.updatedAt"
        @edit="handleEdit"
        @delete="handleDelete"
      />
      <!-- Editing Mode: Input Field + Save Button -->
      <div v-if="isEditing" class="edit-container">
        <input
          v-model="newTaskTitle"
          class="edit-input"
          placeholder="Enter task title"
        />
        <Button class="save-button" @click="handleAdd">
          Save
        </Button>
      </div>
      <button
        v-if="title === 'TODO' && !isEditing"
        class="add-button"
        @click="toggleEdit"
      >
        + Add Case
      </button>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from './Card.vue';

import { Task } from '../types/types';

const props = defineProps<{
  id: number;
  title: string;
  status: string;
  cases: Task[];
}>();

// Log props when the component mounts
onMounted(() => {
  console.log('Stage props:', props);
});

const isEditing = ref(false);
const newTaskTitle = ref('');


const emit = defineEmits(['drop', 'add', 'edit', 'delete']);


const handleDrop = (event: DragEvent) => {
  const cardId = event.dataTransfer?.getData('caseId'); // Get the card ID
  isEditing.value = false; // Exit edit mode when dropping a card
  if (cardId) {
    emit('drop', +cardId, props.status); // Emit the drop event with card ID and target stage
  }
};

const toggleEdit = () => {
  if (isEditing.value) {
    handleAdd(); // Save changes when switching back to view mode
  } else {
    isEditing.value = true; // Switch to edit mode
  }
};

const handleEdit = (card: any) => {
  console.log('Edit card:', card);
  isEditing.value = false;
  emit('edit', card);
};

const handleDelete = (card: any) => {
  console.log('Delete card:', card);
  emit('delete', card);
};

const handleAdd = () => {
  isEditing.value = false;
  emit('add', newTaskTitle.value);
};
</script>

<style scoped lang="scss">

.stage {
  
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  background-color: #e4e4e4;
  margin-bottom: 1rem;
  // padding: 1rem;
  flex: 1;
  width: 100%;
  min-width: 200px;
}

.stage-title {
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.stage-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-button {
  background-color: #ffffff;
  border: 1px dashed #e0e0e0;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #000000;
  cursor: pointer;
  font-size: 0.875rem;
  text-align: center;
  transition: background-color 0.2s;
  margin-top: auto;

  &:hover {
    background-color: #f0f0f0;
  }
}

.edit-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  // padding: 0.5rem; // Add padding to prevent overflow
  border-radius: 0.25rem; // Optional: Add border radius for better appearance
}


.edit-input {
  flex-grow: 1;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
}

.edit-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #007bff; // Change color on hover
  }
}

.save-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  margin: 0 1rem;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
}

</style>
