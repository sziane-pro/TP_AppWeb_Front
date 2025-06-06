<template>
  <div class="multi-step-form">
    <!-- Indicateur d'étapes -->
    <div class="step-indicator mb-8">
      <!-- Version mobile -->
      <div class="block sm:hidden">
        <div class="flex items-center justify-center mb-4">
          <div class="flex items-center space-x-2">
            <div 
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300',
                'bg-emerald-600 text-white'
              ]"
            >
              {{ currentStep }}
            </div>
            <span class="text-sm font-medium text-gray-600">de {{ totalSteps }}</span>
          </div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            class="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: (currentStep / totalSteps * 100) + '%' }"
          ></div>
        </div>
      </div>

      <!-- Version desktop -->
      <div class="hidden sm:flex items-center justify-center">
        <div 
          v-for="step in totalSteps"
          :key="step"
          class="flex items-center"
        >
          <div 
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
              step <= currentStep 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            ]"
          >
            {{ step }}
          </div>
          <div 
            v-if="step < totalSteps"
            :class="[
              'w-12 lg:w-16 h-1 transition-all duration-300',
              step < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
            ]"
          ></div>
        </div>
      </div>
      
      <div class="text-center mt-4">
        <h3 class="text-base sm:text-lg font-semibold text-gray-800">{{ stepTitles[currentStep - 1] }}</h3>
        <p class="text-xs sm:text-sm text-gray-600">Étape {{ currentStep }} sur {{ totalSteps }}</p>
      </div>
    </div>

    <!-- Formulaire -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Étape 1: Informations de connexion -->
      <div v-if="currentStep === 1" class="step-content">
        <div class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
              Adresse email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="votre@email.com"
            />
          </div>
          
          <div>
            <label for="username" class="block text-sm font-semibold text-gray-900 mb-2">
              Nom d'utilisateur <span class="text-red-500">*</span>
            </label>
            <input
              id="username"
              v-model="formData.username"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="nom_utilisateur"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-gray-900 mb-2">
              Mot de passe <span class="text-red-500">*</span>
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-900 mb-2">
              Confirmer le mot de passe <span class="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <!-- Étape 2: Informations personnelles -->
      <div v-if="currentStep === 2" class="step-content">
        <div class="space-y-5">
          <div>
            <label for="firstname" class="block text-sm font-semibold text-gray-900 mb-2">
              Prénom <span class="text-red-500">*</span>
            </label>
            <input
              id="firstname"
              v-model="formData.firstname"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="Votre prénom"
            />
          </div>

          <div>
            <label for="lastname" class="block text-sm font-semibold text-gray-900 mb-2">
              Nom de famille <span class="text-red-500">*</span>
            </label>
            <input
              id="lastname"
              v-model="formData.lastname"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="Votre nom de famille"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-900 mb-2">
              Téléphone <span class="text-gray-500 text-xs">(optionnel)</span>
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>
      </div>

      <!-- Étape 3: Adresse -->
      <div v-if="currentStep === 3" class="step-content">
        <div class="space-y-5">
          <div class="text-center mb-4">
            <p class="text-sm text-gray-600">Ces informations sont optionnelles et nous aident à mieux vous servir.</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div class="sm:col-span-2">
              <label for="street" class="block text-sm font-semibold text-gray-900 mb-2">
                Adresse <span class="text-gray-500 text-xs">(optionnel)</span>
              </label>
              <input
                id="street"
                v-model="formData.street"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                placeholder="rue de la Paix"
              />
            </div>

            <div>
              <label for="house_number" class="block text-sm font-semibold text-gray-900 mb-2">
                Numéro <span class="text-gray-500 text-xs">(optionnel)</span>
              </label>
              <input
                id="house_number"
                v-model="formData.house_number"
                type="number"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                placeholder="123"
              />
            </div>

            <div>
              <label for="zipcode" class="block text-sm font-semibold text-gray-900 mb-2">
                Code postal <span class="text-gray-500 text-xs">(optionnel)</span>
              </label>
              <input
                id="zipcode"
                v-model="formData.zipcode"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                placeholder="49000"
              />
            </div>

            <div class="sm:col-span-2">
              <label for="city" class="block text-sm font-semibold text-gray-900 mb-2">
                Ville <span class="text-gray-500 text-xs">(optionnel)</span>
              </label>
              <input
                id="city"
                v-model="formData.city"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                placeholder="Angers"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Étape 4: Récapitulatif -->
      <div v-if="currentStep === 4" class="step-content">
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h4 class="text-lg font-semibold mb-4 text-gray-900">Récapitulatif de vos informations</h4>
          
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-700 font-medium">Email :</span>
              <span class="text-gray-900 font-semibold">{{ formData.email }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-700 font-medium">Nom d'utilisateur :</span>
              <span class="text-gray-900 font-semibold">{{ formData.username }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-700 font-medium">Nom complet :</span>
              <span class="text-gray-900 font-semibold">{{ formData.firstname }} {{ formData.lastname }}</span>
            </div>
            <div v-if="formData.phone" class="flex justify-between items-center py-2 border-b border-gray-100">
              <span class="text-gray-700 font-medium">Téléphone :</span>
              <span class="text-gray-900 font-semibold">{{ formData.phone }}</span>
            </div>
            <div v-if="formData.street || formData.city" class="flex justify-between items-center py-2">
              <span class="text-gray-700 font-medium">Adresse :</span>
              <span class="text-gray-900 font-semibold text-right">
                {{ [formData.house_number, formData.street, formData.zipcode, formData.city].filter(Boolean).join(' ') }}
              </span>
            </div>
          </div>

          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm text-blue-800 leading-relaxed">
              <strong class="text-blue-900">Note :</strong> En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
            </p>
          </div>
        </div>
      </div>

      <!-- Messages d'erreur -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-800 text-sm p-4 rounded-lg text-center">
        <div class="flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          {{ error }}
        </div>
      </div>

      <!-- Boutons de navigation -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6">
        <button
          v-if="currentStep > 1"
          type="button"
          @click="previousStep"
          class="w-full sm:w-auto order-2 sm:order-1 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 font-medium"
        >
          <span class="flex items-center justify-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Précédent
          </span>
        </button>
        <div v-else class="hidden sm:block"></div>

        <button
          v-if="currentStep < totalSteps"
          type="button"
          @click="nextStep"
          :disabled="!canProceedToNextStep"
          class="w-full sm:w-auto order-1 sm:order-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 font-medium"
        >
          <span class="flex items-center justify-center">
            Suivant
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>

        <button
          v-if="currentStep === totalSteps"
          type="submit"
          :disabled="loading"
          class="w-full sm:w-auto order-1 sm:order-2 px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-sm"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Inscription en cours...
          </span>
          <span v-else class="flex items-center justify-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Créer mon compte
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const currentStep = ref(1)
const totalSteps = 4
const loading = ref(false)
const error = ref('')

const stepTitles = [
  'Informations de connexion',
  'Informations personnelles', 
  'Adresse (optionnel)',
  'Confirmation'
]

const formData = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  firstname: '',
  lastname: '',
  phone: '',
  street: '',
  house_number: '',
  city: '',
  zipcode: ''
})

const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.email && 
             formData.username && 
             formData.password && 
             formData.confirmPassword &&
             formData.password === formData.confirmPassword
    case 2:
      return formData.firstname && formData.lastname
    case 3:
      return true // Adresse optionnelle
    default:
      return true
  }
})

const nextStep = () => {
  error.value = ''
  
  if (currentStep.value === 1) {
    if (formData.password !== formData.confirmPassword) {
      error.value = 'Les mots de passe ne correspondent pas'
      return
    }
    if (formData.password.length < 6) {
      error.value = 'Le mot de passe doit contenir au moins 6 caractères'
      return
    }
  }
  
  if (canProceedToNextStep.value && currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    error.value = ''
  }
}

const handleSubmit = async () => {
  if (currentStep.value !== totalSteps) return
  
  try {
    loading.value = true
    error.value = ''
    
    const userData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone || '',
      street: formData.street || '',
      house_number: parseInt(formData.house_number) || 0,
      city: formData.city || '',
      zipcode: formData.zipcode || '',
      lat: '', // Pour l'instant vide, peut être calculé plus tard
      long: '' // Pour l'instant vide, peut être calculé plus tard
    }
    
    await authStore.register(userData)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Une erreur est survenue lors de l\'inscription'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.multi-step-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}

.step-content {
  min-height: 250px;
  animation: fadeIn 0.3s ease-in-out;
}

@media (min-width: 640px) {
  .step-content {
    min-height: 300px;
  }
  
  .multi-step-form {
    padding: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animation pour les étapes */
.step-indicator {
  user-select: none;
}

/* Améliorations responsive pour les petits écrans */
@media (max-width: 640px) {
  .multi-step-form {
    max-width: 100%;
  }
}
</style> 