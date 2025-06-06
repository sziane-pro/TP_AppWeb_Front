<script>
import ProductForm from '../components/ProductForm.vue';

export default {
  components: {
    ProductForm
  },
  methods: {
    handleProductAdded() {
      // Cette méthode sera appelée lorsqu'un produit est ajouté
      // On pourrait rediriger vers la liste des produits ou afficher un message
      console.log('Produit ajouté avec succès');
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-3">Ajouter un produit</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Utilisez le formulaire ci-dessous pour ajouter un nouveau produit à la boutique.
      </p>
    </div>
    
    <!-- Formulaire -->
    <ProductForm @product-added="handleProductAdded" />
    
    <!-- Navigation -->
    <div class="text-center mt-8">
      <router-link 
        to="/products" 
        class="inline-flex items-center px-4 py-2 text-emerald-600 font-medium hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour à la liste des produits
      </router-link>
    </div>
  </div>
</template> 