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
  <div class="add-product-view">
    <h1>Ajouter un produit</h1>
    <p class="description">
      Utilisez le formulaire ci-dessous pour ajouter un nouveau produit à la boutique.
    </p>
    
    <ProductForm @product-added="handleProductAdded" />
    
    <div class="navigation-links">
      <router-link to="/products" class="back-link">
        Retour à la liste des produits
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.add-product-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.navigation-links {
  margin-top: 30px;
  text-align: center;
}

.back-link {
  display: inline-block;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #3aa876;
  text-decoration: underline;
}
</style> 