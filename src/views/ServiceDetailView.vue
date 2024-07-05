<template>
  <div class="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error! </strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>

    <div v-else class="bg-white p-6 rounded shadow">
      <h1 class="text-3xl font-bold mb-4">{{ service.name }}</h1>
      <p class="text-gray-600 mb-4">{{ service.description }}</p>
      <div class="text-sm text-gray-500 mb-4">
        <span class="mr-2">Owner ID: {{ service.owner_id }}</span>
        <span class="mr-2">Created At: {{ new Date(service.created_at).toLocaleDateString() }}</span>
        <span>Updated At: {{ new Date(service.updated_at).toLocaleDateString() }}</span>
      </div>
      <h2 class="text-2xl font-semibold mb-4">Versions</h2>
      <ul>
        <li v-for="version in service.versions" :key="version.number" class="mb-4">
          <div class="text-lg font-bold text-blue-600">{{ version.number }}</div>
          <div class="text-gray-600">{{ version.description }}</div>
          <div class="text-sm text-gray-500">Created At: {{ new Date(version.created_at).toLocaleDateString() }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const service = ref({});
    const isLoading = ref(true);
    const error = ref(null);

    const fetchService = async () => {
      isLoading.value = true;
      error.value = null;
      try {
        const response = await fetch(`http://localhost:8080/api/v1/services/${route.params.id}`, {
          headers: {
            'Authorization': 'Bearer dummy_token'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        service.value = await response.json();
      } catch (err) {
        console.error('Error fetching service details:', err);
        error.value = 'Failed to load service details. Please try again later.';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchService();
    });

    return {
      service,
      isLoading,
      error
    };
  }
}
</script>