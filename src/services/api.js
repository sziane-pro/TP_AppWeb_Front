// Configuration de base pour les requêtes API
const API_URL = 'http://185.98.139.128:40140' // URL de votre API basée sur votre fichier server.js
// const API_URL = 'http://localhost:5001'; // URL de votre API basée sur votre fichier server.js

/**
 * Service pour gérer les requêtes API
 */
const apiService = {
  /**
   * Effectue une requête GET
   * @param {string} endpoint - Point de terminaison de l'API
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`)
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          `Erreur API: ${response.status} - ${errorData?.message || response.statusText}`,
        )
      }
      return response.json()
    } catch (error) {
      console.error('Erreur lors de la requête GET:', error)
      throw error
    }
  },

  /**
   * Effectue une requête POST
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} data - Données à envoyer
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          `Erreur API: ${response.status} - ${errorData?.message || response.statusText}`,
        )
      }
      return response.json()
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error)
      throw error
    }
  },

  /**
   * Effectue une requête PUT
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} data - Données à envoyer
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          `Erreur API: ${response.status} - ${errorData?.message || response.statusText}`,
        )
      }
      return response.json()
    } catch (error) {
      console.error('Erreur lors de la requête PUT:', error)
      throw error
    }
  },

  /**
   * Effectue une requête DELETE
   * @param {string} endpoint - Point de terminaison de l'API
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          `Erreur API: ${response.status} - ${errorData?.message || response.statusText}`,
        )
      }
      return response.json()
    } catch (error) {
      console.error('Erreur lors de la requête DELETE:', error)
      throw error
    }
  },
}

export default apiService
