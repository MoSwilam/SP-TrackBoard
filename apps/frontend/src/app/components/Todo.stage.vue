<template>
  <div class="stage">
    <h1 class="stage-title">Todo</h1>
    <div class="stage-cards">
      <Card
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :status="card.status"
        :updated="card.updated"
        @edit="onEditCard"
        @delete="onDeleteCard"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue';

type ICard = {
  id: string;
  title: string;
  status: string;
  updated: string;
};

defineProps({
  title: {
    type: String,
    required: true,
  },
  cards: {
    type: Array<ICard>,
    required: true,
  },
});

const emit = defineEmits(['edit', 'delete']);

const onEditCard = (card: any) => {
  emit('edit', card);
};

const onDeleteCard = (card: any) => {
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
