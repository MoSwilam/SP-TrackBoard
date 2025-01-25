<template>
  <div class="stage">
    <h1 class="stage-title">Done</h1>
    <div class="stage-cards">
      <Card
        v-for="card in cases"
        :id="card.id"
        :key="card.id"
        :title="card.title"
        :status="card.status"
        :updated="card.updated"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue';
import { watch, onUpdated, onMounted } from 'vue';

type ICard = {
  id: number;
  title: string;
  status: string;
  updated: string;
};

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
    type: Array as () => ICard[],
    required: true,
  },
});

const emit = defineEmits(['edit', 'delete']);

const handleEdit = (card: any) => {
  console.log('Edit card:', card);
  emit('edit', card);
};

const handleDelete = (card: any) => {
  console.log('Edit card:', card);
  emit('delete', card);
};
</script>

<style scoped lang="scss">
.stage {
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  padding: 1rem;
  flex: 1;
  width: 100%;
  min-width: 200px;
}

.stage-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.stage-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
