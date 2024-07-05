<template>
  <div class="w-full mx-auto p-4">
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Services</h1>
      <button
        v-if="services.length > 0"
        @click="handleAddNewService"
        :class="[
          'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
          'transition duration-150 ease-in-out',
          { 'opacity-75 cursor-not-allowed': isAddingService }
        ]"
        :disabled="isAddingService"
      >
        <span v-if="!isAddingService">Add New Service</span>
        <span v-else class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      </button>
    </header>

    <div class="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Search"
        class="flex-grow p-2 border border-gray-300 rounded mr-2"
        v-model="searchQuery"
        @input="onSearchChange"
      >
      <select v-model="sortBy" @change="onSortChange" class="p-2 border border-gray-300 rounded mr-2">
        <option value="name">Name</option>
        <option value="created_at">Created At</option>
      </select>
      <select v-model="sortDirection" @change="onSortChange" class="p-2 border border-gray-300 rounded">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <div v-else-if="services.length === 0" class="text-center mt-10 p-8 bg-gray-100 rounded-lg shadow-inner">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="mt-4 text-xl font-semibold text-gray-700">No services available</h3>
      <p class="mt-2 text-gray-600">Get started by creating your first service!</p>
      <button
        @click="handleAddNewService"
        class="mt-4 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        :disabled="isAddingService"
      >
        <span v-if="!isAddingService">Create First Service</span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="service in services"
        :key="service.id"
        class="bg-white p-4 rounded shadow flex flex-col h-full cursor-pointer"
        @click="goToServiceDetail(service.id)"
      >
        <div class="flex-grow">
          <h2 class="text-lg font-semibold text-blue-600 mb-2">{{ service.name }}</h2>
          <p class="text-gray-600 mb-4">{{ service.description }}</p>
        </div>
        <div class="mt-auto flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
          </svg>
          <span>{{ service.version_count }} {{ service.version_count === 1 ? 'Version' : 'Versions' }}</span>
        </div>
      </div>
    </div>

    <div class="mt-4 flex justify-center">
      <button
        class="mx-1 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        &lt;
      </button>
      <span class="mx-2">{{ currentPage }} of {{ totalPages }}</span>
      <button
        class="mx-1 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from "vue-toastification";
import debounce from 'lodash/debounce';  // 需要安装 lodash

export default {
  setup() {
    const toast = useToast();

    // Add New Service is loading
    const isAddingService = ref(false);
    // List is loading
    const isLoading = ref(true);

    const services = ref([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const pageSize = ref(12);
    const totalCount = ref(0);
    const totalPages = ref(1);

    const sortBy = ref('name');
    const sortDirection = ref('asc');
    const router = useRouter();
    const route = useRoute();

    const fetchServices = async () => {
      isLoading.value = true;
      try {
        const queryParams = new URLSearchParams({
          query: searchQuery.value,
          sort_by: sortBy.value,
          sort_direction: sortDirection.value,
          page: currentPage.value.toString(),
          page_size: pageSize.value.toString()
        });

        const response = await fetch(
          `http://localhost:8080/api/v1/services?${queryParams}`,
          {
            headers: {
              'Authorization': 'Bearer dummy_token'
            }
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        services.value = data.data;
        totalCount.value = data.total_count;
        currentPage.value = data.page;
        pageSize.value = data.page_size;
        totalPages.value = data.total_pages;
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services. Please try again later.');
      } finally {
        isLoading.value = false;
      }
    };

    const updateURL = () => {
      const query = {
        query: searchQuery.value || undefined,
        sort_by: sortBy.value !== 'name' ? sortBy.value : undefined,
        sort_direction: sortDirection.value !== 'asc' ? sortDirection.value : undefined,
        page: currentPage.value !== 1 ? currentPage.value : undefined,
      };
      router.push({ name: 'services', query });
    };

    const debouncedFetchServices = debounce(fetchServices, 300);

    watch(
      () => route.query,
      (newQuery) => {
        searchQuery.value = newQuery.query || '';
        sortBy.value = newQuery.sort_by || 'name';
        sortDirection.value = newQuery.sort_direction || 'asc';
        currentPage.value = parseInt(newQuery.page) || 1;
        debouncedFetchServices();
      },
      { immediate: true }
    );

    const onSearchChange = () => {
      currentPage.value = 1;
      updateURL();
    };

    const onSortChange = () => {
      currentPage.value = 1;
      updateURL();
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        updateURL();
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        updateURL();
      }
    };

    const goToServiceDetail = (id) => {
      router.push({ name: 'service-detail', params: { id } });
    };

    const handleAddNewService = async () => {
      isAddingService.value = true;

      toast.info("This feature is not implemented yet", {
        position: "top-right",
        timeout: 1500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false
      });

      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 200));

      isAddingService.value = false;
    };

    return {
      isLoading,
      isAddingService,
      services,
      searchQuery,
      currentPage,
      totalPages,
      sortBy,
      sortDirection,
      prevPage,
      nextPage,
      goToServiceDetail,
      onSearchChange,
      onSortChange,
      updateURL,
      handleAddNewService
    };
  }
}
</script>

<style>
/* 可选：添加自定义样式 */
</style>