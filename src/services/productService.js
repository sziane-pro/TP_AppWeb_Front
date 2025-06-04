import apiService from './api'

/**
 * Service pour gérer les requêtes liées aux produits
 */
const productService = {
  /**
   * Récupère tous les produits
   * @returns {Promise} - Promesse contenant la liste des produits
   */
  getAllProducts() {
    return apiService.get('/products')
  },

  /**
   * Récupère un produit par son ID
   * @param {string|number} id - ID du produit
   * @returns {Promise} - Promesse contenant les détails du produit
   */
  getProductById(id) {
    return apiService.get(`/products/${id}`)
  },

  /**
   * Récupère les produits par catégorie
   * @param {string} category - Catégorie des produits
   * @returns {Promise} - Promesse contenant les produits de la catégorie
   */
  getProductsByCategory(category) {
    return apiService.get(`/products/category/${category}`)
  },

  /**
   * Récupère toutes les catégories disponibles
   * @returns {Promise} - Promesse contenant la liste des catégories
   */
  getCategories() {
    return apiService.get('/products/categories')
  },

  /**
   * Ajoute un nouveau produit
   * @param {Object} productData - Données du produit à ajouter
   * @returns {Promise} - Promesse contenant le produit ajouté
   */
  addProduct(productData) {
    return apiService.post('/products', productData)
  },

  /** */
}

export default productService
