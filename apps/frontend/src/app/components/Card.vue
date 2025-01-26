<template>
  <div
    class="card"
    draggable="true"
    @dragstart="onDragStart"
  >
    <div class="card-header">
      <input
        v-if="isEditing"
        v-model="editedTitle"
        class="edit-input"
        @keyup.enter="saveEdit"
      >
      <i
        v-if="isEditing"
        class="pi pi-check"
        style="color: #00365f; font-weight: bolder;"
        @click="saveEdit"
      />
      <span
        v-else
        class="card-title"
      >{{ title }}</span>
      <i
        v-if="!isEditing" 
        class="pi pi-pencil" 
        @click="toggleEdit"
      />

      <button
        class="edit-button"
      >
        <i
          v-if="!isEditing" 
          class="pi pi-times" 
          @click="handleDelete" 
        />
      </button>
    </div>
    <div class="card-body">
      <ProgressBar
        :value="50" 
        class="p-progressbar" 
      />
      <p class="card-updated">
        Updated: {{ updated }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';
import 'primeicons/primeicons.css'
import { ref } from 'vue';


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
const isEditing = ref(false);
const editedTitle = ref(props.title);



const emit = defineEmits(['drag-start', 'edit', 'delete']);

const toggleEdit = () => {
  if (isEditing.value) {
    saveEdit();
  } else {
    isEditing.value = true;
  }
};

const saveEdit = () => {
  isEditing.value = false;
  emit('edit', { id: props.id, title: editedTitle.value });
  editedTitle.value = '';
};

const onDragStart = (event: any) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('caseId', props.id);
  emit('drag-start', props.id, props.id);
};

const handleDelete = (card: any) => {
  emit('delete', { id: props.id, title: props.title });
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

:deep(.p-progressbar) {
  height: 10px;
  border-radius: 4px; 
  background-color: #e9ecef;
}

:deep(.p-progressbar-value) {
  background-color: #00365f !important;
  border-radius: 4px;
  color: #00365f;
  font-size: small;
}

:deep(.p-progressbar-label) {
  display: none;
}


.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.25rem;
  color: #333 !important;
  font-weight: 600;
  margin-right: 10px;
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
  flex-direction: column;
  display: flex;
  align-content: space-between;
}

.card-updated {
  font-size: 0.7rem;
  margin-top: 10px;
  color: #6b7280;
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

.edit-input {
  flex-grow: 1;
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
}


.edit-button {
  background: none;
  border: none;
  margin-left: auto;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #007bff; // Change color on hover
  }
}

.card-body {
  font-size: 0.875rem;
  color: #666;
}
</style>
