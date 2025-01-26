<template>
  <div
    class="card"
    draggable="true"
    @dragstart="onDragStart"
  >
    <div class="card-header">
      <!-- Display Title or Input Field -->
      <input
        v-if="isEditing"
        v-model="editedTitle"
        class="edit-input"
        @keyup.enter="saveEdit"
      >
      <i class="pi pi-check" @click="saveEdit" v-if="isEditing" style="color: slateblue"></i>
      <span
        v-else
        class="card-title"
      >{{ title }}</span>

      <!-- Edit Button (Pen or Checkmark) -->
      <button
        class="edit-button"
        @click="toggleEdit"
      >
        <i class="pi pi-pencil" v-if="!isEditing"></i>
        <i class="pi pi-times" v-if="!isEditing" @click="handleDelete"></i>
      </button>
    </div>
    <div class="card-body">
      <!-- <p>{{ status }}</p> -->
      <p>Updated: {{ updated }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
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

// Log props when the component mounts


const emit = defineEmits(['drag-start', 'edit', 'delete']);

// Toggle between edit and view modes
const toggleEdit = () => {
  if (isEditing.value) {
    saveEdit(); // Save changes when switching back to view mode
  } else {
    isEditing.value = true; // Switch to edit mode
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
  font-size: 0.600rem;
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
