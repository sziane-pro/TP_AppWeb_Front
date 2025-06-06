<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="flex flex-col items-center gap-3 text-center">
        <div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">
          Connexion à votre compte
        </h2>
        <p class="text-gray-600">
          Connectez-vous pour accéder à votre boutique
        </p>
      </div>
      
      <!-- Formulaire -->
      <LoginForm />
      
      <!-- Lien vers l'inscription -->
      <div class="text-center">
        <p class="text-gray-600">
          Pas encore de compte ?
          <router-link 
            to="/register" 
            class="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            Créer un compte
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
</script> 