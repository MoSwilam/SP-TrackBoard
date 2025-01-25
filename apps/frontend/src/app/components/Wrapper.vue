<template>
  <div class="wrapper">
    <slot
      :tasks="tasks" 
      :loading="loading" 
      :error="error"
    ></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from '../api-client/client';
const tasks = ref([]);

const loading = ref(true);
const error = ref(false);

const fetchTasks = async () => {
  try {
    loading.value = true;
    error.value = false;

    const response = await apiClient.getTasks();
    console.log('Fetched tasks:', response);
    tasks.value = response;
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTasks();
});
</script>

<style scoped lang="scss">
.wrapper {
  // border: 4px solid #494949;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
</style>
