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
      <button 
        v-if="title === 'TODO'" 
        class="add-button" 
        @click="handleAdd"
      >
        + Add Case
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue';
import { Task } from '../types/types';


const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  cases: {
    type: Array as () => Task[],
    required: true,
  },
});

const emit = defineEmits(['drop', 'add', 'edit', 'delete']);

const handleDrop = (event: DragEvent) => {
  const cardId = event.dataTransfer?.getData('caseId'); // Get the card ID
  if (cardId) {
    emit('drop', +cardId, props.status); // Emit the drop event with card ID and target stage
  }
};

const handleEdit = (card: any) => {
  console.log('Edit card:', card);
  emit('edit', card);
};

const handleDelete = (card: any) => {
  console.log('Edit card:', card);
  emit('delete', card);
};

const handleAdd = () => {
  emit('add');
};
</script>

<style scoped lang="scss">
.stage {
  background-color: #f7f7f8;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
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
  padding: 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  text-align: center;
  transition: background-color 0.2s;
  margin-top: auto;

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
