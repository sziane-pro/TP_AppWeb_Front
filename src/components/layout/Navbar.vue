<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const currentUser = computed(() => authStore.user)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  showUserMenu.value = false
  showMobileMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeAllMenus = () => {
  showUserMenu.value = false
  showMobileMenu.value = false
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// Définir le nom du composant comme multi-mot pour ESLint
defineOptions({
  name: 'NavBar',
})
</script>

<template>
  <!-- Desktop Navigation -->
  <nav class="hidden lg:flex items-center gap-8">
    <ul class="flex items-center gap-6">
      <li>
        <router-link
          to="/"
          class="text-gray-700 no-underline font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-50"
          :class="{ 'text-emerald-600 font-semibold bg-emerald-50': $route.path === '/' }"
        >
          Accueil
        </router-link>
      </li>
      <li v-if="isAuthenticated">
        <router-link
          to="/products"
          class="text-gray-700 no-underline font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-50"
          :class="{ 'text-emerald-600 font-semibold bg-emerald-50': $route.path === '/products' }"
        >
          Produits
        </router-link>
      </li>
      <li v-if="isAuthenticated">
        <router-link
          to="/products/add"
          class="text-gray-700 no-underline font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-50"
          :class="{ 'text-emerald-600 font-semibold bg-emerald-50': $route.path === '/products/add' }"
        >
          Ajouter
        </router-link>
      </li>
    </ul>

    <div class="flex items-center">
      <template v-if="isAuthenticated">
        <!-- Affichage des informations utilisateur -->
        <div class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 border-none bg-transparent cursor-pointer"
          >
            <!-- Avatar utilisateur -->
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">
              {{ currentUser?.firstname?.charAt(0)?.toUpperCase() || currentUser?.username?.charAt(0)?.toUpperCase() || 'U' }}
            </div>
            <!-- Nom utilisateur -->
            <span class="text-gray-700 font-medium">
              {{ currentUser?.firstname || currentUser?.username || 'Utilisateur' }}
            </span>
            <!-- Icône de menu -->
            <svg 
              class="w-4 h-4 text-gray-500 transition-transform duration-200"
              :class="{ 'rotate-180': showUserMenu }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
            </svg>
          </button>

          <!-- Menu dropdown -->
          <div 
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            @click="closeAllMenus"
          >
            <div class="px-4 py-2 border-b border-gray-100">
              <p class="text-sm font-medium text-gray-900">{{ currentUser?.firstname || currentUser?.username }}</p>
              <p class="text-sm text-gray-500 truncate">{{ currentUser?.email }}</p>
            </div>
            
            <router-link
              to="/profile"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 no-underline"
            >
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Mon profil
            </router-link>
            
            <hr class="my-1 border-gray-100">
            
            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-none bg-transparent cursor-pointer"
            >
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      </template>
      
      <template v-else>
        <div class="flex items-center gap-3">
          <router-link
            to="/register"
            class="px-4 py-2 rounded-lg text-emerald-600 font-medium transition-all duration-300 hover:bg-emerald-50 no-underline"
          >
            S'inscrire
          </router-link>
          <router-link
            to="/login"
            class="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-md active:scale-95 no-underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Connexion
          </router-link>
        </div>
      </template>
    </div>
  </nav>

  <!-- Mobile Navigation -->
  <div class="lg:hidden flex items-center gap-3">
    <!-- Mobile User Menu (si connecté) -->
    <div v-if="isAuthenticated" class="relative">
      <button
        @click="toggleUserMenu"
        class="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 border-none bg-transparent cursor-pointer"
      >
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">
          {{ currentUser?.firstname?.charAt(0)?.toUpperCase() || currentUser?.username?.charAt(0)?.toUpperCase() || 'U' }}
        </div>
      </button>

      <!-- Mobile User Dropdown -->
      <div 
        v-if="showUserMenu"
        class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        @click="closeAllMenus"
      >
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm font-medium text-gray-900">{{ currentUser?.firstname || currentUser?.username }}</p>
          <p class="text-xs text-gray-500 truncate">{{ currentUser?.email }}</p>
        </div>
        
        <router-link
          to="/profile"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 no-underline"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Mon profil
        </router-link>
        
        <hr class="my-1 border-gray-100">
        
        <button
          @click="handleLogout"
          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-none bg-transparent cursor-pointer"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button
      @click="toggleMobileMenu"
      class="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-all duration-300 border-none bg-transparent cursor-pointer"
      :class="{ 'bg-gray-100': showMobileMenu }"
    >
      <svg 
        class="w-6 h-6 text-gray-600 transition-transform duration-300"
        :class="{ 'rotate-90': showMobileMenu }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          :d="showMobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
        ></path>
      </svg>
    </button>
  </div>

  <!-- Mobile Menu Overlay -->
  <div
    v-if="showMobileMenu || showUserMenu"
    @click="closeAllMenus"
    class="fixed inset-0 z-40 lg:hidden"
  ></div>

  <!-- Mobile Menu Panel -->
  <div
    v-if="showMobileMenu"
    class="lg:hidden fixed top-[80px] left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-h-[calc(100vh-80px)] overflow-y-auto"
  >
    <div class="px-4 py-6 space-y-4">
      <!-- Navigation Links -->
      <div class="space-y-2">
        <router-link
          to="/"
          @click="closeMobileMenu"
          class="flex items-center px-4 py-3 rounded-lg text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 no-underline"
          :class="{ 'text-emerald-600 bg-emerald-50 font-semibold': $route.path === '/' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Accueil
        </router-link>

        <router-link
          v-if="isAuthenticated"
          to="/products"
          @click="closeMobileMenu"
          class="flex items-center px-4 py-3 rounded-lg text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 no-underline"
          :class="{ 'text-emerald-600 bg-emerald-50 font-semibold': $route.path === '/products' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Produits
        </router-link>

        <router-link
          v-if="isAuthenticated"
          to="/products/add"
          @click="closeMobileMenu"
          class="flex items-center px-4 py-3 rounded-lg text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 no-underline"
          :class="{ 'text-emerald-600 bg-emerald-50 font-semibold': $route.path === '/products/add' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter un produit
        </router-link>
      </div>

      <!-- Auth Actions for non-authenticated users -->
      <div v-if="!isAuthenticated" class="pt-4 border-t border-gray-200 space-y-3">
        <router-link
          to="/register"
          @click="closeMobileMenu"
          class="block w-full text-center px-4 py-3 rounded-lg border-2 border-emerald-600 text-emerald-600 font-medium transition-all duration-300 hover:bg-emerald-50 no-underline"
        >
          S'inscrire
        </router-link>
        <router-link
          to="/login"
          @click="closeMobileMenu"
          class="block w-full text-center px-4 py-3 rounded-lg bg-emerald-600 text-white font-medium transition-all duration-300 hover:bg-emerald-700 no-underline"
        >
          Se connecter
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation pour le menu dropdown */
.user-menu-enter-active,
.user-menu-leave-active {
  transition: all 0.2s ease;
}

.user-menu-enter-from,
.user-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
