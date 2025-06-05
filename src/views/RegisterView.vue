<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Adresse email</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
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
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#42b983] focus:border-[#42b983] focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
            />
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#42b983] focus:border-[#42b983] focus:z-10 sm:text-sm"
              placeholder="Confirmer le mot de passe"
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
            <span v-if="loading">Inscription en cours...</span>
            <span v-else>S'inscrire</span>
          </button>
        </div>

        <div class="text-sm text-center">
          <router-link
            to="/login"
            class="font-medium text-[#42b983] hover:text-[#3aa876]"
          >
            Déjà un compte ? Se connecter
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  
  if (form.password !== form.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  try {
    loading.value = true
    await authStore.register({
      email: form.email,
      password: form.password
    })
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Une erreur est survenue lors de l\'inscription'
  } finally {
    loading.value = false
  }
}
</script> 