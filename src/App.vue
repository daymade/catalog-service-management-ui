<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <!-- logo -->
              <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-auto">
              <!-- Catalog 文字 -->
              <span class="ml-3 text-2xl font-bold text-sky-500 tracking-wide uppercase">Catalog</span>
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <router-link to="/services" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Services
              </router-link>
              <a href="http://localhost:3000" target="_blank" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Grafana
              </a>
              <a href="http://localhost:16686/search" target="_blank" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Jaeger
              </a>
              <a href="http://localhost:8428/vmui" target="_blank" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Victoria Metrics
              </a>
              <a href="http://localhost:8080/swagger/index.html" target="_blank" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                OpenAPI Docs
              </a>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <!-- 通知图标 -->
            <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">View notifications</span>
              <i class="fas fa-bell h-6 w-6"></i>
            </button>

            <!-- 疑问图标 -->
            <button class="ml-4 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Help</span>
              <i class="fas fa-question-circle h-6 w-6"></i>
            </button>

            <!-- 用户下拉菜单 -->
            <div class="ml-3 relative">
              <div>
                <button @click="toggleUserMenu" class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <!-- 使用 v-if/v-else 来处理头像 -->
                  <img v-if="user.avatar" class="h-8 w-8 rounded-full" :src="user.avatar" :alt="user.username">
                  <div v-else class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    {{ user.username ? user.username.charAt(0).toUpperCase() : 'U' }}
                  </div>
                </button>
              </div>
              <div v-if="showUserMenu" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <div class="flex-grow pt-16 py-10"> <!-- Adjusted padding to account for fixed navbar -->
      <main>
        <div class="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const user = ref({});
    const showUserMenu = ref(false);

    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/user', {
          headers: {
            'Authorization': 'Bearer dummy_token'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        user.value = await response.json();
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value;
    };

    onMounted(() => {
      fetchUserInfo();
    });

    return {
      user,
      showUserMenu,
      toggleUserMenu
    };
  }
}
</script>

<style>
/* Optional: Add custom styles here */
</style>