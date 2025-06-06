<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import authService from '@/services/authService'

const authStore = useAuthStore()
const showDebug = ref(false)
const localStorageData = ref({})

const isTokenValid = computed(() => {
  const token = authService.getToken()
  return token && !authService.isTokenExpired(token)
})

const tokenInfo = computed(() => {
  const token = authService.getToken()
  if (!token) return null
  
  const payload = authService.decodeToken(token)
  if (!payload) return null
  
  return {
    ...payload,
    expiresAt: new Date(payload.exp * 1000).toLocaleString(),
    isExpired: authService.isTokenExpired(token)
  }
})

const refreshLocalStorageData = () => {
  localStorageData.value = {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
    keys: Object.keys(localStorage)
  }
}

const clearStorage = () => {
  if (confirm('Êtes-vous sûr de vouloir vider le localStorage ?')) {
    localStorage.clear()
    refreshLocalStorageData()
    authStore.logout()
  }
}

const testToken = async () => {
  try {
    const valid = authService.validateSession()
    alert(`Session ${valid ? 'valide' : 'invalide'}`)
  } catch (error) {
    alert(`Erreur: ${error.message}`)
  }
}

onMounted(() => {
  refreshLocalStorageData()
})
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Bouton pour ouvrir/fermer le debug -->
    <button
      @click="showDebug = !showDebug"
      class="mb-2 px-3 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
      title="Debug localStorage"
    >
      🔧 Debug
    </button>

    <!-- Panel de debug -->
    <div 
      v-if="showDebug"
      class="w-80 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-sm"
    >
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-bold text-gray-800">Debug localStorage</h3>
        <button 
          @click="showDebug = false"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <!-- État de l'authentification -->
      <div class="mb-4">
        <h4 class="font-semibold text-gray-700 mb-2">État Auth</h4>
        <div class="space-y-1">
          <div class="flex justify-between">
            <span>Connecté:</span>
            <span :class="authStore.isAuthenticated ? 'text-green-600' : 'text-red-600'">
              {{ authStore.isAuthenticated ? 'Oui' : 'Non' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>Token valide:</span>
            <span :class="isTokenValid ? 'text-green-600' : 'text-red-600'">
              {{ isTokenValid ? 'Oui' : 'Non' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Informations du token -->
      <div v-if="tokenInfo" class="mb-4">
        <h4 class="font-semibold text-gray-700 mb-2">Token JWT</h4>
        <div class="space-y-1 text-xs">
          <div><strong>User ID:</strong> {{ tokenInfo.sub || 'N/A' }}</div>
          <div><strong>Expire le:</strong> {{ tokenInfo.expiresAt }}</div>
          <div><strong>Émis le:</strong> {{ new Date(tokenInfo.iat * 1000).toLocaleString() }}</div>
          <div>
            <strong>Statut:</strong> 
            <span :class="tokenInfo.isExpired ? 'text-red-600' : 'text-green-600'">
              {{ tokenInfo.isExpired ? 'Expiré' : 'Valide' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Données utilisateur -->
      <div v-if="authStore.user" class="mb-4">
        <h4 class="font-semibold text-gray-700 mb-2">Utilisateur</h4>
        <div class="text-xs space-y-1">
          <div><strong>ID:</strong> {{ authStore.user.id }}</div>
          <div><strong>Username:</strong> {{ authStore.user.username }}</div>
          <div><strong>Email:</strong> {{ authStore.user.email }}</div>
          <div><strong>Nom:</strong> {{ authStore.user.firstname }} {{ authStore.user.lastname }}</div>
        </div>
      </div>

      <!-- Données brutes du localStorage -->
      <div class="mb-4">
        <h4 class="font-semibold text-gray-700 mb-2">localStorage</h4>
        <div class="text-xs space-y-1">
          <div><strong>Clés:</strong> {{ localStorageData.keys?.length || 0 }}</div>
          <div><strong>Token:</strong> {{ localStorageData.token ? '✓' : '✗' }}</div>
          <div><strong>User:</strong> {{ localStorageData.user ? '✓' : '✗' }}</div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-2">
        <button
          @click="refreshLocalStorageData"
          class="w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Actualiser
        </button>
        <button
          @click="testToken"
          class="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Tester session
        </button>
        <button
          @click="clearStorage"
          class="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Vider localStorage
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar personnalisée pour le panel */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style> 