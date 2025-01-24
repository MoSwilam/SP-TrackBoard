<template>
  <div class="stage">
    <header class="stage-header">
      <h1 class="stage-title">Archived</h1>
    </header>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped lang="scss">
.stage {
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  flex: 1;
  min-width: 200px;
}

.stage-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
