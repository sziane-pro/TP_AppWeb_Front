// Configuration de base pour les requêtes API
const API_URL = 'http://localhost:5001'; // URL de votre API basée sur votre fichier server.js

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
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Effectue une requête POST
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} data - Données à envoyer
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async post(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Effectue une requête PUT
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} data - Données à envoyer
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async put(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Effectue une requête DELETE
   * @param {string} endpoint - Point de terminaison de l'API
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async delete(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
  }
};

export default apiService; 