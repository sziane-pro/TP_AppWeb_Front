<script>
import productService from '../services/productService'

export default {
  props: {
    productToEdit: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: 'add', // 'add' ou 'edit'
      validator: (value) => ['add', 'edit'].includes(value)
    }
  },
  data() {
    return {
      product: {
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      },
      categories: [],
      loading: false,
      error: null,
      success: false,
      loadingCategories: false,
    }
  },
  computed: {
    isEditMode() {
      return this.mode === 'edit'
    },
    formTitle() {
      return this.isEditMode ? 'Modifier le produit' : 'Ajouter un nouveau produit'
    },
    submitButtonText() {
      return this.loading 
        ? (this.isEditMode ? 'Modification en cours...' : 'Ajout en cours...')
        : (this.isEditMode ? 'Modifier le produit' : 'Ajouter le produit')
    },
    successMessage() {
      return this.isEditMode 
        ? 'Le produit a été modifié avec succès!' 
        : 'Le produit a été ajouté avec succès!'
    }
  },
  methods: {
    async submitForm() {
      if (!this.isFormValid()) {
        this.error = 'Veuillez remplir tous les champs obligatoires (titre, prix, catégorie)'
        return
      }

      try {
        this.loading = true
        this.error = null
        this.success = false

        // Conversion du prix en nombre
        const productData = {
          ...this.product,
          price: parseFloat(this.product.price),
        }

        if (this.isEditMode) {
          await productService.updateProduct(this.productToEdit.id, productData)
          this.$emit('product-updated', productData)
        } else {
          await productService.addProduct(productData)
          this.$emit('product-added', productData)
          this.resetForm()
        }

        this.success = true
      } catch (err) {
        this.error = err.message || `Une erreur est survenue lors de ${this.isEditMode ? 'la modification' : 'l\'ajout'} du produit`
        console.error(`Erreur lors de ${this.isEditMode ? 'la modification' : 'l\'ajout'} du produit:`, err)
      } finally {
        this.loading = false
      }
    },

    isFormValid() {
      return (
        this.product.title.trim() !== '' &&
        this.product.price !== '' &&
        this.product.category.trim() !== ''
      )
    },

    resetForm() {
      this.product = {
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      }
    },

    loadProductData() {
      if (this.isEditMode && this.productToEdit) {
        this.product = {
          title: this.productToEdit.title || '',
          price: this.productToEdit.price || '',
          description: this.productToEdit.description || '',
          image: this.productToEdit.image || '',
          category: this.productToEdit.category || '',
        }
      }
    },

    async loadCategories() {
      try {
        this.loadingCategories = true
        this.categories = await productService.getCategories()
      } catch (err) {
        console.error('Erreur lors du chargement des catégories:', err)
        // Fallback vers les catégories par défaut en cas d'erreur
        this.categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"]
      } finally {
        this.loadingCategories = false
      }
    },
  },
  mounted() {
    this.loadCategories()
    this.loadProductData()
  },
  watch: {
    productToEdit: {
      handler() {
        this.loadProductData()
      },
      immediate: true
    }
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h2 class="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-900">{{ formTitle }}</h2>

    <div v-if="error" class="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        {{ error }}
      </div>
    </div>

    <div v-if="success" class="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        {{ successMessage }}
      </div>
    </div>

    <form @submit.prevent="submitForm" class="space-y-5">
      <div>
        <label for="title" class="block text-sm font-semibold text-gray-900 mb-2">
          Titre <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          v-model="product.title"
          placeholder="Titre du produit"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
        />
      </div>

      <div>
        <label for="price" class="block text-sm font-semibold text-gray-900 mb-2">
          Prix <span class="text-red-500">*</span> <span class="text-gray-500 text-xs">(en €)</span>
        </label>
        <input
          type="number"
          id="price"
          v-model="product.price"
          placeholder="0.00"
          step="0.01"
          min="0"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-semibold text-gray-900 mb-2">
          Description <span class="text-gray-500 text-xs">(optionnel)</span>
        </label>
        <textarea
          id="description"
          v-model="product.description"
          placeholder="Description détaillée du produit..."
          rows="4"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500 resize-none"
        ></textarea>
      </div>

      <div>
        <label for="image" class="block text-sm font-semibold text-gray-900 mb-2">
          URL de l'image <span class="text-gray-500 text-xs">(optionnel)</span>
        </label>
        <input
          type="url"
          id="image"
          v-model="product.image"
          placeholder="https://exemple.com/image.jpg"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
        />
      </div>

      <div>
        <label for="category" class="block text-sm font-semibold text-gray-900 mb-2">
          Catégorie <span class="text-red-500">*</span>
        </label>
        <select
          id="category"
          v-model="product.category"
          required
          :disabled="loadingCategories"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 bg-white"
        >
          <option value="" disabled class="text-gray-500">
            {{ loadingCategories ? 'Chargement des catégories...' : 'Sélectionnez une catégorie' }}
          </option>
          <option v-for="category in categories" :key="category" :value="category" class="text-gray-900">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
        <button
          type="submit"
          class="w-full sm:flex-1 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm"
          :disabled="loading"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? (isEditMode ? 'Modification...' : 'Ajout...') : '' }}
          </span>
          <span v-else>{{ submitButtonText }}</span>
        </button>

        <button
          type="button"
          class="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="resetForm"
          :disabled="loading"
        >
          Réinitialiser
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
