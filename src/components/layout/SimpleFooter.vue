<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <!-- Logo et copyright -->
        <div class="text-center sm:text-left">
          <p class="text-sm text-gray-500">
            © {{ currentYear }} <span class="font-semibold text-emerald-600">ProductManager</span>. 
            Tous droits réservés.
          </p>
        </div>

        <!-- Liens simples -->
        <div class="flex space-x-6 text-sm text-gray-500">
          <router-link 
            to="/" 
            class="hover:text-emerald-600 transition-colors"
          >
            Accueil
          </router-link>
          <router-link 
            v-if="isAuthenticated"
            to="/products" 
            class="hover:text-emerald-600 transition-colors"
          >
            Produits
          </router-link>
          <a href="#" class="hover:text-emerald-600 transition-colors">Support</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const currentYear = new Date().getFullYear()
</script> 