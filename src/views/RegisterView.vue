<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col items-center gap-3 max-w-2xl w-full space-y-8">
      <!-- Header -->
      <div class="flex flex-col items-center gap-3">
        <div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          Créer un compte
        </h2>
        <p class="text-lg text-gray-600">
          Rejoignez-nous en quelques étapes simples
        </p>
      </div>
      
      <!-- Formulaire multi-étapes -->
      <MultiStepRegisterForm />
      
      <!-- Lien vers la connexion -->
      <div class="text-center">
        <p class="text-gray-600">
          Déjà un compte ?
          <router-link
            to="/login"
            class="font-medium text-emerald-600 hover:text-emerald-500 transition-colors ml-1"
          >
            Se connecter
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import MultiStepRegisterForm from '@/components/auth/MultiStepRegisterForm.vue'
</script> 