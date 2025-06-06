<template>
  <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
    <div class="space-y-5">
      <div>
        <label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
          Adresse email <span class="text-red-500">*</span>
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
          placeholder="votre@email.com"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-semibold text-gray-900 mb-2">
          Mot de passe <span class="text-red-500">*</span>
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
          placeholder="••••••••"
        />
      </div>
    </div>

    <div v-if="error" class="bg-red-50 border border-red-200 text-red-800 text-sm p-4 rounded-lg text-center">
      <div class="flex items-center justify-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        {{ error }}
      </div>
    </div>

    <div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-sm"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connexion en cours...
        </span>
        <span v-else>Se connecter</span>
      </button>
    </div>

    <div class="text-sm text-center">
      <router-link
        to="/register"
        class="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        Pas encore de compte ? S'inscrire
      </router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    await authStore.login({
      email: email.value,
      password: password.value,
    })
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script> 