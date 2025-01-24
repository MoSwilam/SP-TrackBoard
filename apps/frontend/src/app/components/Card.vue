<template>
  <div class="card">
    <div class="card-header">
      <h2>{{ title }}</h2>
      <span class="card-status" :class="statusClass"> {{ status }}</span>
    </div>
    <div class="card-body">
      <p class="card-updated">Updated {{ updated }}</p>
    </div>
    <div class="card-actions">
      <button class="card-action" @click="onEdit">Edit</button>
      <button class="card-action" @click="onDelete">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
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

const emit = defineEmits(['edit', 'delete']);

const onEdit = () => {
  emit('edit');
};

const onDelete = () => {
  emit('delete');
};

const statusClass = computed(() => {
  return `status-${props.status.toLowerCase().replace(' ', '-')}`;
});
</script>

<style scoped lang="scss">
.card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
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
