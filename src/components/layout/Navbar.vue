<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="flex items-center gap-8">
    <ul class="flex items-center gap-6">
      <li>
        <router-link 
          to="/" 
          class="text-gray-700 no-underline font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-50"
          :class="{ 'text-[#42b983] font-semibold': $route.path === '/' }"
        >
          Accueil
        </router-link>
      </li>
      <li v-if="isAuthenticated">
        <router-link 
          to="/products" 
          class="text-gray-700 no-underline font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-50"
          :class="{ 'text-[#42b983] font-semibold': $route.path === '/products' }"
        >
          Produits
        </router-link>
      </li>
    </ul>

    <div class="flex items-center">
      <template v-if="isAuthenticated">
        <button
          @click="handleLogout"
          class="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium transition-all duration-300 hover:bg-red-600 hover:shadow-md active:scale-95 border-none cursor-pointer"
        >
          Déconnexion
        </button>
      </template>
      <template v-else>
        <router-link
          to="/login"
          class="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#42b983] to-[#2c7d5d] text-white font-medium transition-all duration-300 hover:shadow-md active:scale-95 no-underline"
        >
          Connexion
        </router-link>
      </template>
    </div>
  </nav>
</template> 