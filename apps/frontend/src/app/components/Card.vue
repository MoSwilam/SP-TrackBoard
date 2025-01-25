<template>
  <div class="card" draggable="true" @dragstart="onDragStart">
    <div class="card-header">
      <h2>{{ title }}</h2>
      <span class="card-status"> {{ status }}</span>
    </div>
    <div class="card-body">
      <p class="card-updated">Updated {{ updated }}</p>
    </div>
    <div class="card-actions">
      <button class="card-action" @edit="handleEdit">Edit</button>
      <button class="card-action" @delete="handleDelete">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

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
  updated: {
    type: String,
    required: true,
  },
});

// Log props when the component mounts
// onMounted(() => {
//   console.log('Card props:', props);
// });

const emit = defineEmits(['drag-start', 'edit', 'delete']);

const onDragStart = (event: any) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('caseId', props.id);
  emit('drag-start', props.id, props.id);
};
const handleEdit = (card: any) => {
  emit('edit', card);
};

const handleDelete = (card: any) => {
  emit('delete', card);
};
</script>

<style scoped lang="scss">
.card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  margin: 0 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.card-status {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.status-to-do {
  background-color: #f0f4ff;
  color: #1e40af;
}

.status-in-progress {
  background-color: #fff7ed;
  color: #c2410c;
}

.status-done {
  background-color: #f0fdf4;
  color: #166534;
}

.status-archived {
  background-color: #f5f5f5;
  color: #6b7280;
}

.card-body {
  margin-bottom: 1rem;
}

.card-updated {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.card-action {
  background-color: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
}
</style>
