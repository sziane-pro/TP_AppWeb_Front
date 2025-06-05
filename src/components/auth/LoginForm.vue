<template>
  <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="email" class="sr-only">Adresse email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#42b983] focus:border-[#42b983] focus:z-10 sm:text-sm"
          placeholder="Adresse email"
        />
      </div>
      <div>
        <label for="password" class="sr-only">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#42b983] focus:border-[#42b983] focus:z-10 sm:text-sm"
          placeholder="Mot de passe"
        />
      </div>
    </div>

    <div v-if="error" class="text-red-500 text-sm text-center">
      {{ error }}
    </div>

    <div>
      <button
        type="submit"
        :disabled="loading"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#42b983] hover:bg-[#3aa876] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#42b983] disabled:opacity-50"
      >
        <span v-if="loading">Connexion en cours...</span>
        <span v-else>Se connecter</span>
      </button>
    </div>

    <div class="text-sm text-center">
      <router-link
        to="/register"
        class="font-medium text-[#42b983] hover:text-[#3aa876]"
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