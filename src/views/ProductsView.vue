<script>
import productService from '../services/productService';

export default {
  data() {
    return {
      products: [],
      loading: true,
      error: null
    }
  },
  methods: {
    async loadProducts() {
      try {
        this.loading = true;
        this.error = null;
        this.products = await productService.getAllProducts();
      } catch (err) {
        this.error = err.message || 'Une erreur est survenue lors du chargement des produits';
        console.error('Erreur lors du chargement des produits:', err);
      } finally {
        this.loading = false;
      }
    },

    editProduct(productId) {
      this.$router.push(`/products/edit/${productId}`);
    },

    async deleteProduct(product) {
      if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.title}" ?`)) {
        try {
          await productService.deleteProduct(product.id);
          // Recharger la liste des produits après suppression
          await this.loadProducts();
        } catch (err) {
          this.error = err.message || 'Erreur lors de la suppression du produit';
          console.error('Erreur lors de la suppression du produit:', err);
        }
      }
    }
  },
  mounted() {
    this.loadProducts();
  }
}
</script>

<template>
  <div class="max-w-8xl mx-auto px-4 py-8">
    <!-- Header avec titre et bouton d'ajout -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Produits</h1>
      <router-link 
        to="/products/add" 
        class="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Ajouter un produit
      </router-link>
    </div>
    
    <!-- État de chargement -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="flex items-center space-x-3">
        <svg class="animate-spin h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-lg text-gray-600">Chargement des produits...</span>
      </div>
    </div>
    
    <!-- Message d'erreur -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <p class="text-red-800 text-lg font-medium">{{ error }}</p>
    </div>
    
    <!-- Aucun produit -->
    <div v-else-if="products.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <h3 class="text-xl font-medium text-gray-900 mb-2">Aucun produit disponible</h3>
      <p class="text-gray-600 mb-6">Commencez par ajouter votre premier produit.</p>
      <router-link 
        to="/products/add"
        class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Ajouter un produit
      </router-link>
    </div>
    
    <!-- Grille des produits -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
      >
        <!-- Image du produit -->
        <div class="aspect-square bg-gray-50 p-4">
          <img 
            :src="product.image" 
            :alt="product.title" 
            class="w-full h-full object-contain"
            @error="$event.target.src = 'https://via.placeholder.com/200x200?text=Image+non+disponible'"
          />
        </div>
        
        <!-- Informations du produit -->
        <div class="p-4">
          <h3 class="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
            {{ product.title }}
          </h3>
          
          <div class="space-y-2 mb-4">
            <p class="text-lg font-bold text-emerald-600">
              {{ product.price.toFixed(2) }} €
            </p>
            <p class="text-sm text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded-full inline-block">
              {{ product.category }}
            </p>
          </div>
          
          <!-- Actions -->
          <div class="flex gap-2">
            <button 
              @click="editProduct(product.id)"
              class="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              title="Modifier le produit"
            >
              Modifier
            </button>
            <button 
              @click="deleteProduct(product)"
              class="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              title="Supprimer le produit"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

 