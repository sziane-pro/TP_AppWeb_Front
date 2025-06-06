<script>
import ProductForm from '../components/ProductForm.vue'
import productService from '../services/productService'

export default {
  components: {
    ProductForm
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null
    }
  },
  methods: {
    async loadProduct() {
      try {
        this.loading = true
        this.error = null
        const productId = this.$route.params.id
        this.product = await productService.getProductById(productId)
      } catch (err) {
        this.error = err.message || 'Erreur lors du chargement du produit'
        console.error('Erreur lors du chargement du produit:', err)
      } finally {
        this.loading = false
      }
    },
    
    onProductUpdated() {
      this.$router.push('/products')
    }
  },
  mounted() {
    this.loadProduct()
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- État de chargement -->
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="flex items-center space-x-3">
        <svg class="animate-spin h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-lg text-gray-600">Chargement du produit...</span>
      </div>
    </div>
    
    <!-- Message d'erreur -->
    <div v-else-if="error" class="text-center py-16">
      <div class="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
        <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-lg font-medium text-red-900 mb-2">Erreur de chargement</h3>
        <p class="text-red-700 mb-6">{{ error }}</p>
        <router-link 
          to="/products" 
          class="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux produits
        </router-link>
      </div>
    </div>
    
    <!-- Formulaire d'édition -->
    <div v-else-if="product">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-3">Modifier le produit</h1>
        <p class="text-lg text-gray-600">
          Modifiez les informations du produit "{{ product.title }}"
        </p>
      </div>
      
      <!-- Formulaire -->
      <ProductForm 
        :product-to-edit="product"
        mode="edit"
        @product-updated="onProductUpdated"
      />
      
      <!-- Navigation -->
      <div class="text-center mt-8">
        <router-link 
          to="/products" 
          class="inline-flex items-center px-4 py-2 text-gray-600 font-medium hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux produits
        </router-link>
      </div>
    </div>
  </div>
</template> 