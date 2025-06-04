<script>
import productService from '../services/productService'

export default {
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

        await productService.addProduct(productData)

        this.success = true
        this.resetForm()

        // Émettre un événement pour informer le parent qu'un produit a été ajouté
        this.$emit('product-added')
      } catch (err) {
        this.error = err.message || "Une erreur est survenue lors de l'ajout du produit"
        console.error("Erreur lors de l'ajout du produit:", err)
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
  },
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-5 bg-gray-50 rounded-lg shadow-md">
    <h2 class="text-xl font-bold text-center mb-5">Ajouter un nouveau produit</h2>

    <div v-if="error" class="bg-red-50 text-red-700 p-3 rounded-md mb-4">
      {{ error }}
    </div>

    <div v-if="success" class="bg-green-50 text-green-700 p-3 rounded-md mb-4">
      Le produit a été ajouté avec succès!
    </div>

    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <label for="title" class="font-medium text-sm">Titre *</label>
        <input
          type="text"
          id="title"
          v-model="product.title"
          placeholder="Titre du produit"
          required
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="price" class="font-medium text-sm">Prix * (€)</label>
        <input
          type="number"
          id="price"
          v-model="product.price"
          placeholder="Prix du produit"
          step="0.01"
          min="0"
          required
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="description" class="font-medium text-sm">Description</label>
        <textarea
          id="description"
          v-model="product.description"
          placeholder="Description du produit"
          rows="3"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        ></textarea>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="image" class="font-medium text-sm">URL de l'image</label>
        <input
          type="url"
          id="image"
          v-model="product.image"
          placeholder="https://example.com/image.jpg"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="category" class="font-medium text-sm">Catégorie *</label>
        <select
          id="category"
          v-model="product.category"
          required
          :disabled="loadingCategories"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="" disabled>
            {{ loadingCategories ? 'Chargement des catégories...' : 'Sélectionnez une catégorie' }}
          </option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="flex gap-3 mt-2">
        <button
          type="submit"
          class="flex-1 px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          {{ loading ? 'Ajout en cours...' : 'Ajouter le produit' }}
        </button>

        <button
          type="button"
          class="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
