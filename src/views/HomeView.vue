<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'

const authStore = useAuthStore()

// Animations et effets
const isVisible = ref(false)
const currentFeature = ref(0)

onMounted(() => {
  isVisible.value = true
  
  // Rotation automatique des features
  setInterval(() => {
    currentFeature.value = (currentFeature.value + 1) % 6
  }, 3000)
})

const stats = [
  { label: 'Produits gérés', value: '10,000+', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { label: 'Utilisateurs actifs', value: '500+', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
  { label: 'Temps de réponse', value: '<1s', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Disponibilité', value: '99.9%', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
]

const features = [
  {
    title: "Interface Intuitive",
    description: "Navigation simple et claire pour tous les utilisateurs",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    color: "emerald"
  },
  {
    title: "Recherche Avancée",
    description: "Trouvez instantanément vos produits avec des filtres intelligents",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    color: "blue"
  },
  {
    title: "Synchronisation Cloud",
    description: "Vos données sont sauvegardées automatiquement et sécurisées",
    icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
    color: "purple"
  },
  {
    title: "Analytics Intégrés",
    description: "Suivez les performances de vos produits en temps réel",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    color: "orange"
  },
  {
    title: "Export Multi-format",
    description: "Exportez vos données en CSV, PDF ou Excel facilement",
    icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "indigo"
  },
  {
    title: "Support 24/7",
    description: "Notre équipe est disponible pour vous aider à tout moment",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12l.01 0",
    color: "pink"
  }
]

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Responsable E-commerce",
    content: "Cette plateforme a révolutionné notre gestion de produits. L'interface est intuitive et les fonctionnalités sont exactement ce dont nous avions besoin.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Thomas Martin",
    role: "Gérant de boutique",
    content: "Un gain de temps énorme ! Je peux maintenant gérer mon inventaire en quelques minutes au lieu d'heures. Merci pour cet outil fantastique.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Sophie Laurent",
    role: "Entrepreneur",
    content: "La simplicité d'utilisation et les fonctionnalités avancées font de cette app un incontournable pour tout commerçant moderne.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section avec background gradient -->
    <div class="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <!-- Formes décoratives -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-32 w-96 h-96 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
        <div class="absolute -bottom-32 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
      
      <div class="relative max-w-8xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
        <div :class="['flex flex-col items-center gap-5 text-center transition-all duration-1000', isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0']">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Nouvelle génération de gestion produits
          </div>
          
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Gérez votre boutique
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
              intelligemment
            </span>
          </h1>
          
          <p class="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            La plateforme tout-en-un qui simplifie la gestion de vos produit. 
            Ajoutez, modifiez et organisez votre inventaire avec une interface moderne et intuitive.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <router-link 
              v-if="authStore.isAuthenticated"
              to="/products" 
              class="group inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Accéder au tableau de bord
            </router-link>
            
            <router-link 
              v-if="!authStore.isAuthenticated"
              to="/register" 
              class="group inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Commencer gratuitement
            </router-link>
            
            <button class="group inline-flex items-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md">
              <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8v8a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2z" />
              </svg>
              Voir la démo
            </button>
          </div>
          
          <!-- Statistiques -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div v-for="(stat, index) in stats" :key="index" 
                 :class="['text-center transform transition-all duration-500 delay-' + (index * 100), isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0']">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md mb-3">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
                </svg>
              </div>
              <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
              <div class="text-sm text-gray-600">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section améliorée -->
    <div class="py-20 bg-white">
      <div class="max-w-8xl mx-auto px-4">
        <div class="flex flex-col items-center gap-5 text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités qui font la différence
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez tous les outils dont vous avez besoin pour gérer votre boutique efficacement
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index"
               :class="['group p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2', 
                       currentFeature === index ? 'ring-2 ring-emerald-500 shadow-lg' : '']">
            <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110',
                         `bg-${feature.color}-100`]">
              <svg :class="['w-8 h-8', `text-${feature.color}-600`]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Comment ça marche -->
    <div class="py-20 bg-gray-50">
      <div class="max-w-8xl mx-auto px-4">
        <div class="flex flex-col items-center gap-5 text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
          <p class="text-xl text-gray-600">Trois étapes simples pour commencer</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Ligne de connexion -->
          <div class="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300"></div>
          
          <div v-for="(step, index) in [
            { title: 'Créez votre compte', desc: 'Inscription rapide en quelques clics avec notre formulaire multi-étapes', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
            { title: 'Ajoutez vos produits', desc: 'Interface intuitive pour ajouter et organiser votre catalogue', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
            { title: 'Gérez facilement', desc: 'Modifiez, supprimez et suivez vos produits en temps réel', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
          ]" :key="index" class="relative text-center flex flex-col items-center gap-3">
            <div class="relative z-10 bg-white rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center shadow-lg border-4 border-emerald-100">
              <div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="step.icon" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Témoignages -->
    <div class="py-20 bg-white">
      <div class="max-w-8xl mx-auto px-4">
        <div class="flex flex-col items-center gap-5 text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos utilisateurs</h2>
          <p class="text-xl text-gray-600">Ils nous font confiance pour gérer leurs boutiques</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index" 
               class="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-6">
              <img :src="testimonial.avatar" :alt="testimonial.name" 
                   class="w-12 h-12 rounded-full object-cover mr-4">
              <div>
                <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
              </div>
            </div>
            <p class="text-gray-700 italic leading-relaxed">"{{ testimonial.content }}"</p>
            <div class="flex mt-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section finale -->
    <div class="flex flex-col items-center py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div class="max-w-4xl mx-auto text-center px-4 flex flex-col gap-3">
        <h2 class="text-4xl font-bold text-white mb-6">
          Prêt à révolutionner votre gestion de boutique ?
        </h2>
        <p class="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto m-0-auto">
          Rejoignez des centaines d'entrepreneurs qui font déjà confiance à notre plateforme
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            v-if="!authStore.isAuthenticated"
            to="/register" 
            class="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Commencer maintenant
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
          
          <div v-if="authStore.isAuthenticated" class="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 class="text-2xl font-bold text-white mb-4">
              Bonjour {{ authStore.user?.firstname || authStore.user?.username }} ! 👋
            </h3>
            <p class="text-emerald-100 text-lg mb-6">
              Prêt à gérer vos produits aujourd'hui ?
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link 
                to="/products" 
                class="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Voir mes produits
              </router-link>
              <router-link 
                to="/products/add" 
                class="inline-flex items-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-900 transition-all duration-300"
              >
                Ajouter un produit
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
