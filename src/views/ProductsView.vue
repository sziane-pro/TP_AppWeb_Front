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
    }
  },
  mounted() {
    this.loadProducts();
  }
}
</script>

<template>
  <div class="products-container">
    <div class="header-container">
      <h1>Produits</h1>
      <router-link to="/products/add" class="add-product-button">
        Ajouter un produit
      </router-link>
    </div>
    
    <div v-if="loading" class="loading">
      Chargement des produits...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="products.length === 0" class="no-products">
      Aucun produit disponible.
    </div>
    
    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.title" class="product-image" />
        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <p class="product-price">{{ product.price }} €</p>
          <p class="product-category">{{ product.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-product-button {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.add-product-button:hover {
  background-color: #3aa876;
}

.loading, .error, .no-products {
  text-align: center;
  margin: 50px 0;
  font-size: 18px;
}

.error {
  color: red;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: #f9f9f9;
  padding: 10px;
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin-top: 0;
  font-size: 16px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0;
}

.product-category {
  color: #666;
  font-size: 14px;
  text-transform: capitalize;
}
</style> 